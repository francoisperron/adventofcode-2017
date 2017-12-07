import { describe, it } from 'mocha'
import { expect } from 'chai'
import {
  banksEqual, bankWithMostBlocks, reallocation, reallocationCycle, redistribute,
  seenBefore
} from './reallocation'

const input = [14, 0, 15, 12, 11, 11, 3, 5, 1, 6, 8, 4, 9, 1, 8, 4]

describe('The reallocation', () => {
  describe('Part 1', () => {
    it('finds the bank with the most blocks', () => {
      expect(bankWithMostBlocks([0, 2, 7, 0])).to.equal(2)
      expect(bankWithMostBlocks([7, 2, 7, 0])).to.equal(0)
    })

    it('redistributes given bank\'s blocks', () => {
      expect(redistribute([0, 2, 7, 0], 2)).to.deep.equal([2, 4, 1, 2])
      expect(redistribute([2, 4, 1, 2], 1)).to.deep.equal([3, 1, 2, 3])
    })

    it('compares banks', () => {
      expect(banksEqual([0, 1], [0, 1])).to.equal(true)
      expect(banksEqual([0, 1], [0, 2])).to.equal(false)
    })

    it('finds previous reallocation', () => {
      expect(seenBefore([0, 2, 7, 0], [[0, 2, 7, 0], [0, 0, 0, 0]])).to.equal(true)
      expect(seenBefore([0, 2, 7, 0], [[1, 1, 1, 1], [0, 0, 0, 0]])).to.equal(false)
    })

    describe('Solving', () => {
      it('for the example', () => {
        expect(reallocation([0, 2, 7, 0]).redistributions).to.equal(5)
      })
      it('for my input', () => {
        expect(reallocation(input).redistributions).to.equal(11137)
      })
    })
  })

  describe('Part 2', () => {
    describe('Solving', () => {
      it('for the example', () => {
        expect(reallocationCycle([0, 2, 7, 0])).to.equal(4)
      })
      it('for my input', () => {
        expect(reallocationCycle(input)).to.equal(1037)
      })
    })
  })
})
