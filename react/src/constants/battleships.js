export const battleshipsConfig = {
    'Aircraft Carrier' : 5, 
    'Battleship' : 4, 
    'Cruiser' : 3, 
    'Submarine' : 3, 
    'Destroyer' : 2 
}

export const battleshipsNames = [
    'Aircraft Carrier' ,
    'Battleship',
    'Cruiser' ,
    'Submarine', 
    'Destroyer' 
]

export const rotation = {
    horizontal: true,
    vertical: false
}

const boardSize = 10

export const isValidPosition = (pos,length) => { // Pos is either x or y depending on the rotation of the battleship
    const max = boardSize - length
    return pos <= max
}