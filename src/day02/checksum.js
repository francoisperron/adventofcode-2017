const minMaxDiff = (line) => {
  line.sort((a, b) => a - b)
  return line[line.length - 1] - line[0]
}

const isEvenlyDivisible = (dividend, divisor) => dividend !== divisor && dividend % divisor === 0

const divisible = (line) => {
  const {dividend, divisor} = line.reduce((found, dividend) => {
    const divisors = line.filter(divisor => isEvenlyDivisible(dividend, divisor))
    return divisors.length > 0 ? {dividend: dividend, divisor: divisors[0]} : found
  }, {})

  return dividend / divisor
}

const checksum = (spreadsheet, algo) => spreadsheet.reduce((sum, line) => sum + algo(line), 0)

export { minMaxDiff, divisible, checksum }
