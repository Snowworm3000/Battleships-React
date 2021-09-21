from Battleships import Battleships
import References
from flask import Flask, render_template, request
from flask_socketio import SocketIO

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
#TODO: Set secret key on production environment
socketio = SocketIO(app, manage_session=True, cors_allowed_origins="http://localhost:3000") #TODO: Set CORS allowed origin to server hosting react frontend if flask is not serving the react frontend.

# all boards for all multiplayer sessions are stored here.
boards = {}
instances = {}


@app.route("/")
# @cross_origin(origin='localhost',headers=['Content- Type','Authorization'])

def home():
    return render_template("index.html")

@socketio.on('my event')
def handle_my_custom_event(json):
    print('received json: ' + str(json))

@socketio.on('connect')
def connect():
    print('connected')

@socketio.on("move")
def move(json):
    print('move', str(json), json["x"])
    game = instances[request.sid]
    # result = takeShotAt(game, 'P1', 'P2')
    result = game.takeShot("P1", "P2", xCoord=json["x"], yCoord=json["y"])
    if result == 'P1':
        print('win')
        # break
    print(str(result), "🤮")
    # return [result, request.sid]
    return result
    # return "hit"


def takeShotAt(gameInstance, activePlayer, target):
    invalid = True
    if gameInstance.getAutoPlayer(activePlayer):
        result = gameInstance.takeShot(activePlayer, target)
        invalid = False
    while invalid:
        x, y, direction = getCoords()
        result = gameInstance.takeShot(activePlayer, target, xCoord=x, yCoord=y)
        if result == -1:
            print("You've already shot there, try again")
        else:
            invalid = False
    return result

def setBoard(gameInstance, player):
    # TODO 
    ''' Prompts to setup board for human players
    @param player: player number 1/2
    '''
    # auto = gameInstance.getAutoPlayer(player)
    # # TODO handle errors, and widen valid inputs
    # test = False
    #test = True if input('Do you want a test placement? ') in validInputs else False

    randomise = True 

    x, y, direction = 0, 0, 0
    for eachShip in References.getShips():
        # in case the ships can't be placed for whatever reason
        placed = gameInstance.setFleetLocation(player, [[eachShip, (x,y), direction]])
        if not placed:
            print('failed to place')
            return False
        y += 1
    result = True
        
    return result


ansiColours = {\
        'black' : '\033[30m', \
        'boldBlack' : '\033[30;1m', \
        'red': '\033[31m', \
        'boldRed': '\033[31;1m', \
        'green': '\033[32m', \
        'boldGreen': '\033[32;1m', \
        'yellow' : '\033[33m', \
        'boldYellow' : '\033[33;1m', \
        'blue': '\033[34m', \
        'boldBlue': '\033[34;1m', \
        'magenta' : '\033[35m', \
        'boldMagenta' : '\033[35;1m', \
        'cyan' : '\033[36m', \
        'boldCyan' : '\033[36;1m', \
        'white' : '\033[37m', \
        'boldWhite' : '\033[37;1m', \
        'reset': '\033[0m' \
        }
resetColour = ansiColours['reset']
boardColour = ansiColours['blue']
yLabelColour = ansiColours['boldWhite']
xLabelColour = ansiColours['boldWhite']
shipColour = ansiColours['yellow']
missColour = ansiColours['cyan']
hitColour  = ansiColours['boldRed']
sunkColour = ansiColours['red']
def printBoard(board):
    # TODO aloow printing of boards side by side
    # TODO move cursor to print only changing information (low)
    yLabel = 9
    string = boardColour+'   _______________________________________\n'+resetColour
    for i in range(len(board)-1, -1, -1):
        string += yLabelColour+str(yLabel)+resetColour
        for j in board[i]:
            string += boardColour+' | ' 
            if j == References.symbols['Hit']:
                string += hitColour + j + resetColour
            elif j == References.symbols['Miss']:
                string += missColour + j + resetColour
            elif j == References.symbols['Sunk']:
                string += sunkColour + j + resetColour
            else:
                string += shipColour + j + resetColour
        string += boardColour + ' |\n' + resetColour
        yLabel -= 1
    string += xLabelColour + '    0   1   2   3   4   5   6   7   8   9' + resetColour
    print(string)

@socketio.on('startGame')
def runGame(params):
    print("params", params)
    instances[request.sid] = game = Battleships(p1auto=False, p2auto=True, aiLevelP2=1)
    print(request.sid, " id", instances)

    playerFirst = True
    # setBoard(game, 'P1')

    paramsConverted = []
    for ship in params:
        if(ship[2] == 0): # if the ship is horizontal
            paramsConverted.append([ship[0], (ship[1]["x"], 9 - ship[1]["y"]), ship[2]]) # converts position to a tuple and positioning for y coordinate
        else: # if the ship is vertical
            paramsConverted.append([ship[0], (ship[1]["x"], 10 - ship[1]["y"] - References.ships[ship[0]]), ship[2]]) # fixes differences in encoding of ship rotation for vertical ships

    game.setFleetLocation('P1', paramsConverted)

    printBoard(game.getPlayerBoard("P1"))
    
    # while not game.getWinner():
    #     if playerFirst != 0:
    #         result, location = takeShotAt(game, "P2", "P1")
    #         if result == 'P':
    #             printWinner('lose')
    #             break
    #         # when a ship is sunk, all squares from that ship are returned, not in hit order
    #         # TODO could rewrite so that only the last shot taken is reported and a sunk message given.
    #         if result in References.ships: # ship name only returned on sink event
    #             print(f"\nComputer fired at {location[0]} \nand sunk your {result}\n")
    #         else:
    #             print('\nComputer fired at: {loc} \nand it was a {res}\n'.format(loc=location, res=result))
    #     else:
    #         print('\n\n\n')
    #     print("Player 1 fleet")
    #     printBoard(game.getPlayerBoard('P1'))
    #     print("\nPlayer 1 tracking")
    #     printBoard(game.getPlayerBoard('P1', tracking=True))

    #     result = takeShotAt(game, 'P1', 'P2')
    #     if result == 'P1':
    #         printWinner('win')
    #         break
    #     playerFirst = False

    # send(not playerFirst)
    # return not playerFirst
    # response(not playerFirst)
    print("response👾")
    return playerFirst

@socketio.on('disconnect')
def disconnect():
    print('Client disconnected🥳')
    cleanup()
    # print(request.sid, " disconnected")
    # instances.pop(request.sid)
    # print("instances ",instances)

def cleanup(): # removes session data associated with client
    print("disconnect test🧐")
    if request.sid in instances: del instances[request.sid]
    print("done🎃")

if(__name__ == '__main__'):
    # app.run(debug=True)
    socketio.run(app)
    runGame()