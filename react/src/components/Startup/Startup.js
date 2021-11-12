import React from 'react'
import ColouredBox from '../Containers/ColouredBox'
import FixedContainer from '../Containers/FixedContainer'

function Startup() {
    return (
        <FixedContainer>
            <ColouredBox color="grey" padding="20px">
                <div>Play Battleships</div>
            </ColouredBox>
        </FixedContainer>
    )
}

export default Startup
