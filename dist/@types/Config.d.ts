export interface Config {
    remoteDomains?: string[];
    allowedDomains?: string[];
    storePath: string;
    ttl: number;
    avif: boolean;
    leadingUrl: string;
}
