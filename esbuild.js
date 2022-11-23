import esbuid from "esbuild";
import dotenv from "dotenv";
dotenv.config();

await esbuid.build({
  bundle: true,
  external: ["./node_modules/*"],
  entryPoints: ["./Server.ts", "./Seeds.ts"],
  target: "esNext",
  outdir: "./build",
  platform: "node",
  format: "esm",
  watch: !process.env.BUILD,
  minify: true,
  incremental: true,
});
if (process.env.BUILD) process.exit();
