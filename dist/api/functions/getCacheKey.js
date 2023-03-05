import { getHash } from '../../../../../../../../../src/lib/api/functions/getHash.js';
import { cacheVersion } from '../../../../../../../../../src/lib/api/constants/cacheVersion.js';
export const getCacheKey = (href, width, quality, mimeType) => {
    return getHash([cacheVersion, href, width, quality, mimeType]);
};
