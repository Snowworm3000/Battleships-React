export const createIndexArray = (len) => Array.from(Array(len).keys());

export const calcSegmentSize = (
  length, segmentNum, spacing
) => (length - (segmentNum + 1) * spacing) / segmentNum;

export const calcTileSize = (
  gridSize, rows, cols, spacing,
) => ({
  width: calcSegmentSize(gridSize, cols, spacing),
  height: calcSegmentSize(gridSize, rows, spacing),
});

export const calcLocation = (l, c, spacing) =>
  (spacing + l) * c + spacing;

let _tileIndex = 0
export const nextTileIndex = () => _tileIndex++;

export const getId = (ind) => `${ind}_${Date.now()}`;

export function cellLocation(coordinate, length, gridSize) { // Locates the cell position knowing the length of the board (either width or height) by finding the maximum individual cell length and rounding up the coordinate divided by the maximum cell length.
  const max = length / gridSize
  const cell = Math.ceil(coordinate / max)
  return cell
}

export function gridPosition(x, y, width, height, rows, cols) {
  return {
    gridX: cellLocation(x, width, cols),
    gridY: cellLocation(y, height, rows)
  }
}