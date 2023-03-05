import send from 'send';
send.mime.define({
    'image/avif': ['avif'],
});
export function getExtension(contentType) {
    const { mime } = send;
    if ('getExtension' in mime) {
        // 2.0
        // @ts-ignore
        return mime.getExtension(contentType);
    }
    // 1.0
    return mime.extension(contentType);
}
