import { describe, it } from 'mocha'
import { expect } from 'chai'
import { readFileSync } from 'fs'
import { bottomProgram, holdingWeigth, parseFile, unbalanced } from './tower'

describe('This program tower', () => {
  describe('Part 1', () => {
    describe('Solving', () => {
      it('for the example', () => {
        const exampleInput = 'src/day07/example.txt'
        expect(bottomProgram(exampleInput)).to.equal('tknk')
      })
      it('for my input', () => {
        const input = 'src/day07/input.txt'
        expect(bottomProgram(input)).to.equal('vmpywg')
      })
    })
  })

  describe('Part 2', () => {
    it('calculates holding program weigths', () => {
      const programs = parseFile('src/day07/example.txt')
      expect(holdingWeigth('ktlj', programs)).to.equal(57)
      expect(holdingWeigth('ugml', programs)).to.equal(251)
    })

    describe('Solving', () => {
      it('for the example', () => {
        const exampleInput = 'src/day07/example.txt'
        expect(unbalanced(exampleInput).newWeigth).to.equal(60)
      })
      // it('for my input', () => {
      //   const input = 'src/day07/input.txt'
      //   expect(unbalanced(input).newWeigth).to.equal(60)
      // })
    })
  })
})
