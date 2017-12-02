const minMaxDiff = (line) => {
  line.sort((a, b) => a - b)
  return line[line.length-1] - line[0]
}

const divisible = (line) => {
  for (let i = 0; i < line.length; i++) {
    let n = line[i]
    for (let j = 0; j < line.length; j++) {
      let divider = line[j]
      if (i !== j && n % divider === 0){
        return n / divider
      }
    }
  }
}

const checksum = (spreadsheet, algo) => spreadsheet.reduce((sum, line) => sum + algo(line), 0)

export { minMaxDiff, divisible, checksum }