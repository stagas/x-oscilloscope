/** @jsxImportSource mixter/jsx */
import { attrs, mixter, props, shadow, state } from 'mixter'
import { element, jsx } from 'mixter/jsx'
import { PlotElement } from 'x-plot'
import { Stabilizer } from './stabilizer'

export class OscilloscopeElement extends mixter(
  HTMLElement,
  shadow(),
  attrs(
    class {
      autoResize = true
      width = 150
      height = 50
      background = '#123'
      color = '#1ff'
    }
  ),
  props(
    class {
      analyser?: AnalyserNode
      /** @private */
      analyserData?: Float32Array
      /** @private */
      Plot = element(PlotElement)
      /** @private */
      plotData = new Float32Array([0])
      /** @private */
      stabilizer = new Stabilizer()
      /** @private */
      draw?: () => void
      /** @private */
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
    }
  ),
  state<OscilloscopeElement>(({ $, effect, reduce }) => {
    const { render } = jsx($)

    let animFrame: any

    $.analyserData = reduce(({ analyser }) => new Float32Array(analyser.frequencyBinCount))

    $.draw = reduce(({ analyser, analyserData, stabilizer }) => (function draw() {
      animFrame = requestAnimationFrame(draw)
      analyser.getFloatTimeDomainData(analyserData)
      const startIndex = stabilizer.findStartingPoint(analyserData)
      $.plotData = analyserData.slice(startIndex, startIndex + analyser.frequencyBinCount / 2)
    }))

    $.loop = reduce(({ draw }) => ({
      start() {
        animFrame = requestAnimationFrame(draw)
      },
      stop() {
        cancelAnimationFrame(animFrame)
      },
    }))

    effect(({ loop }) => {
      loop.start()
      return () => loop.stop()
    })

    render(({ Plot, autoResize, width, height, background, color, plotData }) => (
      <Plot
        autoResize={autoResize}
        data={plotData}
        width={width}
        height={height}
        background={background}
        color={color}
      />
    ))
  })
) {}
