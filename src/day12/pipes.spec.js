import { describe, it } from 'mocha'
import { expect } from 'chai'
import { programGroups } from './pipes'

describe('Day 12 - Digital plumbers', () => {
  describe('Part 1', () => {
    describe('Solving', () => {
      it('for the example', () => {
        expect(programGroups('src/day12/example.txt')[0]).to.equal(6)
      })
      it('for my input', () => {
        expect(programGroups('src/day12/input.txt')[0]).to.equal(378)
      })
    })
  })

  describe('Part 2', () => {
    describe('Solving', () => {
      it('for the example', () => {
        expect(programGroups('src/day12/example.txt').filter(visits => visits > 0).length).to.equal(2)
      })
      it('for my input', () => {
        expect(programGroups('src/day12/input.txt').filter(visits => visits > 0).length).to.equal(204)
      })
    })
  })
})
