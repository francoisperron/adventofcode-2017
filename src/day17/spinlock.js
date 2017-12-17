export const initSpinlock = (step) => ({pos: 0, value: 1, step, buffer: [0]})

export const shortCircuit = (initialState) => {
  const state = [...Array(2017).keys()].reduce((state) => spin(state), initialState)

  const shortCircuitIndex = state.buffer.findIndex(v => v === 2017) + 1
  return state.buffer[shortCircuitIndex]
}

export const spin = (state) => {
  state.pos = ((state.pos + state.step) % state.value) + 1
  state.buffer = [...state.buffer.slice(0, state.pos), state.value, ...state.buffer.slice(state.pos)]
  state.value++
  return state
}

export const shortCircuitBigTime = (initialState) => {
  let state = initialState
  while (state.value <= 50000000) {
    state = spinNoBuffer(state)
  }
  return state.circuit
}

const spinNoBuffer = (state) => {
  state.pos = ((state.pos + state.step) % state.value) + 1

  if (insertAfterZero(state)) {
    state.circuit = state.value
  }

  state.value++
  return state
}

const insertAfterZero = (state) => state.pos === 1
