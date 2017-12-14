import { describe, it } from 'mocha'
import { expect } from 'chai'
import { safePassage, severityOf, stateOf, tick } from './firewall'

describe('The 13 - Packet scanner', () => {
  describe('Part 1', () => {
    it('creates initial state from file', () => {
      const state = stateOf('src/day13/example.txt')
      expect(state.layers.length).to.equal(7)
    })

    describe('every tick', () => {
      it('moves packet', () => {
        const state = {layer: 0, severity: 4, layers: [{depth: 3, range: 4, scannerAt: 0}]}
        expect(tick(state).layer).to.equal(1)
      })

      it('adds severity when scanned', () => {
        const state = {layer: 0, severity: 4, layers: [{depth: 3, range: 4, scannerAt: 0}]}
        expect(tick(state).severity).to.equal(4 + 3 * 4)
      })

      it('keeps current severity when not scanned', () => {
        const state = {layer: 0, severity: 4, layers: [{depth: 3, range: 4, scannerAt: 1}]}
        expect(tick(state).severity).to.equal(4)
      })

      it('updates scanners top down', () => {
        const state = {layer: 0, severity: 0, layers: [{depth: 3, range: 4, scannerAt: 0, lastScannerAt: 1}]}
        expect(tick(state).layers[0].scannerAt).to.equal(1)
        expect(tick(state).layers[0].lastScannerAt).to.equal(0)
      })

      it('updates scanners up', () => {
        const state = {layer: 0, severity: 0, layers: [{depth: 3, range: 4, scannerAt: 3, lastScannerAt: 1}]}
        expect(tick(state).layers[0].scannerAt).to.equal(2)
        expect(tick(state).layers[0].lastScannerAt).to.equal(3)
      })

      it('updates scanners middle down', () => {
        const state = {layer: 0, severity: 0, layers: [{depth: 3, range: 4, scannerAt: 2, lastScannerAt: 1}]}
        expect(tick(state).layers[0].scannerAt).to.equal(3)
        expect(tick(state).layers[0].lastScannerAt).to.equal(2)
      })

      it('updates scanners middle up', () => {
        const state = {layer: 0, severity: 0, layers: [{depth: 3, range: 4, scannerAt: 2, lastScannerAt: 3}]}
        expect(tick(state).layers[0].scannerAt).to.equal(1)
        expect(tick(state).layers[0].lastScannerAt).to.equal(2)
      })
    })

    describe('Solving', () => {
      it('for the example', () => {
        expect(severityOf('src/day13/example.txt')).to.equal(24)
      })
      it('for my input', () => {
        expect(severityOf('src/day13/input.txt')).to.equal(2384)
      })
    })
  })

  describe('Part 2', () => {
    describe('Solving', () => {
      it('for the example', () => {
        expect(safePassage('src/day13/example.txt')).to.equal(10)
      })
      // it('for my input', () => {
      //   expect(safePassage('src/day13/input.txt')).to.equal(3921270)
      // })
    })
  })
})
