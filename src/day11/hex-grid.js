export const walk = (path) => {
  const initialPosition = {x: 0, y: 0, z: 0, distance: 0, max: 0}
  return path.split(',').reduce((position, p) => move(position, p), initialPosition)
}

const move = (position, p) => {
  const newPosition = {
    x: position.x + moves[p].x,
    y: position.y + moves[p].y,
    z: position.z + moves[p].z
  }
  const newDistance = distanceTo(newPosition)
  return {...newPosition, distance: newDistance, max: Math.max(position.max, newDistance)}
}
const moves = {
  'ne': {x: 0, y: 1, z: -1},
  'n': {x: -1, y: 1, z: 0},
  'nw': {x: -1, y: 0, z: 1},
  'se': {x: 1, y: 0, z: -1},
  's': {x: 1, y: -1, z: 0},
  'sw': {x: 0, y: -1, z: 1}
}

export const distanceTo = p => Math.max(Math.abs(p.x), Math.abs(p.y), Math.abs(p.z))
