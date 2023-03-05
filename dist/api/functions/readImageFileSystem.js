import fs from 'fs';
import path from 'path';
import { detectContentType } from '../../../../../../../../../src/lib/api/functions/detectContentType.js';
export const readImageFileSystem = async (cacheKey, cacheDirectory) => {
    const now = Date.now();
    try {
        const requestedDirectory = path.join(cacheDirectory, cacheKey);
        const files = await fs.promises.readdir(requestedDirectory);
        for (const file of files) {
            const [maxAgeString, expireAtString, etag, extension] = file.split('.');
            const filePath = path.join(requestedDirectory, file);
            const expireAt = Number(expireAtString);
            const maxAge = Number(maxAgeString);
            if (expireAt < now) {
                await fs.promises.rm(filePath);
            }
            else {
                const buffer = await fs.promises.readFile(path.join(requestedDirectory, file));
                return {
                    buffer,
                    etag,
                    maxAge,
                    contentType: detectContentType(buffer),
                };
            }
        }
    }
    catch (_) { }
    return null;
};
