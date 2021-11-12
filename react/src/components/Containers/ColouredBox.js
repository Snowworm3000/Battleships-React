const { default: styled } = require("styled-components");

const ColouredBox = styled.div.attrs(
    ({color, radius, padding}) => ({
        style: {
            backgroundColor: color,
            padding: padding,
            
        }
    })
)`
    
`
export default ColouredBox;