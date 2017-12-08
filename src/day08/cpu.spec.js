import { describe, it } from 'mocha'
import { expect } from 'chai'
import { conditionPasses, instructionOf, largestValueInRegisters, valueOf } from './cpu'

describe('The CPU\'s instructions', () => {
  describe('Part 1', () => {
    it('parses an instruction', () => {
      const instruction = instructionOf('b dec 5 if a > 1')
      expect(instruction.reg).to.equal('b')
      expect(instruction.mod).to.equal(-5)
      expect(instruction.condition.reg).to.equal('a')
      expect(instruction.condition.operator).to.equal('>')
      expect(instruction.condition.value).to.equal(1)
    })

    it('retrieves register value', () => {
      expect(valueOf('a', {'b': 2})).to.equal(0)
      expect(valueOf('a', {'a': 2})).to.equal(2)
    })

    it('executes > condition', () => {
      expect(conditionPasses({reg: 'a', operator: '>', value: 1}, {'a': 2})).to.equal(true)
      expect(conditionPasses({reg: 'a', operator: '>', value: 1}, {'a': 1})).to.equal(false)
    })

    it('executes < condition', () => {
      expect(conditionPasses({reg: 'a', operator: '<', value: 1}, {'a': 1})).to.equal(false)
      expect(conditionPasses({reg: 'a', operator: '<', value: 1}, {'a': 0})).to.equal(true)
    })

    describe('Solving', () => {
      it('for the example', () => {
        expect(largestValueInRegisters('src/day08/example.txt')).to.equal(1)
      })
      it('for my input', () => {
        expect(largestValueInRegisters('src/day08/input.txt')).to.equal(4888)
      })
    })
  })
})
