import {readFileSync} from "fs";

const inSquare = (location) => {
  let corner = 3
  let squareNumber = 1
  while (Math.pow(corner, 2) < location) {
    corner = corner + 2
    squareNumber++
  }

  return {squareNumber, corner}
}

const offsetInSquare = (location, corner, squareNumber) => {
  const previousCorner = Math.pow(corner - 2, 2)
  const atZero = previousCorner + squareNumber
  return Math.abs((location - atZero) % (corner - 1))
}

const shortestPathTo = (location) => {
  if (location === 1) return 0

  const {squareNumber, corner} = inSquare(location)
  const offset = offsetInSquare(location, corner, squareNumber)

  return squareNumber + offset
}

const largerThan = (number) => {
  // see https://oeis.org/A141481/b141481.txt
  const results = readFileSync('src/day03/spiral.txt').toString().split("\n").map(r => parseInt(r))
  return results.filter(r => r > number)[0]
}

export { inSquare, offsetInSquare, shortestPathTo, largerThan }
