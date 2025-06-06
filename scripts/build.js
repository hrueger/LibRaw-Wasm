import { build } from "esbuild";
import { promises as fs } from "fs";

(async () => {
    try {
        let librawjs = (await fs.readFile("src/libraw.js")).toString();
        librawjs = librawjs.replace(/var workerOptions=([^]+?);worker=new Worker\(new URL\("([^"]+)",import.meta.url\),workerOptions\);/, `worker=new Worker(new URL("$2",import.meta.url),$1);`); // Correction to make worker options static so that it works with vite
        await fs.writeFile("src/libraw.js", librawjs);
        await build({
            entryPoints: ["src/index.js", "src/worker.js", "src/libraw.js"], // Entry point of your library
            outdir: "dist", // Output directory
            bundle: true, // Bundle all files
            minify: true, // Minify the output
            sourcemap: true, // Generate source maps
            format: "esm", // Output format (ES Module)
        });
        await fs.rename("src/libraw.wasm", "dist/libraw.wasm");
        await fs.rename("src/libraw.js", "dist/libraw.js");
        await fs.rename("src/libraw.worker.mjs", "dist/libraw.worker.mjs");
        console.log("Build successful!");
    } catch (error) {
        console.error("Build failed:", error);
        process.exit(1);
    }
})();
