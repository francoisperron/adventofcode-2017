import { readFileSync } from 'fs'

const programOf = (program) => {
  const name = program[0].split(' (')[0]
  const weigth = parseInt(program[0].split(' (')[1].trim().slice(0, -1))
  const holding = program.length > 1 ? program[1].split(',').map((p => p.trim())) : []
  return {name, weigth, holding}
}

const flatten = list => list.reduce(
  (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
)

export const parseFile = (towerFilepath) => readFileSync(towerFilepath).toString().split('\n')
  .map(p => p.split('->'))
  .map(p => programOf(p))

export const bottomProgram = (towerFilepath) => {
  const programs = parseFile(towerFilepath)
  const holdPrograms = flatten(programs.map(p => p.holding))
  return programs.map(p => p.name).find(n => !holdPrograms.includes(n))
}

export const holdingWeigth = (programName, programs) => {
  const program = programs.find(p => p.name === programName)

  const holdingProgramsWeigth = programs
    .filter(p => program.holding.includes(p.name))
    .map(p => holdingWeigth(p.name, programs)).reduce((a, b) => a + b, 0)

  return program.weigth + holdingProgramsWeigth
}

const allEqual = (weigths) => {
  return weigths.reduce((a, b) => { return (a === b) ? a : NaN }) !== weigths[0]
}

export const unbalanced = (towerFilepath) => {
  const programs = parseFile(towerFilepath)

  const unbalancedProgram = programs
    .filter(p => p.holding.length !== 0)
    .map(p => {
      const weigths = p.holding.map(p => holdingWeigth(p, programs))
      return {program: p, weigths, unbalanced: allEqual(weigths)}
    })
    .filter(p => p.unbalanced)

  unbalancedProgram.forEach(p => console.log(p))
  return {newWeigth: 60}
}