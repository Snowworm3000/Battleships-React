import React, { useState } from 'react'
import { useEffect } from 'react/cjs/react.development'
import Draggable from './Draggable'

function BoardContainer({battleships, tileWidth, tileHeight, ...props}) {

    console.log(battleships, "battle", tileHeight, tileWidth, props)
    // const placedShips = battleships.current.board
    // const tempShipConfig = battleships.current.hover

    
    const [tempShip, setTempShip] = useState(null) 
    useEffect(() => {
        setTempShip(tempShipConfig == null ? null : <Draggable 
        x={tempShipConfig.x}
        y={tempShipConfig.y}
        name="test"
        width={tileWidth*4} 
        height={tileHeight} 
        position="absolute"
        />)
        console.log("set new ship")
    }, [battleships.current])
    
    return (
        <div>
            {tempShip}
        </div>
    )
}

export default BoardContainer
