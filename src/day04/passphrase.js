const hasDuplicate = (word, words) => words.filter(otherWord => otherWord === word).length > 1

const valid = (passphrase) => {
  const words = passphrase.split(' ')

  return !words.map(word => hasDuplicate(word, words)).some(duplicate => duplicate === true)

}

export { hasDuplicate, valid }
