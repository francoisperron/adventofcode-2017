import { readLines } from '../read-file'

const arrayOf = (size) => [...Array(size).keys()]

export const severityOf = (file) => {
  const state = stateOf(file)
  state.layers.forEach((_) => tick(state))
  return state.severity
}

export const safePassage = (file) => {
  let state = stateOf(file)
  let layers = [...state.layers]
  let delay = 0
  while (caught(state)) {
    delay++
    layers.forEach(l => updateScanner(l))
    state = {layer: 0, severity: 0, caught: false, layers}
  }
  return delay
}

export const caught = (state) => {
  for (let i = 0; i < state.layers.length; i++) {
    tick(state)
    if (state.caught) {
      return true
    }
  }

  return false
}

export const tick = (state) => {
  const layer = state.layers[state.layer]
  state.caught = layer.scannerAt === 0 && layer.range !== 0
  state.severity += currentSeverity(state)
  state.layers.forEach(l => updateScanner(l))
  state.layer++
  return state
}

const currentSeverity = (state) => {
  const currentLayer = state.layers[state.layer]
  if (currentLayer.scannerAt === 0) {
    return currentLayer.depth * currentLayer.range
  }
  return 0
}

const updateScanner = (layer) => {
  if (layer.range === 0) return

  if (layer.scannerAt + 1 === layer.range || (layer.scannerAt < layer.lastScannerAt && layer.scannerAt !== 0)) {
    layer.lastScannerAt = layer.scannerAt
    layer.scannerAt--
  } else {
    layer.lastScannerAt = layer.scannerAt
    layer.scannerAt++
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
