// Absurd Invention Pitch — one sentence, at most 220 characters.
//
// The pitch names a ridiculous invention (the Crumb Butler) and the tiny
// everyday annoyance it fixes (crumbs lost down the sofa cushions), with
// the joke landing in the final words.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const PITCH =
  "Meet the Crumb Butler, a tiny tuxedoed robot that lives under your sofa, eats dropped crisps, and judges you silently for every biscuit you lose down the cushions.";

// The gate: /output/entry.txt must hold UTF-8 text of 1 to 220 characters,
// not only whitespace, as exactly one sentence. A stray newline or an
// extra sentence-ender anywhere in the text would break that gate, so
// both are rejected here before anything is written.
if (PITCH.length < 1 || PITCH.length > 220) {
  throw new Error(`pitch must be 1-220 characters, got ${PITCH.length}`);
}
if (PITCH.trim().length === 0) {
  throw new Error("pitch must not be only whitespace");
}
if (/[\r\n]/.test(PITCH)) {
  throw new Error("pitch must be a single line with no newline characters");
}
const sentenceEnders = (PITCH.match(/[.!?]/g) ?? []).length;
if (sentenceEnders !== 1 || !PITCH.endsWith(".")) {
  throw new Error("pitch must be exactly one sentence ending with a period");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
// Only create the output directory; never delete it or its contents,
// because the grader mounts it.
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), PITCH, "utf8");
