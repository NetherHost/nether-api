const esbuild = require("esbuild");

const config = {
  entryPoints: ["src/server.js"],
  bundle: true,
  platform: "node",
  target: ["node18"],
  outdir: "dist",
  sourcemap: true,
  minify: true,
  external: ["express", "mongoose", "dotenv", "chalk", "boxen"],
};

module.exports = config;
