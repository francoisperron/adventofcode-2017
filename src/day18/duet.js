import { readLines } from '../read-file'

export const duet = (file) => {
  const instructions = readLines(file).map(l => instructionOf(l))

  let state = initState()
  while (!state.done) {
    state = play(state, instructions)
  }
  return state
}

const initState = () => ({index: 0, done: false, lastSnd: 0, regs: {}})

const instructionOf = (line) => {
  const parts = line.split(' ')
  return {cmd: parts[0], reg: parts[1], value: isNaN(parseInt(parts[2])) ? parts[2] : parseInt(parts[2])}
}

const commands = {
  'set': (reg, value, state) => state.regs[reg] = valueOf(value, state),
  'add': (reg, value, state) => state.regs[reg] += valueOf(value, state),
  'mul': (reg, value, state) => state.regs[reg] *= valueOf(value, state),
  'mod': (reg, value, state) => state.regs[reg] %= valueOf(value, state),
  'jgz': (reg, value, state) => jump(reg, value, state),
  'snd': (reg, value, state) => state.lastSnd = valueOf(reg, state),
  'rcv': (reg, value, state) => recover(reg, value, state)
}

const play = (state, instructions) => {
  const instruction = instructions[state.index]
  commands[instruction.cmd](instruction.reg, instruction.value, state)
  state.index++
  return state
}

const valueOf = (value, state) => (Number.isInteger(value) ? value : state.regs[value])

const jump = (reg, value, state) => {
  if (valueOf(reg, state) > 0) {
    state.index += valueOf(value, state) - 1
  }
}

const recover = (reg, _, state) => {
  if (state.regs[reg] !== 0) {
    state.regs[reg] = state.lastSnd
    state.done = true
  }
}