import { mediaType } from '@hapi/accept';
export const getSupportedMimeType = (options, accept = '') => {
    const mimeType = mediaType(accept, options);
    return accept.includes(mimeType) ? mimeType : '';
};
