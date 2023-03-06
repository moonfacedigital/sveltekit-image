import { requestHandler } from '$lib/api'

import type { RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = requestHandler({
  productionUrl: 'https://fix-loading--leafy-marshmallow-d81e57.netlify.app',
})
