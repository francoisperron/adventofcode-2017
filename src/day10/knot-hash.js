const arrayOf = (size) => [...Array(size).keys()]
export const initKnot = () => ({list: arrayOf(256), currentPosition: 0, skipSize: 0})

const reverseList = (length, list, currentPosition) => {
  if (length + currentPosition > list.length) {
    const reversedPart = [...list, ...list].slice(currentPosition, currentPosition + length).reverse()
    const splitIndex = list.length - currentPosition
    return [
      ...reversedPart.slice(splitIndex),
      ...list.slice(currentPosition + length - list.length, currentPosition),
      ...reversedPart.slice(0, splitIndex)
    ]
  } else {
    return [
      ...list.slice(0, currentPosition),
      ...list.slice(currentPosition, length + currentPosition).reverse(),
      ...list.slice(length + currentPosition)]
  }
}

export const tie = (length, knot) => {
  return {
    list: reverseList(length, knot.list, knot.currentPosition),
    currentPosition: (knot.currentPosition + length + knot.skipSize) % knot.list.length,
    skipSize: knot.skipSize + 1
  }
}

export const knotHash = (initialKnot, lenghts) => {
  return lenghts.reduce((knot, l) => tie(l, knot), initialKnot)
}

export const knotDenseHash = (initialKnot, chars) => {
  let lengths = [...[...chars].map(x => x.charCodeAt(0)), 17, 31, 73, 47, 23]

  const knot = arrayOf(64).reduce(knot => knotHash(knot, lengths), initialKnot)
  const denseHash = xor(knot.list)
  return toHexadecimal(denseHash)
}

export const xor = (list) => chunk(list, 16).map(p => xorOf(p))
export const chunk = (list, size) => arrayOf(size).map((x, i) => list.slice(i * size, i * size + size))
export const xorOf = (part) => part.reduce((a, b) => a ^ b)

export const toHexadecimal = (denseHash) => denseHash.map(h => h.toString(16).padStart(2, '0')).join('')
