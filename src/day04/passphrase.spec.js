import { describe, it } from 'mocha'
import { expect } from 'chai'
import { readFileSync } from 'fs'
import { hasDuplicate, valid } from './passphrase'

describe('Passphrase', () => {
  describe('Part 1', () => {
    it('finds duplicates', () => {
      expect(hasDuplicate('aa', ['aa','bb', 'cc', 'dd', 'ee'])).to.equal(false)
      expect(hasDuplicate('aa', ['aa','bb', 'cc', 'dd', 'aa'])).to.equal(true)
    })

    describe('Solving', () => {
      it('valid for aa bb cc dd ee', () => {
        expect(valid('aa bb cc dd ee')).to.equal(true)
      })

      it('invalid for aa bb cc dd aa', () => {
        expect(valid('aa bb cc dd aa')).to.equal(false)
      })

      it('valid for aa bb cc dd aaa', () => {
        expect(valid('aa bb cc dd aaa')).to.equal(true)
      })

      it('for my input', () => {
        const passphrase = readFileSync('src/day04/input.txt').toString().split('\n')
        const valids = passphrase.map(p => valid(p)).filter(v => v === true).length

        expect(valids).to.equal(325)
      })
    })
  })
}) 
