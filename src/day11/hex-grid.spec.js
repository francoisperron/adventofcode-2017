import { describe, it } from 'mocha'
import { expect } from 'chai'
import { distanceTo, walk } from './hex-grid'
import { readFile } from '../read-file'

describe('Day 11 - The hex grid', () => {
  describe('Part 1', () => {
    it('calculates the distance from 0,0,0', () => {
      expect(distanceTo({x: 0, y: 0, z: 1})).to.equal(1)
      expect(distanceTo({x: 0, y: 1, z: 0})).to.equal(1)
      expect(distanceTo({x: 1, y: 0, z: 0})).to.equal(1)

      expect(distanceTo({x: -2, y: 0, z: 1})).to.equal(2)
    })

    describe('Solving', () => {
      it('for the examples', () => {
        expect(walk('ne,ne,ne').distance).to.equal(3)
        expect(walk('ne,ne,sw,sw').distance).to.equal(0)
        expect(walk('ne,ne,s,s').distance).to.equal(2)
        expect(walk('se,sw,se,sw,sw').distance).to.equal(3)
        expect(walk('n,ne,nw,s,se,sw').distance).to.equal(0)
      })
      it('moves horizontaly', () => {
        expect(walk('ne,se').distance).to.equal(2)
      })
      it('moves verticaly', () => {
        expect(walk('ne,nw').distance).to.equal(1)
      })
      it('for my input', () => {
        const input = readFile('src/day11/input.txt')
        expect(walk(input).distance).to.equal(818)
      })
    })
  })

  describe('Part 2', () => {
    describe('Solving', () => {
      it('for my input', () => {
        const input = readFile('src/day11/input.txt')
        expect(walk(input).max).to.equal(1596)
      })
    })
  })
})
