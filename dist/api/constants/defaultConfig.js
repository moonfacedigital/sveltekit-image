export const defaultConfig = {
    leadingUrl: process.env.NODE_ENV === 'production'
        ? 'https://sveltekit-image.opensource.moonface.digital'
        : 'http://127.0.0.1:5173',
    avif: false,
    ttl: 1000 * 60 * 60 * 24 * 7,
    storePath: '.svelte-kit/images',
};
