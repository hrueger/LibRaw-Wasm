import { build } from "esbuild";
import { promises as fs } from "fs";
import { exec } from "child_process";

(async () => {
    try {
        let librawjs = (await fs.readFile("src/libraw.js")).toString();
        librawjs = librawjs.replace(/var workerOptions=([^]+?);worker=new Worker\(new URL\("([^"]+)",import.meta.url\),workerOptions\);/, `worker=new Worker(new URL("$2",import.meta.url),$1);`); // Correction to make worker options static so that it works with vite
        await fs.writeFile("src/libraw.js", librawjs);
        await build({
            entryPoints: ["src/index.ts", "src/worker.ts", "src/libraw.js"], // Entry point of your library
            outdir: "dist", // Output directory
            bundle: true, // Bundle all files
            minify: true, // Minify the output
            sourcemap: true, // Generate source maps
            format: "esm", // Output format (ES Module)
        });
        // build types bundle using tsc
        await new Promise((resolve, reject) => {
            exec("tsc --declaration --emitDeclarationOnly --outDir dist", (error, stdout, stderr) => {
                if (error) {
                    console.error(stderr);
                    reject(error);
                } else {
                    resolve(stdout);
                }
            });
        });
        await fs.rename("src/libraw.wasm", "dist/libraw.wasm");
        await fs.rename("src/libraw.js", "dist/libraw.js");
        await fs.rename("src/libraw.worker.mjs", "dist/libraw.worker.mjs");
        await fs.copyFile("src/types.d.ts", "dist/types.d.ts");
        console.log("Build successful!");
    } catch (error) {
        console.error("Build failed:", error);
        process.exit(1);
    }
})();
