import { fetchAudioBuffer } from 'webaudio-tools'
import { OscilloscopeElement } from '../src'

customElements.define('x-oscilloscope', OscilloscopeElement)
document.body.innerHTML = `
<div id="demo" style="display:inline-flex;height:80px;">
  <x-oscilloscope autoresize divider=4></x-oscilloscope>
</div>
`

const ctx = new AudioContext({ sampleRate: 44100, latencyHint: 0.08 })

const analyser = ctx.createAnalyser()
analyser.fftSize = 8192
analyser.smoothingTimeConstant = 0
analyser.maxDecibels = 0
analyser.minDecibels = -100

// @ts-ignore
const url = new URL('alpha_molecule.ogg', import.meta.url).toString()

fetchAudioBuffer(ctx, url).then(audioBuffer => {
  const source = ctx.createBufferSource()
  source.buffer = audioBuffer
  source.loop = true
  source.connect(ctx.destination)
  source.start(0, 83)
  source.connect(analyser)
  ;(document.querySelector('x-oscilloscope') as OscilloscopeElement).analyser = analyser
})

window.onclick = () => ctx.state !== 'running' ? ctx.resume() : ctx.suspend()
if (ctx.state !== 'running') document.body.appendChild(new Text('click to start/stop'))
// requestAnimationFrame <- for shoty
