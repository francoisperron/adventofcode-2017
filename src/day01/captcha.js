const toNumbers = (digits) => digits.split('').map(d => parseInt(d))

const matches = (n1, n2) => n1 === n2

const captcha = (digits) => {
  const numbers = [...toNumbers(digits), toNumbers(digits)[0]]

  return numbers.reduce((sum, n, i, numbers) => matches(n, numbers[i + 1]) ? sum + n : sum, 0)
}

const captcha2 = (digits) => {
  const numbers = [...toNumbers(digits), ...toNumbers(digits)]

  const digitsSize = digits.length
  const step = digitsSize / 2
  return numbers.reduce((sum, n, i, numbers) => matches(n, numbers[i + step]) && i < digitsSize ? sum + n : sum, 0)
}

export { captcha, captcha2 }
