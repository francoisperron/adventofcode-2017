const captcha = (digits) => {
  const numbers = digits.split('').map(d => parseInt(d))
  numbers.push(numbers[0])

  return numbers.reduce((sum, n, i, numbers) => n === numbers[i + 1] ? sum + n : sum, 0)
}

export { captcha }