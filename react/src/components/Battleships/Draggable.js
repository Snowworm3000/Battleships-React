import React from 'react'
import image from './battleship.png'
import imageRotated from './battleship rotated.png'
import Battleship from './Battleship'

function Draggable({length, lengthMultiplier, setDragging, draggable, rotation, name, ...props}) {

    function handleDrag(e){
        console.log("dragging", name)
        setDragging(name)
    }

    function handleDragEnd(e){
        setDragging(null)
    }
    
    const pixelLength = length * lengthMultiplier
    const height = rotation ? lengthMultiplier:pixelLength
    const width = rotation ? pixelLength:lengthMultiplier
    console.log(width, height, " changed 🦁")
    return (
        <>
            <Battleship onDragStart={handleDrag} onDragEnd={handleDragEnd} height={height} width={width} draggable='true' src={rotation ? image : imageRotated} rotation={rotation}  {...props}></Battleship>
        </>
    )
}

export default Draggable
