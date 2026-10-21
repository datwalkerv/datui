// Inventory tooling.
//   node scripts/inventory.mjs set <Status> <Name...>   update rows (Status: "Not started" | "In progress" | "Implemented" | "Tested" | "Documented")
//   node scripts/inventory.mjs check                     verify every status claim against the repo and print a summary
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const FILE = "docs/component-inventory.md";
const STATUSES = ["Not started", "In progress", "Implemented", "Tested", "Documented"];
const LIB = "packages/datui/src";
const ROW = /^\| (.+?) \| (.+?) \| (.+?) \| (.+?) \|$/;

const lines = readFileSync(FILE, "utf8").split("\n");
const rows = lines
  .map((line, i) => ({ i, m: line.match(ROW) }))
  .filter(({ m }) => m && m[1] !== "Category" && !m[1].startsWith("---"))
  .map(({ i, m }) => ({ i, category: m[1], name: m[2], kind: m[3], status: m[4] }));

const [cmd, ...args] = process.argv.slice(2);

if (cmd === "set") {
  const [status, ...names] = args;
  if (!STATUSES.includes(status)) throw new Error(`Unknown status "${status}"`);
  for (const name of names) {
    const matches = rows.filter((r) => r.name === name);
    if (matches.length === 0) throw new Error(`No inventory row named "${name}"`);
    for (const r of matches) lines[r.i] = `| ${r.category} | ${r.name} | ${r.kind} | ${status} |`;
  }
  writeFileSync(FILE, lines.join("\n"));
  console.log(`Set ${names.length} row(s) to ${status}.`);
} else if (cmd === "check") {
  const index = readFileSync(join(LIB, "index.ts"), "utf8");
  const exported = new Set();
  for (const m of index.matchAll(/components\/(\w+)/g)) {
    const folder = join(LIB, "components", m[1]);
    for (const f of readdirSync(folder)) {
      if (!f.endsWith(".tsx") || f.endsWith(".test.tsx")) continue;
      for (const e of readFileSync(join(folder, f), "utf8").matchAll(/export (?:const|function|class) (\w+)/g))
        exported.add(e[1]);
    }
  }
  const allSource = (dir) =>
    readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
      d.isDirectory() ? allSource(join(dir, d.name)) : d.name.endsWith(".tsx") ? [join(dir, d.name)] : [],
    );
  const tests = allSource(LIB)
    .filter((f) => f.endsWith(".test.tsx"))
    .map((f) => readFileSync(f, "utf8"))
    .join("\n");
  const docsDir = "apps/docs/content";
  const metas = existsSync(docsDir)
    ? readdirSync(docsDir)
        .map((d) => join(docsDir, d, "meta.ts"))
        .filter(existsSync)
        .map((f) => readFileSync(f, "utf8"))
        .join("\n")
    : "";

  const problems = [];
  const counts = Object.fromEntries(STATUSES.map((s) => [s, 0]));
  for (const r of rows) {
    counts[r.status] = (counts[r.status] ?? 0) + 1;
    const level = STATUSES.indexOf(r.status);
    if (level < 0) problems.push(`${r.name}: unknown status "${r.status}"`);
    // Internal / replaced rows are satisfied by their host component; only public rows are verified here.
    if (r.kind !== "public" || level < 2) continue;
    const names = r.name.split(/\s*\/\s*/);
    for (const n of names) {
      if (!exported.has(n)) problems.push(`${n}: marked ${r.status} but not exported from the package`);
      if (level >= 3 && !new RegExp(`\\b${n}\\b`).test(tests))
        problems.push(`${n}: marked ${r.status} but no test references it`);
      if (level >= 4 && !new RegExp(`\\b${n}\\b`).test(metas))
        problems.push(`${n}: marked Documented but no docs page lists it`);
    }
  }
  console.log(
    Object.entries(counts)
      .map(([s, c]) => `${s}: ${c}`)
      .join(" · "),
    `(total ${rows.length})`,
  );
  if (problems.length) {
    console.error(problems.join("\n"));
    process.exit(1);
  }
} else {
  console.error("usage: inventory.mjs set <Status> <Name...> | check");
  process.exit(2);
}
