import type { ResponsePayload } from '../../@types/ResponsePayload.js';
export declare const sendResponse: (payload: ResponsePayload, cacheHit: 'HIT' | 'MISS', extraHeaders?: Record<string, string>) => Response;
