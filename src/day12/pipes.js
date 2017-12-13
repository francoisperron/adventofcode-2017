import { readLines } from '../read-file'

export const programGroups = (file) => {
  const connections = readLines(file).map(l => connectionOf(l))
  const visits = []
  return connections.map((value, id) => visit(id, connections, visits))
}

const connectionOf = (l) => (l.split('<-> ')[1].split(',')).map(id => parseInt(id))

const visit = (id, connections, visited) => {
  if (visited.includes(id)) { return 0 }

  visited.push(id)
  return connections[id].reduce((visitSum, id) => visitSum + visit(id, connections, visited), 1)
}
