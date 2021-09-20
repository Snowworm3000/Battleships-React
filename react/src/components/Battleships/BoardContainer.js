import React, { useState } from 'react'
import { useEffect } from 'react/cjs/react.development'
import { battleshipsConfig } from '../../constants/battleships'
import { calcLocation } from '../../utils/common'
import Draggable from './Draggable'
import Outline from './Outline'

function BoardContainer({tileWidth, tileHeight, rotation, setDragging, battleshipTemp, battleshipBoard, ...props}) {

    console.log( "battle", tileHeight, tileWidth, props, rotation)
    // const placedShips = battleships.current.board
    // const tempShipConfig = battleships.current.hover

    
    const [tempShip, setTempShip] = useState(null) 
    const [ships, setShips] = useState(null) 

    useEffect(() => {
        // setTempShip(battleshipTemp == null ? null : <Draggable 
        // x={calcLocation(tileWidth, battleshipTemp.x, props.spacing)}
        // y={calcLocation(tileHeight, battleshipTemp.y, props.spacing)} 
        // clickable="none"
        // name="test" // TODO: this might need to be changed to the name of the battleship
        // rotation={rotation}
        // length={battleshipsConfig[battleshipTemp.battleship]} 
        // lengthMultiplier={tileWidth}
        // // height={tileHeight} 
        // position="absolute"
        // key={battleshipTemp.battleship}
        // />)
        // console.log("set new temp ship")

        setTempShip(battleshipTemp == null ? null : <Outline
            x={calcLocation(tileWidth, battleshipTemp.x, props.spacing)}
            y={calcLocation(tileHeight, battleshipTemp.y, props.spacing)} 
            length={battleshipsConfig[battleshipTemp.battleship]} 
            lengthMultiplier={tileWidth}
            spacing={props.spacing}
            rotation={rotation}
            key={battleshipTemp.battleship}
        />)
    }, [battleshipTemp])

    useEffect(() => {
        setShips(battleshipBoard == null ? null : battleshipBoard.map(({x, y, battleship, savedRotation}) => <Draggable 
        x={calcLocation(tileWidth, x, props.spacing)}
        y={calcLocation(tileHeight, y, props.spacing)} 
        clickable="auto"
        // name="test"
        name={battleship}
        rotation={savedRotation}
        length={battleshipsConfig[battleship]} 
        lengthMultiplier={tileWidth}
        // width = {tileWidth * 4} // TODO: for testing, change back
        // height={tileHeight} 
        setDragging={setDragging}
        position="absolute"
        key={battleship}
        />))
        console.log("set new ship", battleshipBoard, battleshipTemp)
    }, [battleshipBoard])
    
    return (
        <>
            {tempShip}
            {ships}
        </>
    )
}

export default BoardContainer
