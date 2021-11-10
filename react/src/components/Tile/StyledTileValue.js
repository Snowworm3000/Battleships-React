import styled from 'styled-components';
// import { pop, scaleUp } from '../../utils/animation';

const StyledTileValue = styled.div`
  width: 100%;
  height: 100%;
  font-size: inherit;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius};
  /* background-color: ${props => props.theme.colors.hit}; */
  background-color: ${props => {
    const colors = props.theme.colors;
    const types = [colors.miss, colors.hit, colors.sink]
    return types[props.value]
  }};
  color: ${props => props.theme.colors.primary};
  user-select: none;
`;

export default StyledTileValue;