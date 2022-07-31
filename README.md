<h1>
x-oscilloscope <a href="https://npmjs.org/package/x-oscilloscope"><img src="https://img.shields.io/badge/npm-v2.0.0-F00.svg?colorA=000"/></a> <a href="src"><img src="https://img.shields.io/badge/loc-116-FFF.svg?colorA=000"/></a> <a href="https://cdn.jsdelivr.net/npm/x-oscilloscope@2.0.0/dist/x-oscilloscope.min.js"><img src="https://img.shields.io/badge/brotli-18.6K-333.svg?colorA=000"/></a> <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-F0B.svg?colorA=000"/></a>
</h1>

<p></p>

Audio oscilloscope visualizer Web Component

<h4>
<table><tr><td title="Triple click to select and copy paste">
<code>npm i x-oscilloscope </code>
</td><td title="Triple click to select and copy paste">
<code>pnpm add x-oscilloscope </code>
</td><td title="Triple click to select and copy paste">
<code>yarn add x-oscilloscope</code>
</td></tr></table>
</h4>

## Examples

<details id="example$web" title="web" open><summary><span><a href="#example$web">#</a></span>  <code><strong>web</strong></code></summary>  <ul><p></p>  <a href="https://stagas.github.io/x-oscilloscope/example/web.html"><img width="274.2857142857143" src="example/web.webp"></img>  <p><strong>Try it live</strong></p></a>    <details id="source$web" title="web source code" ><summary><span><a href="#source$web">#</a></span>  <code><strong>view source</strong></code></summary>  <a href="example/web.ts">example/web.ts</a>  <p>

```ts
import { fetchAudioBuffer } from 'webaudio-tools'
import { OscilloscopeElement } from 'x-oscilloscope'

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
  ;(document.querySelector('x-oscilloscope') as OscilloscopeElement).analyser =
    analyser
})

window.onclick = () => ctx.state !== 'running' ? ctx.resume() : ctx.suspend()
if (ctx.state !== 'running')
  document.body.appendChild(new Text('click to start/stop'))
// requestAnimationFrame <- for shoty
```

</p>
</details></ul></details>

## API

