// based on https://github.com/fenomas/webaudio-viz/blob/master/src/index.js
export class Stabilizer {
  // overly magical ad-hoc routine to choose where to start drawing data
  numOffsets = 10
  offsetsSpan = 320
  offsets: number[] = Array.from({ length: this.numOffsets }).map((_, i) =>
    ((this.offsetsSpan / this.numOffsets) * ((i / this.numOffsets) ** 1.3) * this.numOffsets) | 0
  )
  prev = Array(this.numOffsets).fill(0)
  points = Array(this.numOffsets).fill(0)

  findStartingPoint(data: Float32Array) {
    let count = 0
    let p = 0

    while (count < this.numOffsets && p >= 0) {
      p = this.findUpwardsZeroCrossing(data, p, data.length / 2)
      if (p > 0)
        this.points[count++] = p
    }
    if (count < 2) return this.points[0] || 0

    // try to find a starting point similar to the previous one
    p = 0
    let bestScore = 999999.9
    for (let i = 0, np = 0; i < count; i++) {
      np = this.points[i]
      const score = this.scorePoint(np, data)
      if (score > bestScore) continue
      bestScore = score // * 0.95 - 1
      p = np
    }

    for (let i = 0; i < this.numOffsets; i++)
      this.prev[i] = data[this.offsets[i] + p]

    return p + -(p > 1)
  }

  scorePoint(pt: number, data: Float32Array) {
    let acc = 0
    for (let i = 0; i < this.numOffsets; i++)
      acc += Math.abs(data[pt + this.offsets[i]] - this.prev[i])
    return acc
  }

  findUpwardsZeroCrossing(data: Float32Array, start: number, end: number) {
    for (let ct = 0, i = start; i < end; i++) {
      if (data[i] < 0) ct++
      if (data[i] > 0 && ct > 0) return i
    }
    return -1
  }
}
