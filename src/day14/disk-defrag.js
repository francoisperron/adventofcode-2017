import { initKnot, knotDenseHash } from '../day10/knot-hash'

const knot = initKnot()

export const defrag = (key) => {
  const disk = [...Array(128).keys()]
    .map(i => key + '-' + i)
    .map(k => knotDenseHash(knot, k))
    .map(k => toBits(k))

  const used = usedOf(disk)
  const groups = groupsOf(disk)

  return {used, groups}
}

export const toBits = (digits) => digits.split('').map(d => parseInt(d, 16).toString(2).padStart(4, '0')).join('').split('')

const usedOf = (disk) => disk.reduce((sum, d) => sum + d.filter(b => b === '1').length, 0)

export const groupsOf = (disk) => {
  const for128 = [...Array(disk.length).keys()]

  return for128.reduce((groups, i) => for128.reduce((groups, j) => check(i, j, disk) ? groups + 1 : groups, groups), 0)
}

const check = (i, j, bits) => {
  if (isUsed(i, j, bits)) {
    scanGroup(i, j, bits)
    return true
  }
  return false
}

const isUsed = (i, j, bits) => bits[j] && bits[j][i] === '1'

const scanGroup = (i, j, bits) => {
  bits[j][i] = '0'

  check(i + 1, j, bits)
  check(i - 1, j, bits)
  check(i, j + 1, bits)
  check(i, j - 1, bits)
}
