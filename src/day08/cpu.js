import { readFileSync } from 'fs'
import { readLines } from '../read-file'

export const valueOf = (reg, regs) => {
  if (regs[reg] === undefined) regs[reg] = 0
  return regs[reg]
}

export const instructionOf = (line) => {
  const parts = line.split(' ')
  return {
    reg: parts[0],
    mod: parts[1] === 'dec' ? -1 * parseInt(parts[2]) : parseInt(parts[2]),
    condition: {
      reg: parts[4],
      operator: parts[5],
      value: parseInt(parts[6])
    }
  }
}

export const conditionPasses = (condition, regs) => {
  const value = valueOf(condition.reg, regs)
  const conditions = {
    '>': (value, test) => value > test,
    '<': (value, test) => value < test,
    '<=': (value, test) => value <= test,
    '>=': (value, test) => value >= test,
    '==': (value, test) => value === test,
    '!=': (value, test) => value !== test,
  }
  return conditions[condition.operator](value, condition.value)
}

const process = (i, regs) => {
  if(conditionPasses(i.condition, regs)){
    regs[i.reg] = valueOf(i.reg, regs) + i.mod
  }
}

export const largestValueInRegisters = (file) => {
  const instructions = readLines(file).map(l => instructionOf(l))
  const regs = {}

  instructions.forEach(i => process(i, regs))
  return Math.max(...instructions.map(i => valueOf(i.reg, regs)))
}

export const highestValueEverHeld = (file) => {
  const instructions = readLines(file).map(l => instructionOf(l))
  const regs = {}

  let max = 0
  instructions.forEach(i => {
    process(i, regs)
    max = Math.max(max, ...instructions.map(i => valueOf(i.reg, regs)))
  })
  return max
}