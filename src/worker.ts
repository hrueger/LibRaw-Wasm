import LibRawModule from "./libraw.js";
import type { LibRaw } from "./types";

let ready: Promise<void>;
let LibRawClass: any;
let raw: LibRaw;

async function initLibRaw() {
    ready = (async () => {
        const module = await LibRawModule();
        LibRawClass = module.LibRaw;
        raw = new LibRawClass();
    })();
}

initLibRaw();

self.onmessage = async (event: MessageEvent<{ fn: string; args: any[] }>) => {
    const { fn, args } = event.data;
    try {
        await ready;
        // @ts-ignore
        const out = raw[fn](...args);
        self.postMessage(
            { out },
            // @ts-expect-error
            (Array.isArray(out) ? out : typeof out == "object" ? Object.values(out) : [])
                .map((a) => {
                    if ([ArrayBuffer, Uint8Array, Int8Array, Uint16Array, Int16Array, Uint32Array, Int32Array, Float32Array, Float64Array].some((b) => a instanceof b)) {
                        return a.buffer;
                    }
                })
                .filter((a): a is ArrayBuffer => !!a)
        );
    } catch (err: any) {
        self.postMessage({ error: err.message });
    }
};
