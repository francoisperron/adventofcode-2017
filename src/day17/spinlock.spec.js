import { describe, it } from 'mocha'
import { expect } from 'chai'
import { initSpinlock, shortCircuit, shortCircuitBigTime, spin } from './spinlock'

describe('Day 17: Spinlock', () => {
  describe('Part 1', () => {
    it('has a initial state', () => {
      expect(initSpinlock(3)).to.deep.equal({pos: 0, value: 1, step: 3, buffer: [0]})
    })

    it('spins', () => {
      const spinlock = initSpinlock(3)

      expect(spin(spinlock)).to.deep.equal({pos: 1, value: 2, step: 3, buffer: [0, 1]})
      expect(spin(spinlock)).to.deep.equal({pos: 1, value: 3, step: 3, buffer: [0, 2, 1]})
      expect(spin(spinlock)).to.deep.equal({pos: 2, value: 4, step: 3, buffer: [0, 2, 3, 1]})
      expect(spin(spinlock)).to.deep.equal({pos: 2, value: 5, step: 3, buffer: [0, 2, 4, 3, 1]})
      expect(spin(spinlock)).to.deep.equal({pos: 1, value: 6, step: 3, buffer: [0, 5, 2, 4, 3, 1]})
      expect(spin(spinlock)).to.deep.equal({pos: 5, value: 7, step: 3, buffer: [0, 5, 2, 4, 3, 6, 1]})
    })

    describe('Solving', () => {
      it('for the example', () => {
        expect(shortCircuit(initSpinlock(3))).to.equal(638)
      })
      it('for my input', () => {
        expect(shortCircuit(initSpinlock(366))).to.equal(1025)
      })
    })
  })

  describe('Part 2', () => {
    it('solving for my input', () => {
      expect(shortCircuitBigTime(initSpinlock(366))).to.equal(37803463)
    })
  })
})
