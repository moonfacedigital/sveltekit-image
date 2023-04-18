<script lang="ts">
  import type { Loader } from '$lib/@types/Loader.js'
  import { page } from /* @vite-ignore */ '$app/stores'
  import { browser } from /* @vite-ignore */ '$app/environment'
  import { onDestroy } from 'svelte'

  // Possible props

  export let src: string
  export let width: number = 400
  export let height: number | undefined = undefined
  export let alt: string | undefined = undefined
  export let sync: boolean | undefined = undefined
  export let eager: boolean | undefined = undefined
  export let priority: boolean | undefined = false
  export let important: boolean | undefined = false
  export let preload: boolean | undefined = false
  export let quality: number = 73
  export let clip: boolean = true
  export let fill: boolean = false
  export let style: string | undefined = undefined
  export let unoptimized: boolean = false
  export let sizes: string = "100vw"

  let klass: string | undefined = undefined
  export { klass as class }

  const defDeviceSizes = [640, 750, 828, 1080, 1200, 1920, 2048, 3840]
  const imageSizes = [16, 32, 48, 64, 96, 128, 256, 384]

  const allSizes = [...defDeviceSizes, ...imageSizes].sort((a, b) => a - b)
  const deviceSizes = defDeviceSizes.sort((a, b) => a - b)

  type ImageConfig = {
  allSizes: number[]
  deviceSizes: number[]
  output?: 'standalone' | 'export'
}
  function getWidths(
  { deviceSizes, allSizes }: ImageConfig,
  width: number | undefined,
  sizes: string | undefined
): { widths: number[]; kind: 'w' | 'x' } {
  if (sizes) {
    // Find all the "vw" percent sizes used in the sizes prop
    const viewportWidthRe = /(^|\s)(1?\d?\d)vw/g
    const percentSizes = []
    for (let match; (match = viewportWidthRe.exec(sizes)); match) {
      percentSizes.push(parseInt(match[2]))
    }
    if (percentSizes.length) {
      const smallestRatio = Math.min(...percentSizes) * 0.01
      return {
        widths: allSizes.filter((s) => s >= deviceSizes[0] * smallestRatio),
        kind: 'w',
      }
    }
    return { widths: allSizes, kind: 'w' }
  }
  if (typeof width !== 'number') {
    return { widths: deviceSizes, kind: 'w' }
  }

  const widths = [
    ...new Set(
      // > This means that most OLED screens that say they are 3x resolution,
      // > are actually 3x in the green color, but only 1.5x in the red and
      // > blue colors. Showing a 3x resolution image in the app vs a 2x
      // > resolution image will be visually the same, though the 3x image
      // > takes significantly more data. Even true 3x resolution screens are
      // > wasteful as the human eye cannot see that level of detail without
      // > something like a magnifying glass.
      // https://blog.twitter.com/engineering/en_us/topics/infrastructure/2019/capping-image-fidelity-on-ultra-high-resolution-devices.html
      [width, width * 2 /*, width * 3*/].map(
        (w) => allSizes.find((p) => p >= w) || allSizes[allSizes.length - 1]
      )
    ),
  ]
  return { widths, kind: 'x' }
}

  function getInt(x: unknown): number | undefined {
  if (typeof x === 'number' || typeof x === 'undefined') {
    return x
  }
  if (typeof x === 'string' && /^[0-9]+$/.test(x)) {
    return parseInt(x, 10)
  }
  return NaN
}

let widthInt = getInt(width)
    let heightInt = getInt(height)

type GenImgAttrsData = {
  config: ImageConfig
  src: string
  unoptimized: boolean
  loader: any
  width?: number
  quality?: number
  sizes?: string
}

type GenImgAttrsResult = {
  src: string
  srcSet: string | undefined
  sizes: string | undefined
}

function generateImgAttrs({
  src,
  unoptimized,
  width,
  quality,
  sizes,
  loader,
}: GenImgAttrsData): GenImgAttrsResult {
  if (unoptimized) {
    return { src, srcSet: undefined, sizes: undefined }
  }

  const { widths, kind } = getWidths(config, width, sizes)
  const last = widths.length - 1

  return {
    sizes: !sizes && kind === 'w' ? '100vw' : sizes,
    srcSet: widths
      .map(
        (w, i) =>
          `${loader({ config, src, quality, width: w })} ${
            kind === 'w' ? w : i + 1
          }${kind}`
      )
      .join(', '),

    // It's intended to keep `src` the last attribute because React updates
    // attributes in order. If we keep `src` the first one, Safari will
    // immediately start to fetch `src`, before `sizes` and `srcSet` are even
    // updated by React. That causes multiple unnecessary requests if `srcSet`
    // and `sizes` are defined.
    // This bug cannot be reproduced in Chrome or Firefox.
    src: loader({ config, src, quality, width: widths[last] }),
  }
}
const imgAttributes = generateImgAttrs({
      config,
      src,
      unoptimized,
      width: widthInt,
      quality: qualityInt,
      sizes,
    })
</script>

<img
  src={builtSrc}
  srcset={builtSrcset}
  decoding={sync || important ? 'sync' : 'async'}
  loading={eager || important ? 'eager' : 'lazy'}
  width={widthInt}
  height={heightInt}
  sizes
  alt
  {...{
    alt,
    class: clip ?  'sveltekit-image ski-clip_allowed ' + klass  : "sveltekit-image " + klass,
  }}
  fetchpriority={priority || important ? 'high' : 'auto'}
/>