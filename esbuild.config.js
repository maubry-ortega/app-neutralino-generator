import esbuild from "esbuild";
import path from "path";
import { fileURLToPath } from "url";
import { mkdirSync } from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
mkdirSync(path.join(__dirname, "public", "dist"), { recursive: true });

esbuild.build({
  entryPoints: [path.join(__dirname, "src", "main.js")],
  bundle: true,
  outfile: path.join(__dirname, "public", "dist", "bundle.js"),
  format: "esm",
  sourcemap: true,
  minify: false,
  platform: "browser",
  loader: { ".json": "json" },
  logLevel: "debug"
})
.then(() => console.log("⚡ Build completado"))
.catch((error) => {
  console.error("🚨 Error:", error);
  process.exit(1);
});
