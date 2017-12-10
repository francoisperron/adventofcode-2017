export const initKnot = () => ({list: [], currentPosition: 0, skipSize: 0})

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

export const knotHash = (list, lenghts) => {
  const initialKnot = {...initKnot(), list}
  return lenghts.reduce((knot, l) => tie(l, knot), initialKnot)
}