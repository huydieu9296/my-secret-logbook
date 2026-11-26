import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const entryPath = join(dir, "entry.txt");
const entry = readFileSync(entryPath, "utf8").trim();

if (entry.length === 0) {
  console.error("entry.txt is empty");
  process.exit(1);
}
if (entry.length > 200) {
  console.error(`entry is ${entry.length} chars, over the 200-char limit`);
  process.exit(1);
}

// The bounty counts characters, not bytes: an em-dash is one character.
// Keep the check on entry.length (JS string length) so multi-byte
// punctuation is counted the same way the bounty counts it.
const charCount = [...entry].length;
if (charCount > 200) {
  console.error(`entry is ${charCount} chars, over the 200-char limit`);
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "output.txt"), entry + "\n", "utf8");
console.log(`OK: ${entry.length} chars -> ${join(outDir, "output.txt")}`);
