const lineChecksum = (line) => {
  line.sort((a, b) => a - b)
  return line[line.length-1] - line[0]
}
const checksum = (spreadsheet) => {
  return spreadsheet.reduce((sum, line) => sum + lineChecksum(line), 0)
}

export { lineChecksum, checksum }