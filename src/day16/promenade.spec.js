import { describe, it } from 'mocha'
import { expect } from 'chai'
import { dance, extremeDance, move } from './promemade'
import { readFile } from '../read-file'

describe('Day 16 - Permutation Promenade', () => {
  describe('Part 1', () => {
    it('spins', () => {
      expect(move('abcde', 's1')).to.equal('eabcd')
      expect(move('abcde', 's3')).to.equal('cdeab')
    })

    it('exchanges', () => {
      expect(move('eabcd', 'x3/4')).to.equal('eabdc')
      expect(move('eabcd', 'x4/3')).to.equal('eabdc')
      expect(move('eabdc', 'x0/2')).to.equal('baedc')
      expect(move('eabcd', 'x2/2')).to.equal('eabcd')
      expect(move('opkbcdefghijalmn', 'x6/11')).to.equal('opkbcdjfghiealmn')
    })

    it('partners!', () => {
      expect(move('eabdc', 'pe/b')).to.equal('baedc')
    })

    it('solving for example', () => {
      const moves = ['s1', 'x3/4', 'pe/b']
      const positions = 'abcde'

      expect(dance(positions, moves)).to.equal('baedc')
    })

    it('solving for my input', () => {
      const moves = readFile('src/day16/input.txt').split(',')
      const positions = 'abcdefghijklmnop'

      expect(dance(positions, moves)).to.equal('kgdchlfniambejop')
    })
  })

  describe('Part 2', () => {
    it('solving for my input', () => {
      const moves = readFile('src/day16/input.txt').split(',')
      const positions = 'abcdefghijklmnop'

      expect(extremeDance(positions, moves)).to.equal('fjpmholcibdgeakn')
    })
  })
})
