import React from 'react'
import Draggable from './Draggable'
import { battleshipsConfig, battleshipsNames } from '../../constants/battleships'

function BattleshipContainer(props) {
    
    const widthMultiplier = 50

    let battleships = []
    for (var key in battleshipsConfig){
        battleships.push(<Draggable setDragging={props.setDragging} key={key} name={key} width={battleshipsConfig[key] * widthMultiplier}></Draggable>)
    }

    return (
        <div>
            {battleships}
        </div>
    )
}

export default BattleshipContainer
