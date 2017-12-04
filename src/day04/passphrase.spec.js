import { describe, it } from 'mocha'
import { expect } from 'chai'
import { readFileSync } from 'fs'
import { hasAnagrams, hasDuplicate, valid, validWithAnagrams } from './passphrase'

describe('Passphrase', () => {
  describe('Part 1', () => {
    it('finds duplicates', () => {
      expect(hasDuplicate('aa', ['aa', 'bb', 'cc', 'dd', 'ee'])).to.equal(false)
      expect(hasDuplicate('aa', ['aa', 'bb', 'cc', 'dd', 'aa'])).to.equal(true)
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

  describe('Part 2', () => {
    it('finds anagrams', () => {
      expect(hasAnagrams('abcde', ['abcde', 'xyz', 'ecdab'])).to.equal(true)
    })

    describe('Solving', () => {
      it('invalid', () => {
        expect(validWithAnagrams('abcde xyz ecdab')).to.equal(false)
        expect(validWithAnagrams('abcde abcde')).to.equal(false)
        expect(validWithAnagrams('oiii ioii iioi iiio')).to.equal(false)
      })
      it('valid', () => {
        expect(validWithAnagrams('abcde fghij')).to.equal(true)
        expect(validWithAnagrams('a ab abc abd abf abj')).to.equal(true)
        expect(validWithAnagrams('iiii oiii ooii oooi oooo')).to.equal(true)
      })
      it('for my input', () => {
        const passphrase = readFileSync('src/day04/input.txt').toString().split('\n')
        const valids = passphrase.map(p => validWithAnagrams(p)).filter(v => v === true).length

        expect(valids).to.equal(119)
      })
    })
  })
})
