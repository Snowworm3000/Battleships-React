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
    print('move', str(json))
    game = instances[request.sid]
    result = takeShotAt(game, 'P1', 'P2')
    if result == 'P1':
        print('win')
        # break
    print(str(result))
    return result


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

@socketio.on('startGame')
def runGame(params):
    instances[request.sid] = game = Battleships(p1auto=False, p2auto=True, aiLevelP2=1)
    print(request.sid, " id", instances)

    playerFirst = True
    setBoard(game, 'P1')
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