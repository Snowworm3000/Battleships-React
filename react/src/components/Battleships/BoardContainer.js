import React, { useState } from 'react'
import { useEffect } from 'react/cjs/react.development'
import { battleshipsConfig } from '../../constants/battleships'
import { calcLocation } from '../../utils/common'
import Draggable from './Draggable'

function BoardContainer({battleships, tileWidth, tileHeight, battleshipTemp, battleshipBoard, ...props}) {

    console.log(battleships, "battle", tileHeight, tileWidth, props)
    // const placedShips = battleships.current.board
    // const tempShipConfig = battleships.current.hover

    
    const [tempShip, setTempShip] = useState(null) 
    const [ships, setShips] = useState(null) 

    useEffect(() => {
        setTempShip(battleshipTemp == null ? null : <Draggable 
        x={calcLocation(tileWidth, battleshipTemp.x, props.spacing)}
        y={calcLocation(tileHeight, battleshipTemp.y, props.spacing)} 
        clickable="none"
        name="test"
        width={tileWidth * battleshipsConfig[battleshipTemp.battleship]} 
        height={tileHeight} 
        position="absolute"
        key={battleshipTemp.battleship}
        />)
        console.log("set new temp ship")
    }, [battleshipTemp])

    useEffect(() => {
        setShips(battleshipBoard == null ? null : battleshipBoard.map(({x, y, battleship}) => <Draggable 
        x={calcLocation(tileWidth, x, props.spacing)}
        y={calcLocation(tileHeight, y, props.spacing)} 
        clickable="none"
        name="test"
        // width={tileWidth * battleshipsConfig[battleship]} 
        width = {tileWidth * 4} // TODO: for testing, change back
        height={tileHeight} 
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
