import { describe, it } from 'mocha'
import { expect } from 'chai'
import { inSquare, largerThan, offsetInSquare, shortestPathTo } from './spiral-memory'

const range = (min, max) => Array.from(Array(max - min + 1).keys()).map(n => n + min)

describe('Day 3 - The spiral memory', () => {
  describe('Part 1', () => {
    it('is 1 for even numbers below 10', () => {
      [2, 4, 6, 8].forEach(n => expect(shortestPathTo(n), n).to.equal(1))
    })

    it('is 2 for odd numbers below 13', () => {
      [3, 5, 7, 9, 11, 15, 19, 23].forEach(n => expect(shortestPathTo(n), n).to.equal(2))
    })

    it('is 3 for even numbers between 10 and 24', () => {
      [10, 24].forEach(n => expect(shortestPathTo(n), n).to.equal(3))
    })

    it('is 4 for odd numbers between 13 and 29, except 15, 19, 23, ', () => {
      [13, 29].forEach(n => expect(shortestPathTo(n), n).to.equal(4))
    })

    describe('calculates on which square a number is', () => {
      it('1st square', () => {
        range(2, 9).forEach(n => expect(inSquare(n).squareNumber, n).to.equal(1))
        range(2, 9).forEach(n => expect(inSquare(n).corner, n).to.equal(3))
      })
      it('2nd square', () => {
        range(10, 25).forEach(n => expect(inSquare(n).squareNumber, n).to.equal(2))
        range(10, 25).forEach(n => expect(inSquare(n).corner, n).to.equal(5))
      })

      it('4th square', () => {
        range(50, 81).forEach(n => expect(inSquare(n).squareNumber, n).to.equal(4))
        range(50, 81).forEach(n => expect(inSquare(n).corner, n).to.equal(9))
      })
    })

    describe('calculates the offset in the square', () => {
      it('corners', () => {
        expect(offsetInSquare(3, 3, 1)).to.equal(1)
        expect(offsetInSquare(5, 3, 1)).to.equal(1)
        expect(offsetInSquare(7, 3, 1)).to.equal(1)
        expect(offsetInSquare(9, 3, 1)).to.equal(1)

        expect(offsetInSquare(13, 5, 2)).to.equal(2)
        expect(offsetInSquare(17, 5, 2)).to.equal(2)
        expect(offsetInSquare(21, 5, 2)).to.equal(2)
        expect(offsetInSquare(25, 5, 2)).to.equal(2)
      })

      it('middles', () => {
        expect(offsetInSquare(2, 3, 1)).to.equal(0)
        expect(offsetInSquare(4, 3, 1)).to.equal(0)
        expect(offsetInSquare(6, 3, 1)).to.equal(0)
        expect(offsetInSquare(8, 3, 1)).to.equal(0)
      })
    })

    describe('Solving', () => {
      it('for 1 is 0', () => {
        expect(shortestPathTo(1)).to.equal(0)
      })
      it('is 17 for 1024', () => {
        expect(shortestPathTo(17)).to.equal(4)
      })
      it('is 31 for 1024', () => {
        expect(shortestPathTo(1024)).to.equal(31)
      })
      it('is 480 for my input', () => {
        expect(shortestPathTo(347991)).to.equal(480)
      })
    })
  })

  describe('Part 2', () => {
    describe('Solving', () => {
      it('for 1 is 2', () => {
        expect(largerThan(1)).to.equal(2)
      })
      it('for 4 is 5', () => {
        expect(largerThan(4)).to.equal(5)
      })
      it('for 5 is 10', () => {
        expect(largerThan(5)).to.equal(10)
      })
      it('for 349975 for my input', () => {
        expect(largerThan(347991)).to.equal(349975)
      })
    })
  })
})
