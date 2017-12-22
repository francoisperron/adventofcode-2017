import { describe, it } from 'mocha'
import { expect } from 'chai'
import { initState, step, travel } from './tubes'

const example = 'src/day19/example.txt'

describe('Day 19 - A Series of Tubes ', () => {
  describe('Part 1', () => {
    it('goes down on |', () => {
      const state = initState(example)
      const newState = step(state)
      expect(newState.row).to.equal(2)
      expect(newState.col).to.equal(5)
      expect(newState.direction).to.equal('down')
    })

    it('keeps letters', () => {
      const state = initState(example)
      step(state)
      const newState = step(state)

      expect(newState.row).to.equal(3)
      expect(newState.col).to.equal(5)
      expect(newState.direction).to.equal('down')
      expect(newState.letters).to.equal('A')
    })

    describe('Solving', () => {
      it('for the example', () => {
        expect(travel(example).letters).to.equal('ABCDEF')
      })
      it('for my input', () => {
        expect(travel('src/day19/input.txt').letters).to.equal('VTWBPYAQFU')
      })
    })
  })

  describe('Part 2', () => {
    describe('Solving', () => {
      it('for the example', () => {
        expect(travel(example).steps).to.equal(38)
      })
      it('for my input', () => {
        expect(travel('src/day19/input.txt').steps).to.equal(17358)
      })
    })
  })
})
