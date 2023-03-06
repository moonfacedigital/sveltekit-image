/// <reference types="node" />
export declare const writeImageToFileSystem: (cacheKey: string, contentType: string, maxAge: number, etag: string, buffer: Buffer, cacheDirectory: string) => Promise<void>;
