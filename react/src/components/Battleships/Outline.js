import styled from "styled-components";

export default styled.div.attrs(
    ({ length, lengthMultiplier, spacing, rotation, x, y, }) => {
        const pixelLength = length * lengthMultiplier + spacing * (length - 1)
        return ({
            style: {
                width: `${rotation ? pixelLength : lengthMultiplier}px`,
                // width: pixelLength,
                height: `${rotation ? lengthMultiplier:pixelLength}px`,
                transform: `${`translate(${x}px, ${y}px)`}`,
            },
        });
    },
)`
    pointer-events: none;
    position: absolute;
    outline-style: dashed;
    outline-offset: -3px;
    /* background-color: red; */

    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    
`