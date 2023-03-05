import type { ResponsePayload } from '../../../../../../../../../src/lib/@types/ResponsePayload.js';
export declare const sendResponse: (payload: ResponsePayload, cacheHit: 'HIT' | 'MISS', extraHeaders?: Record<string, string>) => Response;
