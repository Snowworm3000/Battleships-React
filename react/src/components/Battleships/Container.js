import React from 'react'
import Draggable from './Draggable'
import { battleshipsConfig, battleshipsNames } from '../../constants/battleships'

function BattleshipContainer(props) {
    
    const widthMultiplier = 50

    let battleships = []
    for (var name of props.battleships){
        battleships.push(<Draggable rotation={props.rotation} setDragging={props.setDragging} key={name} name={name} lengthMultiplier={widthMultiplier} length={battleshipsConfig[name]}></Draggable>)
    }

    return (
        <div>
            {battleships}
        </div>
    )
}

export default BattleshipContainer
