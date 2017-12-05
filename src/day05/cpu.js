const hopOne = () => 1

const strangeJump = (offset) => offset >= 3 ? -1 : 1

export const jumps = (instructions, jumpMethod) => {
  let index = 0
  let steps = 0

  while (index < instructions.length) {
    let lastIndex = index
    let jump = jumpMethod(instructions[index])
    index = index + instructions[index]
    instructions[lastIndex] += jump
    steps++
  }
  return steps
}

export const jumpsUntilOutside = (instructions) => {
  return jumps(instructions, hopOne)
}

export const strangeJumpsUntilOutside = (instructions) => {
  return jumps(instructions, strangeJump)
}
