import { LibRaw, LibRawSettings, LibRawFullMetadata, LibRawImageData, LibRawRawImageData, LibRawBasicMetadata } from "./types";

export default class LibRawImpl implements LibRaw {
    private worker: Worker;
    private waitForWorker: false | { throw: (err: unknown) => void; return: (val: any) => void } = false;

    constructor() {
        this.worker = new Worker(new URL("./worker.js", import.meta.url), { type: "module" });
        this.worker.onmessage = ({ data }) => {
            if (this.waitForWorker) {
                if (data && data.error) this.waitForWorker.throw(data.error);
                else this.waitForWorker.return(data.out);
                this.waitForWorker = false;
            }
        };
    }

    async runFn<T = any>(fn: string, ...args: any[]): Promise<T> {
        return new Promise<T>((res, err) => {
            this.waitForWorker = { throw: err, return: res };
            this.worker.postMessage(
                { fn, args },
                args.map((a) => (a instanceof ArrayBuffer || ArrayBuffer.isView(a) ? (a as any as ArrayBufferView).buffer : undefined)).filter((a): a is ArrayBuffer => !!a)
            );
        });
    }

    async open(buffer: Uint8Array, settings?: LibRawSettings): Promise<void> {
        await this.runFn("open", buffer, settings);
    }

    async metadata<T extends boolean>(fullOutput?: T): Promise<T extends true ? LibRawFullMetadata : LibRawBasicMetadata> {
        const metadata = await this.runFn<T extends true ? LibRawFullMetadata : LibRawBasicMetadata>("metadata", !!fullOutput);
        if (metadata?.hasOwnProperty("thumb_format")) {
            metadata.thumb_format = ["unknown", "jpeg", "bitmap", "bitmap16", "layer", "rollei", "h265"][metadata.thumb_format as any] || "unknown";
        }
        if (metadata?.hasOwnProperty("desc")) {
            metadata.desc = String(metadata.desc).trim();
        }
        if (metadata?.hasOwnProperty("timestamp")) {
            metadata.timestamp = new Date(metadata.timestamp);
        }
        return metadata;
    }

    async imageData(): Promise<LibRawImageData> {
        return await this.runFn<LibRawImageData>("imageData");
    }

    async rawImageData(): Promise<LibRawRawImageData> {
        return await this.runFn<LibRawRawImageData>("rawImageData");
    }
}
