import React from 'react'
import image from './battleship.png'
import Battleship from './Battleship'

function Draggable({width, setDragging, draggable, name, ...props}) {

    function handleDrag(){
        console.log("dragging", name)
        setDragging(name)
    }
    return (
        <>
            <Battleship onDragStart={handleDrag} height={50} width={width} draggable='true' src={image} {...props}></Battleship>
        </>
    )
}

export default Draggable
