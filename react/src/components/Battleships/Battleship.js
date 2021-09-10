import styled from "styled-components";

export default styled.img.attrs(
    ({ width, height, x, y, position }) => ({
        style: {
          width: `${width}px`,
          height: `${height}px`,
          transform: `${`translate(${x}px, ${y}px)`}`,
          position: `${position}`
        },
      }),
)`
    cursor:move;
    width: ${props => props.width};

    /* position: absolute; */
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    transition: transform 0.15s ease-in-out;
    background: none;
`