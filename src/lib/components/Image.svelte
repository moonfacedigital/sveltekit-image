<script lang="ts">
  import type { Loader } from '$lib/@types/Loader.js'
  import { page } from /* @vite-ignore */ '$app/stores'
  import { browser } from /* @vite-ignore */ '$app/environment'
  import { onDestroy } from 'svelte'

  export let src: string
  export let width: number | undefined = undefined
  export let height: number | undefined = undefined
  export let alt: string | undefined = undefined
  export let sync: boolean | undefined = undefined
  export let eager: boolean | undefined = undefined
  export let prioritize: boolean | undefined = false
  export let important: boolean | undefined = false
  export let preload: boolean | undefined = false
  export let quality: number = 73
  let klass: string | undefined = undefined
  export { klass as class }

  // Progressive Enhancement. Fix sveltekit prerender without JS
  if (!src.startsWith('https://' || 'http://')) {
    src = $page.url.protocol + '//' + $page.url.host + '/' + src
  }

  export let loader: Loader = (src, width, quality) =>
    `/api/_image?${new URLSearchParams({
      url: src,
      w: width.toString(),
      q: quality.toString(),
    }).toString()}`

  // all possible sizes from devices width to regular placeholders
  const allSizes = [
    16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048,
    3840,
  ]

  // generate all widths to be used for optimizations
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
      [width, width! * 2 /*, width * 3*/].map(
        w => allSizes.find(p => p >= w!) || allSizes[allSizes.length - 1]
      )
    ),
  ]

  const builtSrcset = widths
    .map((o, i) => `${loader(src, o, quality)} ${i + 1}x`)
    .join(', ')
  const builtSrc = loader(src, widths[widths.length - 1], quality)
  // Detect if image comes from url and preconnect
  const isExternalUrl = () =>
    ['http://', 'https://', 'ftp://'].some(protocol =>
      src.startsWith(protocol)
    ) && !src.startsWith($page.url.origin)

  var preconnectLink: HTMLinkElement | undefined
  var dnsLink: HTMLinkElement | undefined
  var preloadLink: HTMLinkElement | undefined

  // Archive meta optimizations

  if (browser) {
    console.log('Page origin', $page.url.origin)

    const isExternalUrl =
      ['http://', 'https://', 'ftp://'].some(protocol =>
        src.startsWith(protocol)
      ) && !src.startsWith($page.url.origin)

    const hasExistingPreconnect = document.querySelector(
      `link[href='${new URL(src).origin}'][rel="preconnect"]`
    )

    const hasExistingPreload = document.querySelector(
      `link[href='${src}'][rel="preload"]`
    )

    preloadLink = document.createElement('link')
    preloadLink.href = src
    preloadLink.rel = 'preload'
    preloadLink.as = 'image'
    document.head.appendChild(preloadLink)

    dnsLink = document.createElement('link')
    dnsLink.href = new URL(src).origin
    dnsLink.rel = 'dns-prefetch'
    document.head.appendChild(dnsLink)

    preconnectLink = document.createElement('link')
    preconnectLink.href = new URL(src).origin
    preconnectLink.rel = 'preconnect'
    preconnectLink.crossOrigin = ''

    if (important || preload) {
      document.head.appendChild(preloadLink)
    }

    if (isExternalUrl) {
      document.head.appendChild(dnsLink)
      document.head.appendChild(preconnectLink)
    }
  }
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<img
  src={builtSrc}
  srcset={builtSrcset}
  decoding={sync || important ? 'sync' : 'async'}
  loading={eager || important ? 'eager' : 'lazy'}
  sizes="(min-width: 1024px) 800px, (min-width: 768px) 80vw, 100vw"
  {...{
    alt,
    height,
    width,
    class: klass,
  }}
  fetchpriority={prioritize || important ? 'high' : 'auto'}
/>
