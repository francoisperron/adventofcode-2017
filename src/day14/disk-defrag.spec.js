import { describe, it } from 'mocha'
import { expect } from 'chai'
import { defrag, toBits } from './disk-defrag'

describe('Day 14 - Disk Defragmentation', () => {
  describe('Part 1', () => {
    it('Converts to high-bit first', () => {
      expect(toBits('0').join('')).to.equal('0000')
      expect(toBits('1').join('')).to.equal('0001')
      expect(toBits('e').join('')).to.equal('1110')
      expect(toBits('a0c2017').join('')).to.equal('1010000011000010000000010111')
    })
    describe('Solving', () => {
      it('for the example', () => {
        expect(defrag('flqrgnkx').used).to.equal(8108)
      })
      it('for my input', () => {
        expect(defrag('stpzcrnm').used).to.equal(8250)
      })
    })
  })

  describe('Part 2', () => {
    describe('Solving', () => {
      it('for the example', () => {
        expect(defrag('flqrgnkx').groups).to.equal(1242)
      })
      it('for my input', () => {
        expect(defrag('stpzcrnm').groups).to.equal(1113)
      })
    })
  })
})
