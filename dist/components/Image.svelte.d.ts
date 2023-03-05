import { SvelteComponentTyped } from "svelte";
import type { Loader } from '../@types/Loader.js';
declare const __propDef: {
    props: {
        src: string;
        width?: number | undefined;
        height?: number | undefined;
        alt?: string | undefined;
        sync?: boolean | undefined;
        eager?: boolean | undefined;
        prioritize?: boolean | undefined;
        important?: boolean | undefined;
        preload?: boolean | undefined;
        class?: string | undefined;
        quality?: number | undefined;
        loader?: Loader | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ImageProps = typeof __propDef.props;
export type ImageEvents = typeof __propDef.events;
export type ImageSlots = typeof __propDef.slots;
export default class Image extends SvelteComponentTyped<ImageProps, ImageEvents, ImageSlots> {
}
export {};
