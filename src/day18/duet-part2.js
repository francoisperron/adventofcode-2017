import { readLines } from '../read-file'

export const duet2 = (file) => {
  const instructions = readLines(file).map(l => instructionOf(l))

  let state = initState()
  while (!state.p0.blocked || !state.p1.blocked) {
    state = play(state, instructions)
  }
  return state.p1.sent
}

const initState = () => ({
  pid: 'p0',
  p0: {index: 0, blocked: false, regs: {p: 0}, queue: [], sent: 0, other: 'p1'},
  p1: {index: 0, blocked: false, regs: {p: 1}, queue: [], sent: 0, other: 'p0'}
})

const instructionOf = (line) => {
  const parts = line.split(' ')
  return {cmd: parts[0], reg: parts[1], value: parts[2]}
}

const commands = {
  'set': (reg, value, state) => { state[state.pid].regs[reg] = valueOf(value, state) },
  'add': (reg, value, state) => { state[state.pid].regs[reg] += valueOf(value, state) },
  'mul': (reg, value, state) => { state[state.pid].regs[reg] *= valueOf(value, state) },
  'mod': (reg, value, state) => { state[state.pid].regs[reg] %= valueOf(value, state) },
  'jgz': (reg, value, state) => jump(reg, value, state),
  'snd': (reg, value, state) => send(reg, value, state),
  'rcv': (reg, value, state) => receive(reg, value, state)
}

const play = (state, instructions) => {
  state.switch = false
  const instruction = instructions[state[state.pid].index]
  commands[instruction.cmd](instruction.reg, instruction.value, state)
  if (state.switch) {
    state[state.pid].blocked = true
  } else {
    state[state.pid].index++
    state[state.pid].blocked = false
  }
  return state
}

const valueOf = (value, state) => (isNaN(parseInt(value)) ? state[state.pid].regs[value] : parseInt(value))

const jump = (reg, value, state) => {
  if (valueOf(reg, state) > 0) {
    state[state.pid].index += valueOf(value, state) - 1
  }
}

const send = (reg, value, state) => {
  state[state[state.pid].other].queue.push(valueOf(reg, state))
  state[state.pid].sent++
}

const receive = (reg, _, state) => {
  if (state[state.pid].queue.length > 0) {
    state[state.pid].regs[reg] = state[state.pid].queue.shift()
  } else {
    state.pid = state[state.pid].other
    state.switch = true
  }
}
