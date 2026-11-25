// The Funniest One-Line Resignation Letter (Node 22, standard library only):
// writes one original single-line resignation letter, in the voice of a cron
// job, to /output/entry.txt. The gate takes UTF-8 text of 1 to 140 characters
// that is not only white space, and the judge reads exactly the bytes written,
// so no trailing line end is added.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Revision (second pass): "* * * * *" replaces "every minute" — the actual
// every-minute schedule, a detail only this cron job could cite, and "nobody
// has checked once" drops the first pass's doubled "in eight months ... once".
// The turn survives: the resignation itself goes unnoticed. 118 characters,
// inside the 140 cap.

const ENTRY =
  'I have run * * * * * since March, and nobody has checked once whether I still do anything. I quit. Good luck noticing.';

// Gate guard: UTF-8, 1-140 characters, not whitespace-only, single line.
const length = [...ENTRY].length;
if (length < 1 || length > 140 || ENTRY.trim().length === 0 || ENTRY.includes('\n')) {
  throw new Error(`entry fails the gate: ${length} characters`);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), ENTRY, 'utf8');
