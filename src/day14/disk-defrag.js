import { initKnot, knotDenseHash } from '../day10/knot-hash'

const knot = initKnot()

export const defrag = (key) => {
  const disk = [...Array(128).keys()]
    .map(i => key + '-' + i)
    .map(k => knotDenseHash(knot, k))
    .map(k => toBits(k))
  const used = disk.reduce((sum, d) => sum + d.split('').filter(b => b === '1').length, 0)
  return {used: used}
}

export const toBits = (digits) => {
  return digits.split('').map(d => parseInt(d, 16).toString(2).padStart(4, '0')).join('')
}