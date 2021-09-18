import React from 'react'
import image from './battleship.png'
import Battleship from './Battleship'

function Draggable({width, setDragging, draggable, name, ...props}) {

    function handleDrag(e){
        console.log("dragging", name)
        setDragging(name)
    }

    function handleDragEnd(e){
        setDragging(null)
    }
    return (
        <>
            <Battleship onDragStart={handleDrag} onDragEnd={handleDragEnd} height={50} width={width} draggable='true' src={image} {...props}></Battleship>
        </>
    )
}

export default Draggable
