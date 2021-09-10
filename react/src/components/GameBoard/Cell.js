import React from 'react'
import StyledCell from './StyledCell'

export default function Cell(props) {
    function handleOver(e){
        console.log("drag over", props.position)
        const y = Math.floor(props.position/10)
        const x = props.position%10
        console.log(x,y)
        props.addBattleship(x,y, true)
    }
    
    return (
        <StyledCell onDragOver={handleOver}></StyledCell>
    )
}
