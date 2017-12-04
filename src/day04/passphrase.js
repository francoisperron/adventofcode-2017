const hasDuplicate = (word, words) => words.filter(otherWord => otherWord === word).length > 1

const valid = (passphrase) => {
  const words = passphrase.split(' ')
  return !words.map(word => hasDuplicate(word, words)).some(duplicate => duplicate === true)
}

const hasAnagrams = (word, words) => {
  let sameLengthWords = words.filter(w => w.length === word.length && w !== word)

  for (let i = 0; i < word.length; i++) {
    let letter = word[i]
    sameLengthWords = sameLengthWords.map(w => w.replace(letter, '*'))
  }

  const found = '*'.repeat(word.length)
  return sameLengthWords.some(w => w === found)
}

const validWithAnagrams = (passphrase) => {
  const words = passphrase.split(' ')
  return !words.map(word => hasAnagrams(word, words) || hasDuplicate(word, words)).some(duplicate => duplicate === true)
}

export { hasDuplicate, hasAnagrams, valid, validWithAnagrams }
