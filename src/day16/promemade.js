export const extremeDance = (initPositions, moves) => {
  let result = []
  let positions = initPositions
  while (positions !== initPositions || result.length === 0) {
    positions = dance(positions, moves)
    result.push(positions)
  }
  return result[1000000000 % result.length - 1]
}

export const dance = (positions, moves) => moves.reduce((positions, m) => move(positions, m), positions)

export const move = (positions, m) => {
  const move = m.charAt(0)
  const programs = m.slice(1).split('/')
  const choices = {
    's': (p) => spin(positions, p),
    'x': (p1, p2) => exchange(positions, p1, p2),
    'p': (p1, p2) => partner(positions, p1, p2)
  }
  return choices[move](...programs)
}

const spin = (positions, m) => positions.slice(positions.length - m) + positions.slice(0, positions.length - m)

const exchange = (positions, p1, p2) => {
  p1 = parseInt(p1)
  p2 = parseInt(p2)
  const first = p1 < p2 ? p1 : p2
  const second = p1 < p2 ? p2 : p1
  if (first === second) return positions
  return positions.slice(0, first) + positions[second] + positions.slice(first + 1, second) + positions[first] + positions.slice(second + 1)
}

const partner = (positions, p1, p2) => exchange(positions, positions.indexOf(p1), positions.indexOf(p2))
