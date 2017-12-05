import { describe, it } from 'mocha'
import { expect } from 'chai'
import { readFileSync } from 'fs'
import { jumpsUntilOutside, strangeJumpsUntilOutside } from './cpu'

describe('The CPU', () => {
  describe('Part 1', () => {
    describe('Solving', () => {
      it('for the exemple', () => {
        expect(jumpsUntilOutside([0, 3, 0, 1, -3])).to.equal(5)
      })
      it('for one element', () => {
        expect(jumpsUntilOutside([3])).to.equal(1)
      })
      it('for my input', () => {
        const instructions = readFileSync('src/day05/instructions.txt').toString().split('\n').map(i => parseInt(i))
        expect(jumpsUntilOutside(instructions)).to.equal(343467)
      })
    })
  })

  describe('Part 2', () => {
    describe('Solving', () => {
      it('for the exemple', () => {
        expect(strangeJumpsUntilOutside([0, 3, 0, 1, -3])).to.equal(10)
      })
      it('for my input', () => {
        const instructions = readFileSync('src/day05/instructions.txt').toString().split('\n').map(i => parseInt(i))
        expect(strangeJumpsUntilOutside(instructions)).to.equal(24774780)
      })
    })
  })
})
