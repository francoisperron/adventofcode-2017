import { readLines } from '../read-file'

const arrayOf = (size) => [...Array(size).keys()]

export const severityOf = (file) => {
  const initState = stateOf(file)
  return initState.layers.reduce((state) => tick(state), initState).severity
}

export const safePassage = (file) => {
  let state = stateOf(file)
  let delay = 0
  while (caught(state)) {
    delay++
    state = {layer: 0, severity: 0, caught: false, layers: state.layers.map(l => updateScanner(l))}
  }
  return delay
}

export const caught = (state) => {
  let s = state
  for (let i = 0; i < state.layers.length; i++) {
    s = tick(s)
    if (s.caught) {
      return true
    }
  }

  return false
}

export const tick = (state) => {
  const layer = state.layers[state.layer]
  const caught = layer.scannerAt === 0 && layer.range !== 0
  return {
    layer: state.layer + 1,
    severity: state.severity + currentSeverity(state),
    layers: state.layers.map(l => updateScanner(l)),
    caught
  }
}

export const stateOf = (file) => {
  let layers = readLines(file).map(l => layerOf(l))
  const last = layers[layers.length - 1]
  layers = arrayOf(last.depth + 1).map(i => layers.find(l => l.depth === i) ? layers.find(l => l.depth === i) : emptyLayer(i))
  return {layer: 0, severity: 0, caught: false, layers: layers}
}

const emptyLayer = (i) => {
  return {
    depth: i,
    range: 0,
    scannerAt: 0,
    lastScannerAt: 0
  }
}

const layerOf = (l) => {
  return {
    depth: parseInt(l.split(': ')[0]),
    range: parseInt(l.split(': ')[1]),
    scannerAt: 0,
    lastScannerAt: 0
  }
}

const currentSeverity = (state) => {
  const currentLayer = state.layers[state.layer]
  if (currentLayer.scannerAt === 0) {
    return currentLayer.depth * currentLayer.range
  }
  return 0
}

const updateScanner = (layer) => {
  if (layer.range === 0) return layer

  if (layer.scannerAt + 1 === layer.range || (layer.scannerAt < layer.lastScannerAt && layer.scannerAt !== 0)) {
    return {...layer, scannerAt: layer.scannerAt - 1, lastScannerAt: layer.scannerAt}
  }
  return {...layer, scannerAt: layer.scannerAt + 1, lastScannerAt: layer.scannerAt}
}
