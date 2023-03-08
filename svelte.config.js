import sveltePreprocess from 'svelte-preprocess'
import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'

import autoAdapter from '@sveltejs/adapter-auto'
import adapter from '@sveltejs/adapter-netlify'
import bunAdapter from 'svelte-adapter-bun'
import { readFileSync } from 'fs'
import module from 'module'

// Fix node errors with Sharp
module.Module._extensions['.js'] = function (module, filename) {
  module._compile(readFileSync(filename, 'utf8'), filename)
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: sveltePreprocess({
    replace: [['$app', '$app']],
    postcss: {
      plugins: [tailwind, autoprefixer],
    },
  }),
  kit: {
    adapter:
      process.env.BUN === 'true'
        ? bunAdapter()
        : process.env.NETLIFY === 'true'
        ? adapter()
        : autoAdapter(),
    alias: {
      // this will match a file
      $app: './$app/',
      $lib: './src/lib/',
    },
  },
}

export default config
