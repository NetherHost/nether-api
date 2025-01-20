const esbuild = require("esbuild");
const config = require("../esbuild.config.js");
const logger = require("../src/lib/logger");

async function build() {
  try {
    await esbuild.build(config);
    logger.success("Build completed successfully!");
  } catch (error) {
    logger.error(`Build failed: ${error}`);
    process.exit(1);
  }
}

build();
