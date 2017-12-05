export const jumpsUntilOutside = (instructions) => {
  let index = 0
  let steps = 0

  while (index < instructions.length) {
    let lastIndex = index
    index = index + instructions[index]
    instructions[lastIndex]++
    steps++
  }
  return steps
}

export const strangeJumpsUntilOutside = (instructions) => {
  let index = 0
  let steps = 0

  while (index < instructions.length) {
    let lastIndex = index
    let jump = instructions[index] >= 3 ? -1 : 1
    index = index + instructions[index]
    instructions[lastIndex] += jump
    steps++
  }
  return steps
}