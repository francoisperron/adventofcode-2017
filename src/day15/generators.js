export const generator = (value, factor, multiple) => ({value, factor, multiple})

export const judge = (valueA, valueB) => {
  const genA = generator(valueA, 16807, 1)
  const genB = generator(valueB, 48271, 1)

  let matches = 0
  for (let i = 0; i < 40 * 1000 * 1000; i++) {
    let a = next(genA)
    let b = next(genB)
    if (valuesMatch(a.value, b.value)) {
      matches++
    }
  }
  return matches
}

export const next = (gen) => {
  gen.value = gen.value * gen.factor % 2147483647
  return gen
}

export const valuesMatch = (vA, vB) => (vA & 0xFFFF) === (vB & 0xFFFF)

export const judge2 = (valueA, valueB) => {
  const genA = generator(valueA, 16807, 4)
  const genB = generator(valueB, 48271, 8)

  let matches = 0
  for (let i = 0; i < 5 * 1000 * 1000; i++) {
    let a = next2(genA)
    let b = next2(genB)
    if (valuesMatch(a.value, b.value)) {
      matches++
    }
  }
  return matches
}

const next2 = (gen) => {
  while (next(gen).value % gen.multiple !== 0) {}
  return gen
}
