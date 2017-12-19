import { describe, it } from 'mocha'
import { expect } from 'chai'
import { duet } from './duet'
import { duet2 } from './duet-part2'


describe('Day 18: Duet', () => {
  describe('Part 1', () => {
    describe('Solving', () => {
      it('for the example', () => {
        expect(duet('src/day18/example.txt').lastSnd).to.equal(4)
      })
      it('for my input', () => {
        expect(duet('src/day18/input.txt').lastSnd).to.equal(3188)
      })
    })
  })
  describe('Part 2', () => {
    describe('Solving', () => {
      it('for the example', () => {
        expect(duet2('src/day18/example-part2.txt')).to.equal(3)
      })
      it('for my input', () => {
        expect(duet2('src/day18/input.txt')).to.equal(7112)
      })
    })
  })
})
