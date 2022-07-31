/** @jsxImportSource sigl */
import $ from 'sigl'

import { PlotElement } from 'x-plot'
import { Stabilizer } from './stabilizer'

export interface OscilloscopeElement extends $.Element<OscilloscopeElement> {}

@$.element()
export class OscilloscopeElement extends HTMLElement {
  @$.attr() autoResize = true
  @$.attr() width = 150
  @$.attr() height = 50
  @$.attr() background = '#123'
  @$.attr() color = '#1ff'
  @$.attr() divider = 1

  analyser?: AnalyserNode
  analyserData?: Float32Array
  Plot = $.element(PlotElement)
  plotData = new Float32Array([0])
  stabilizer = new Stabilizer()
  draw?: () => void
  loop?: {
    start(): void
    stop(): void
  }
  /**
   * Start displaying the spectrum.
   */
  start() {
    this.loop?.start()
  }
  /**
   * Stop displaying the spectrum.
   */
  stop() {
    this.loop?.stop()
  }

  mounted($: OscilloscopeElement['$']) {
    let animFrame: any

    $.analyserData = $.reduce(({ analyser }) => new Float32Array(analyser.frequencyBinCount))

    let piece = 0
    $.draw = $.reduce(({ analyser, analyserData, divider, stabilizer }) => (function draw() {
      animFrame = requestAnimationFrame(draw)

      if (divider === 1 || !piece)
        analyser.getFloatTimeDomainData(analyserData)

      let data
      if (divider > 1) {
        const half = analyserData.length / divider
        piece = (piece + 1) % divider
        data = analyserData.slice(piece * half, piece * half + half)
      } else {
        data = analyserData
      }

      const startIndex = stabilizer.findStartingPoint(data)
      $.plotData = data.slice(startIndex, startIndex + analyser.frequencyBinCount / divider * 0.5)
    }))

    $.loop = $.reduce(({ draw }) => ({
      start() {
        animFrame = requestAnimationFrame(draw)
      },
      stop() {
        cancelAnimationFrame(animFrame)
      },
    }))

    $.effect(({ loop }) => {
      loop.start()
      return () => loop.stop()
    })

    $.render(({ Plot, autoResize, width, height, background, color, plotData }) => (
      <Plot
        autoResize={autoResize}
        data={plotData}
        width={width}
        height={height}
        background={background}
        color={color}
      />
    ))
  }
}
