import { describe, it } from 'mocha'
import { expect } from 'chai'
import { initKnot, knotDenseHash, knotHash, tie, toHexadecimal, xorOf } from './knot-hash'

describe('The knot hash', () => {
  describe('Part 1', () => {
    it('reverses element', () => {
      const knot = {list: [0, 1, 2, 3, 4], currentPosition: 0, skipSize: 0}
      expect(tie(3, knot).list).to.deep.equal([2, 1, 0, 3, 4])
    })

    it('reverses element in the middle', () => {
      const knot = {list: [0, 1, 2, 3, 4], currentPosition: 1, skipSize: 0}
      expect(tie(3, knot).list).to.deep.equal([0, 3, 2, 1, 4])
    })

    it('reverses element with wrapping', () => {
      const knot = {list: [2, 1, 0, 3, 4], currentPosition: 3, skipSize: 1}
      expect(tie(4, knot).list).to.deep.equal([4, 3, 0, 1, 2])
    })

    it('reverses no elements', () => {
      const knot = {list: [4, 3, 0, 1, 2], currentPosition: 3, skipSize: 2}
      expect(tie(1, knot).list).to.deep.equal([4, 3, 0, 1, 2])
    })

    it('reverses all element with wrapping', () => {
      const knot = {list: [4, 3, 0, 1, 2], currentPosition: 1, skipSize: 3}
      expect(tie(5, knot).list).to.deep.equal([3, 4, 2, 1, 0])
    })

    it('calculates next position', () => {
      const knot = {list: [0, 1, 2, 3, 4], currentPosition: 0, skipSize: 0}
      expect(tie(3, knot).currentPosition).to.equal(3)
      expect(tie(3, knot).skipSize).to.equal(1)
    })

    it('calculates next position wraps', () => {
      const knot = {list: [2, 1, 0, 3, 4], currentPosition: 3, skipSize: 1}
      expect(tie(4, knot).currentPosition).to.equal(3)
      expect(tie(4, knot).skipSize).to.equal(2)
    })

    describe('Solving', () => {
      it('for the example', () => {
        const list = [0, 1, 2, 3, 4]
        const initialKnot = {...initKnot(), list}
        const lengths = [3, 4, 1, 5]
        const hash = knotHash(initialKnot, lengths)

        expect(hash.list[0] * hash.list[1]).to.equal(12)
      })
      it('for my input', () => {
        const lengths = [18, 1, 0, 161, 255, 137, 254, 252, 14, 95, 165, 33, 181, 168, 2, 188]
        const hash = knotHash(initKnot(), lengths)

        expect(hash.list[0] * hash.list[1]).to.equal(46600)
      })
    })
  })

  describe('Part 2', () => {
    it('calculates xor on 16 numbers', () => {
      expect(xorOf([65, 27, 9, 1, 4, 3, 40, 50, 91, 7, 6, 0, 2, 5, 68, 22])).to.equal(64)
    })

    it('converts to hexadecimal', () => {
      expect(toHexadecimal([64, 7, 255])).to.equal('4007ff')
    })

    describe('Solving', () => {
      it('for my input', () => {
        const lengths = '18,1,0,161,255,137,254,252,14,95,165,33,181,168,2,188'
        const hash = knotDenseHash(initKnot(), lengths)

        expect(hash).to.equal('23234babdc6afa036749cfa9b597de1b')
      })
    })
  })
})
