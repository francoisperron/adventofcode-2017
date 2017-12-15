import { describe, it } from 'mocha'
import { expect } from 'chai'
import { generator, judge, judge2, next, valuesMatch } from './generators'

describe('Day 15 - Dueling Generators', () => {
  describe('Part 1', () => {
    it('calculates next value', () => {
      const gen = generator(65, 16807)
      expect(next(gen).value).to.equal(1092455)
      expect(next(gen).value).to.equal(1181022009)
      expect(next(gen).value).to.equal(245556042)
      expect(next(gen).value).to.equal(1744312007)
    })
    it('matches binary values', () => {
      expect(valuesMatch(1181022009, 1233683848)).to.equal(false)
      expect(valuesMatch(245556042, 1431495498)).to.equal(true)
    })
    describe('Solving', () => {
      it('for the example', () => {
        expect(judge(65, 8921)).to.equal(588)
      })
      it('for my input', () => {
        expect(judge(116, 299)).to.equal(569)
      })
    })
  })
  describe('Part 2', () => {
    describe('Solving', () => {
      it('for the example', () => {
        expect(judge2(65, 8921)).to.equal(309)
      })
      it('for my input', () => {
        expect(judge2(116, 299)).to.equal(298)
      })
    })
  })
})
