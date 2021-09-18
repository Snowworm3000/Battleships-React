import React from 'react'
import StyledCell from './StyledCell'

export default function Cell(props) {
    function handleOver(event){
        

        console.log("drag over", props.position)
        const y = Math.floor(props.position/10)
        const x = props.position%10
        console.log(x,y)
        props.addBattleship(x,y, true)
        event.stopPropagation();
        event.preventDefault();
    }

    function preventDefault(event){ // Prevents default functionality making it a drop target
        event.stopPropagation();
        event.preventDefault();
    }

    function handleDrop(event){
        // debugger
        const y = Math.floor(props.position/10)
        const x = props.position%10
        console.log(x,y)
        props.addBattleship(x,y, false)

        // event.stopPropagation(); 
        event.preventDefault(); // Required to prevent redirecting to image of the battleship
        return false
    }
    
    return (
        <StyledCell onDrop={handleDrop} onDragEnter={handleOver} onDragOver={preventDefault}></StyledCell>
    )
}
