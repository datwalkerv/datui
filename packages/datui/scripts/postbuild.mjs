import { cp, readFile, writeFile } from "node:fs/promises";

// tsup's tree-shaking pass drops module directives, so mark the bundles as client modules here.
// Prepended on the first line so source map line numbers stay valid.
for (const file of ["dist/index.js", "dist/index.cjs"]) {
  const js = await readFile(file, "utf8");
  if (!js.startsWith('"use client";')) await writeFile(file, `"use client";${js}`);
}

await cp("src/styles", "dist/styles", { recursive: true });
// dist/styles.css is the public entry; in dist the compiled JS sits next to it.
const css = (await readFile("src/styles/index.css", "utf8"))
  .replaceAll('@import "./', '@import "./styles/')
  .replace('@source "../";', '@source "./";');
await writeFile("dist/styles.css", css);
