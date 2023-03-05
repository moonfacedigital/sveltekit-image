import { getHash } from './getHash.js';
import { cacheVersion } from '../constants/cacheVersion.js';
export const getCacheKey = (href, width, quality, mimeType) => {
    return getHash([cacheVersion, href, width, quality, mimeType]);
};
