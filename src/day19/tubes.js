import { readLines } from '../read-file'

export const initState = (file) => {
  const diagram = readLines(file).map(l => l.split(''))
  const start = diagram[0].findIndex(p => p === '|')
  return {diagram, row: 1, col: start, direction: 'down', letters: '', end: false, steps: 0}
}

export const travel = (file) => {
  let state = initState(file)
  while (!state.end) {
    state = step(state)
  }
  return state
}

export const step = (s) => {
  const char = s.diagram[s.row][s.col]

  if (/[A-Z]/.test(char)) s.letters += char
  if (char === ' ') s.end = true
  if (char === '+') crossroad(s)

  if (s.direction === 'down') s.row++
  if (s.direction === 'up') s.row--
  if (s.direction === 'right') s.col++
  if (s.direction === 'left') s.col--

  s.steps++
  return s
}

const crossroad = (s) => {
  if (s.direction === 'down' || s.direction === 'up') {
    const atLeft = s.diagram[s.row][s.col - 1]
    s.direction = atLeft === ' ' || atLeft === undefined ? 'right' : 'left'
  } else {
    const atUp = s.diagram[s.row - 1][s.col]
    s.direction = atUp === ' ' || atUp === undefined ? 'down' : 'up'
  }
}
