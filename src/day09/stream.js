export const initState = () => ({inGarbage: false, garbage: 0, skipNext: false, score: 0, depth: 1})

export const analyse = (char, state) => {
  if (state.skipNext) state.skipNext = false
  else if (char === '!') state.skipNext = true
  else if (state.inGarbage && char !== '>') state.garbage++
  else if (char === '<') state.inGarbage = true
  else if (char === '>') state.inGarbage = false
  else if (char === '{') state.score += state.depth++
  else if (char === '}') state.depth--
  return state
}

export const clean = (stream) => {
  return [...stream].reduce((state, char) => analyse(char, state), initState())
}
