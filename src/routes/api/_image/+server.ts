import { requestHandler } from '../../../../dist/api'
import type { RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = requestHandler({
  leadingUrl:
    process.env.NODE_ENV === 'production'
      ? 'https://sveltekit-image.opensource.moonface.digital'
      : 'http://127.0.0.1:5173',
})
