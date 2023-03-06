# Sveltekit Image

[![NPM](https://img.shields.io/npm/v/sveltekit-image)](https://www.npmjs.com/package/sveltekit-image)

Forked from `rayriffy/svelte-aio` 🤍 Automatic image optimization for SvelteKit.

> 🚧 Library still under construction. Expect bugs and missing features :) 

## Todo
- Convert all compatible images to webp
- Support allowed domains/remote domains via glob
- Config option to change image API path

## Table of contents

1. [Usage](#usage)
2. [Props](#props)
3. [Preloading](#preloading)
4. [Configuration](#configuration)

## Usage

Check out full sample at [`src/routes`](./src/routes)

Install dependencies

```
pnpm add sveltekit-image
```

In `routes/api/_image`, create a `+server.ts` endpoint

```ts
import type { RequestHandler } from '@sveltejs/kit'
import { requestHandler } from 'sveltekit-image/api'

export const GET: RequestHandler = requestHandler()
```

Then import the image component

```svelte
<!-- +page.svelte -->
<script lang="ts">
  import Image from 'sveltekit-image'
</script>

<Image
  src="your-image-url"
  width={800}
  height={600}
  alt="My lovely image"
  class="wow this even supports classnames"
/>
```

### Local images
> As of `0.4.1`, you can reference the path to local images just the same as a url

## Props

`src`
URL/path to your image

`width: number | undefined`
Width of your image to help reduce CLS

`height: number | undefined`
Height of your image to help reduce CLS

`alt: string | undefined`
Don't be an ass.. always provide an alt

`quality: number | 73`
Quality of images generated. (1-100)

`sync: boolean | async`
Defaults to `async`. Changes image decoding

`eager: boolean | lazy`
Defaults to `lazy`. Changes native browser `loading` attribute

`prioritize: boolean | false`
Defaults to `auto`. Changes native browser `fetchpriority` attribute

`important: boolean | false`
Defaults to `false`. Sets `sync, eager, prioritize` to `true`

## Configuration

Server configrations can be specified via option params. **All parameters are optional!**

```ts
export const GET: RequestHandler = requestHandler({
  avif: false,
  remoteDomains: ['moonface.digital'],
  allowedDomains: ['moonface.digital'],
  ttl: 1000 * 60 * 60 * 24 * 7,
  storePath: '.svelte-kit/images',
})
```

### avif

`boolean`

Enable AVIF image format. Defaults to `false`

> **Warning:** The `.avif` format is not recommended due to its high CPU usage.. we are looking to convert all to webp instead

### remoteDomains

`string[] | undefined`

List of domains that API will be allowed to optimize. Defaults to _unset_

From example above, `remoteDomains: ['moonface.digital'],` means that API will only be allowed to optimize images that served from `moonface.digital`.

Unset this option will tell API to optimize **ALL IMAGES** from **EVERYWHERE**

### allowedDomains

`string[] | undefined`

List of domains that allowed to use the API, this will be checked via header `Referer`

Only affects on `NODE_ENV=production`. Unset this option will allow anywhere to request image from this API.

### ttl

`number`

Time until images will become invalidated, defaults to **7 days**

Values are in **milliseconds**

### storePath

`string`

Directory path to cache optimized images. Defaults to `.svelte-kit/images`

Provided paths will be relative to `path.join()`
