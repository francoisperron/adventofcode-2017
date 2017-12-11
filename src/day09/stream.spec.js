import { describe, it } from 'mocha'
import { expect } from 'chai'
import { readFile } from '../read-file'
import { analyse, clean, initState } from './stream'

describe('Day 9 - The stream', () => {
  describe('Part 1', () => {
    it('counts { and }', () => {
      const state = initState()

      expect(analyse('{', state)).to.deep.equal({...state, score: 1, depth: 2})
      expect(analyse('{', state)).to.deep.equal({...state, score: 3, depth: 3})
      expect(analyse('}', state)).to.deep.equal({...state, score: 3, depth: 2})
    })

    it('skips ! and the char after', () => {
      const state = initState()

      expect(analyse('!', state)).to.deep.equal({...state, skipNext: true})
      expect(analyse('a', state)).to.deep.equal({...state, skipNext: false})
    })

    it('skips garbage and counts it', () => {
      const state = initState()

      expect(analyse('<', state)).to.deep.equal({...state, inGarbage: true, garbage: 0})
      expect(analyse('<', state)).to.deep.equal({...state, inGarbage: true, garbage: 1})
      expect(analyse('a', state)).to.deep.equal({...state, inGarbage: true, garbage: 2})
      expect(analyse('>', state)).to.deep.equal({...state, inGarbage: false, garbage: 2})
    })

    describe('Solving', () => {
      it('for examples', () => {
        expect(clean('{}').score).to.equal(1)
        expect(clean('{{{}}}').score).to.equal(6)
        expect(clean('{{},{}}').score).to.equal(5)
        expect(clean('{<a>,<a>,<a>,<a>}').score).to.equal(1)
        expect(clean('{{<ab>},{<ab>},{<ab>},{<ab>}}').score).to.equal(9)
        expect(clean('{{<!!>},{<!!>},{<!!>},{<!!>}}').score).to.equal(9)
        expect(clean('{{<a!>},{<a!>},{<a!>},{<ab>}}').score).to.equal(3)
      })

      it('for my input', () => {
        const stream = readFile('src/day09/input.txt')
        expect(clean(stream).score).to.equal(12505)
      })
    })
  })

  describe('Part 2', () => {
    describe('Solving', () => {
      it('for example', () => {
        expect(clean('<{o"i!a,<{i<a>').garbage).to.equal(10)
      })
      it('for my input', () => {
        const stream = readFile('src/day09/input.txt')
        expect(clean(stream).garbage).to.equal(6671)
      })
    })
  })
})
