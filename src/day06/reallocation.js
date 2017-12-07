export const bankWithMostBlocks = (banks) => (
  banks.reduce((bankWithMostBlock, block, index) => block > banks[bankWithMostBlock] ? index : bankWithMostBlock, 0)
)

export const redistribute = (banks, index) => {
  const blocks = banks[index]
  const newBanks = [...banks.slice(0, index), 0, ...banks.slice(index + 1)]
  for (let i = 1; i <= blocks; i++) {
    newBanks[(index + i) % banks.length] += 1
  }
  return newBanks
}

export const banksEqual = (b1, b2) => {
  for (let i = 0; i < b1.length; i++) {
    if (b1[i] !== b2[i]) return false
  }
  return true
}

export const seenBefore = (banks, previousBanks) => {
  return previousBanks.find(b => banksEqual(b, banks)) !== undefined
}

export const reallocation = (banks) => {
  const previousBanks = []

  while (!seenBefore(banks, previousBanks)) {
    previousBanks.push(banks)
    banks = redistribute(banks, bankWithMostBlocks(banks))
  }
  return {redistributions: previousBanks.length, banks}
}

export const reallocationCycle = (banks) => {
  const banks2 = reallocation(banks).banks
  return reallocation(banks2).redistributions
}