<p>  <details id="Stabilizer$43" title="Class" ><summary><span><a href="#Stabilizer$43">#</a></span>  <code><strong>Stabilizer</strong></code>    </summary>  <a href="src/stabilizer.ts#L2">src/stabilizer.ts#L2</a>  <ul>        <p>  <details id="constructor$44" title="Constructor" ><summary><span><a href="#constructor$44">#</a></span>  <code><strong>constructor</strong></code><em>()</em>    </summary>    <ul>    <p>  <details id="new Stabilizer$45" title="ConstructorSignature" ><summary><span><a href="#new Stabilizer$45">#</a></span>  <code><strong>new Stabilizer</strong></code><em>()</em>    </summary>    <ul><p><a href="#Stabilizer$43">Stabilizer</a></p>        </ul></details></p>    </ul></details><details id="numOffsets$46" title="Property" ><summary><span><a href="#numOffsets$46">#</a></span>  <code><strong>numOffsets</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>10</code></span>  </summary>  <a href="src/stabilizer.ts#L4">src/stabilizer.ts#L4</a>  <ul><p>number</p>        </ul></details><details id="offsets$48" title="Property" ><summary><span><a href="#offsets$48">#</a></span>  <code><strong>offsets</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>...</code></span>  </summary>  <a href="src/stabilizer.ts#L6">src/stabilizer.ts#L6</a>  <ul><p>number  []</p>        </ul></details><details id="offsetsSpan$47" title="Property" ><summary><span><a href="#offsetsSpan$47">#</a></span>  <code><strong>offsetsSpan</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>320</code></span>  </summary>  <a href="src/stabilizer.ts#L5">src/stabilizer.ts#L5</a>  <ul><p>number</p>        </ul></details><details id="points$50" title="Property" ><summary><span><a href="#points$50">#</a></span>  <code><strong>points</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>...</code></span>  </summary>  <a href="src/stabilizer.ts#L10">src/stabilizer.ts#L10</a>  <ul><p>any  []</p>        </ul></details><details id="prev$49" title="Property" ><summary><span><a href="#prev$49">#</a></span>  <code><strong>prev</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>...</code></span>  </summary>  <a href="src/stabilizer.ts#L9">src/stabilizer.ts#L9</a>  <ul><p>any  []</p>        </ul></details><details id="findStartingPoint$51" title="Method" ><summary><span><a href="#findStartingPoint$51">#</a></span>  <code><strong>findStartingPoint</strong></code><em>(data)</em>    </summary>  <a href="src/stabilizer.ts#L12">src/stabilizer.ts#L12</a>  <ul>    <p>    <details id="data$53" title="Parameter" ><summary><span><a href="#data$53">#</a></span>  <code><strong>data</strong></code>    </summary>    <ul><p><span>Float32Array</span></p>        </ul></details>  <p><strong>findStartingPoint</strong><em>(data)</em>  &nbsp;=&gt;  <ul>any</ul></p></p>    </ul></details><details id="findUpwardsZeroCrossing$58" title="Method" ><summary><span><a href="#findUpwardsZeroCrossing$58">#</a></span>  <code><strong>findUpwardsZeroCrossing</strong></code><em>(data, start, end)</em>    </summary>  <a href="src/stabilizer.ts#L47">src/stabilizer.ts#L47</a>  <ul>    <p>    <details id="data$60" title="Parameter" ><summary><span><a href="#data$60">#</a></span>  <code><strong>data</strong></code>    </summary>    <ul><p><span>Float32Array</span></p>        </ul></details><details id="start$61" title="Parameter" ><summary><span><a href="#start$61">#</a></span>  <code><strong>start</strong></code>    </summary>    <ul><p>number</p>        </ul></details><details id="end$62" title="Parameter" ><summary><span><a href="#end$62">#</a></span>  <code><strong>end</strong></code>    </summary>    <ul><p>number</p>        </ul></details>  <p><strong>findUpwardsZeroCrossing</strong><em>(data, start, end)</em>  &nbsp;=&gt;  <ul>number</ul></p></p>    </ul></details><details id="scorePoint$54" title="Method" ><summary><span><a href="#scorePoint$54">#</a></span>  <code><strong>scorePoint</strong></code><em>(pt, data)</em>    </summary>  <a href="src/stabilizer.ts#L40">src/stabilizer.ts#L40</a>  <ul>    <p>    <details id="pt$56" title="Parameter" ><summary><span><a href="#pt$56">#</a></span>  <code><strong>pt</strong></code>    </summary>    <ul><p>number</p>        </ul></details><details id="data$57" title="Parameter" ><summary><span><a href="#data$57">#</a></span>  <code><strong>data</strong></code>    </summary>    <ul><p><span>Float32Array</span></p>        </ul></details>  <p><strong>scorePoint</strong><em>(pt, data)</em>  &nbsp;=&gt;  <ul>number</ul></p></p>    </ul></details></p></ul></details><details id="OscilloscopeElement$1" title="Class" open><summary><span><a href="#OscilloscopeElement$1">#</a></span>  <code><strong>OscilloscopeElement</strong></code>    </summary>  <a href="src/x-oscilloscope.tsx#L10">src/x-oscilloscope.tsx#L10</a>  <ul>        <p>  <details id="constructor$2" title="Constructor" ><summary><span><a href="#constructor$2">#</a></span>  <code><strong>constructor</strong></code><em>()</em>    </summary>    <ul>    <p>  <details id="new OscilloscopeElement$3" title="ConstructorSignature" ><summary><span><a href="#new OscilloscopeElement$3">#</a></span>  <code><strong>new OscilloscopeElement</strong></code><em>()</em>    </summary>    <ul><p><a href="#OscilloscopeElement$1">OscilloscopeElement</a></p>        </ul></details></p>    </ul></details><details id="Plot$12" title="Property" ><summary><span><a href="#Plot$12">#</a></span>  <code><strong>Plot</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>...</code></span>  </summary>  <a href="src/x-oscilloscope.tsx#L20">src/x-oscilloscope.tsx#L20</a>  <ul><p><span>Component</span>&lt;<span>PlotElement</span>, <span>HTMLElement</span>&gt;</p>        </ul></details><details id="analyser$10" title="Property" ><summary><span><a href="#analyser$10">#</a></span>  <code><strong>analyser</strong></code>    </summary>  <a href="src/x-oscilloscope.tsx#L18">src/x-oscilloscope.tsx#L18</a>  <ul><p><span>AnalyserNode</span></p>        </ul></details><details id="analyserData$11" title="Property" ><summary><span><a href="#analyserData$11">#</a></span>  <code><strong>analyserData</strong></code>    </summary>  <a href="src/x-oscilloscope.tsx#L19">src/x-oscilloscope.tsx#L19</a>  <ul><p><span>Float32Array</span></p>        </ul></details><details id="autoResize$4" title="Property" ><summary><span><a href="#autoResize$4">#</a></span>  <code><strong>autoResize</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>true</code></span>  </summary>  <a href="src/x-oscilloscope.tsx#L11">src/x-oscilloscope.tsx#L11</a>  <ul><p>boolean</p>        </ul></details><details id="background$7" title="Property" ><summary><span><a href="#background$7">#</a></span>  <code><strong>background</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>'#123'</code></span>  </summary>  <a href="src/x-oscilloscope.tsx#L14">src/x-oscilloscope.tsx#L14</a>  <ul><p>string</p>        </ul></details><details id="color$8" title="Property" ><summary><span><a href="#color$8">#</a></span>  <code><strong>color</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>'#1ff'</code></span>  </summary>  <a href="src/x-oscilloscope.tsx#L15">src/x-oscilloscope.tsx#L15</a>  <ul><p>string</p>        </ul></details><details id="divider$9" title="Property" ><summary><span><a href="#divider$9">#</a></span>  <code><strong>divider</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>1</code></span>  </summary>  <a href="src/x-oscilloscope.tsx#L16">src/x-oscilloscope.tsx#L16</a>  <ul><p>number</p>        </ul></details><details id="draw$15" title="Property" ><summary><span><a href="#draw$15">#</a></span>  <code><strong>draw</strong></code>    </summary>  <a href="src/x-oscilloscope.tsx#L23">src/x-oscilloscope.tsx#L23</a>  <ul><p><details id="__type$16" title="Function" ><summary><span><a href="#__type$16">#</a></span>  <em>()</em>    </summary>    <ul>    <p>      <p><strong></strong><em>()</em>  &nbsp;=&gt;  <ul>void</ul></p></p>    </ul></details></p>        </ul></details><details id="height$6" title="Property" ><summary><span><a href="#height$6">#</a></span>  <code><strong>height</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>50</code></span>  </summary>  <a href="src/x-oscilloscope.tsx#L13">src/x-oscilloscope.tsx#L13</a>  <ul><p>number</p>        </ul></details><details id="loop$18" title="Property" ><summary><span><a href="#loop$18">#</a></span>  <code><strong>loop</strong></code>    </summary>  <a href="src/x-oscilloscope.tsx#L24">src/x-oscilloscope.tsx#L24</a>  <ul><p>{<p>  <details id="start$20" title="Method" ><summary><span><a href="#start$20">#</a></span>  <code><strong>start</strong></code><em>()</em>    </summary>    <ul>    <p>      <p><strong>start</strong><em>()</em>  &nbsp;=&gt;  <ul>void</ul></p></p>    </ul></details><details id="stop$22" title="Method" ><summary><span><a href="#stop$22">#</a></span>  <code><strong>stop</strong></code><em>()</em>    </summary>    <ul>    <p>      <p><strong>stop</strong><em>()</em>  &nbsp;=&gt;  <ul>void</ul></p></p>    </ul></details></p>}</p>        </ul></details><details id="onmounted$40" title="Property" ><summary><span><a href="#onmounted$40">#</a></span>  <code><strong>onmounted</strong></code>    </summary>    <ul><p><span>EventHandler</span>&lt;<a href="#OscilloscopeElement$1">OscilloscopeElement</a>, <span>CustomEvent</span>&lt;any&gt;&gt;</p>        </ul></details><details id="onunmounted$41" title="Property" ><summary><span><a href="#onunmounted$41">#</a></span>  <code><strong>onunmounted</strong></code>    </summary>    <ul><p><span>EventHandler</span>&lt;<a href="#OscilloscopeElement$1">OscilloscopeElement</a>, <span>CustomEvent</span>&lt;any&gt;&gt;</p>        </ul></details><details id="plotData$13" title="Property" ><summary><span><a href="#plotData$13">#</a></span>  <code><strong>plotData</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>...</code></span>  </summary>  <a href="src/x-oscilloscope.tsx#L21">src/x-oscilloscope.tsx#L21</a>  <ul><p><span>Float32Array</span></p>        </ul></details><details id="stabilizer$14" title="Property" ><summary><span><a href="#stabilizer$14">#</a></span>  <code><strong>stabilizer</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>...</code></span>  </summary>  <a href="src/x-oscilloscope.tsx#L22">src/x-oscilloscope.tsx#L22</a>  <ul><p><a href="#Stabilizer$43">Stabilizer</a></p>        </ul></details><details id="width$5" title="Property" ><summary><span><a href="#width$5">#</a></span>  <code><strong>width</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>150</code></span>  </summary>  <a href="src/x-oscilloscope.tsx#L12">src/x-oscilloscope.tsx#L12</a>  <ul><p>number</p>        </ul></details><details id="mounted$28" title="Method" ><summary><span><a href="#mounted$28">#</a></span>  <code><strong>mounted</strong></code><em>($)</em>    </summary>  <a href="src/x-oscilloscope.tsx#L41">src/x-oscilloscope.tsx#L41</a>  <ul>    <p>    <details id="$$30" title="Parameter" ><summary><span><a href="#$$30">#</a></span>  <code><strong>$</strong></code>    </summary>    <ul><p><span>Context</span>&lt;<a href="#OscilloscopeElement$1">OscilloscopeElement</a> &amp; <span>JsxContext</span>&lt;<a href="#OscilloscopeElement$1">OscilloscopeElement</a>&gt; &amp; <span>Omit</span>&lt;{<p>    <details id="ctor$34" title="Parameter" ><summary><span><a href="#ctor$34">#</a></span>  <code><strong>ctor</strong></code>    </summary>    <ul><p><span>Class</span>&lt;<a href="#T$33">T</a>&gt;</p>        </ul></details>  <p><strong></strong>&lt;<span>T</span>&gt;<em>(ctor)</em>  &nbsp;=&gt;  <ul><span>CleanClass</span>&lt;<a href="#T$33">T</a>&gt;</ul></p>  <details id="ctx$38" title="Parameter" ><summary><span><a href="#ctx$38">#</a></span>  <code><strong>ctx</strong></code>    </summary>    <ul><p><a href="#T$37">T</a> | <span>Class</span>&lt;<a href="#T$37">T</a>&gt;</p>        </ul></details>  <p><strong></strong>&lt;<span>T</span>&gt;<em>(ctx)</em>  &nbsp;=&gt;  <ul><span>Wrapper</span>&lt;<a href="#T$37">T</a>&gt;</ul></p></p>} &amp; <span>__module</span> &amp; {}, <code>"transition"</code>&gt;&gt;</p>        </ul></details>  <p><strong>mounted</strong><em>($)</em>  &nbsp;=&gt;  <ul>void</ul></p></p>    </ul></details><details id="start$24" title="Method" ><summary><span><a href="#start$24">#</a></span>  <code><strong>start</strong></code><em>()</em>     &ndash; Start displaying the spectrum.</summary>  <a href="src/x-oscilloscope.tsx#L31">src/x-oscilloscope.tsx#L31</a>  <ul>    <p>      <p><strong>start</strong><em>()</em>  &nbsp;=&gt;  <ul>void</ul></p></p>    </ul></details><details id="stop$26" title="Method" ><summary><span><a href="#stop$26">#</a></span>  <code><strong>stop</strong></code><em>()</em>     &ndash; Stop displaying the spectrum.</summary>  <a href="src/x-oscilloscope.tsx#L37">src/x-oscilloscope.tsx#L37</a>  <ul>    <p>      <p><strong>stop</strong><em>()</em>  &nbsp;=&gt;  <ul>void</ul></p></p>    </ul></details></p></ul></details></p>

## Credits

- [sigl](https://npmjs.org/package/sigl) by [stagas](https://github.com/stagas) &ndash; Web framework
- [x-plot](https://npmjs.org/package/x-plot) by [stagas](https://github.com/stagas) &ndash; A Web Component that plots zoomable and pannable waveforms.

## Contributing

[Fork](https://github.com/stagas/x-oscilloscope/fork) or [edit](https://github.dev/stagas/x-oscilloscope) and submit a PR.

All contributions are welcome!

## License

<a href="LICENSE">MIT</a> &copy; 2022 [stagas](https://github.com/stagas)
