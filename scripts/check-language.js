#!/usr/bin/env node
/**
 * English-only content check.
 * Scans HTML/JS/CSS for non-Latin characters (basic heuristic) and exits with non-zero if found.
 */
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const TARGET_EXT = new Set(['.html', '.css', '.js']);
const IGNORE_DIRS = new Set(['node_modules', '.git', 'assets']);

// Unicode ranges allowed: ASCII + basic Latin punctuation + whitespace.
// We flag Cyrillic, CJK, Hebrew, Arabic, etc.
const nonLatinRegex = /[\u0400-\u04FF\u0590-\u05FF\u0600-\u06FF\u0700-\u074F\u0750-\u077F\u08A0-\u08FF\u0900-\u097F\u0980-\u09FF\u0A00-\u0A7F\u0A80-\u0AFF\u0B00-\u0B7F\u0B80-\u0BFF\u0C00-\u0C7F\u0C80-\u0CFF\u0D00-\u0D7F\u0D80-\u0DFF\u0E00-\u0E7F\u0E80-\u0EFF\u0F00-\u0FFF\u1000-\u109F\u1100-\u11FF\u1200-\u137F\u13A0-\u13FF\u1400-\u167F\u1680-\u169F\u16A0-\u16FF\u1700-\u171F\u1720-\u173F\u1740-\u175F\u1760-\u177F\u1780-\u17FF\u1800-\u18AF\u18B0-\u18FF\u1900-\u194F\u1950-\u197F\u1980-\u19DF\u19E0-\u19FF\u1A00-\u1A1F\u1A20-\u1AAF\u1B00-\u1B7F\u1B80-\u1BBF\u1BC0-\u1BFF\u1C00-\u1C4F\u1C50-\u1C7F\u1C80-\u1C8F\u1C90-\u1CBF\u1CC0-\u1CCF\u1CD0-\u1CFF\u2C00-\u2C5F\u2D00-\u2D2F\u2D30-\u2D7F\u2D80-\u2DDF\u2E80-\u2EFF\u2F00-\u2FDF\u2FF0-\u2FFF\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\u3100-\u312F\u3130-\u318F\u3190-\u319F\u31A0-\u31BF\u31C0-\u31EF\u31F0-\u31FF\u3200-\u32FF\u3300-\u33FF\u3400-\u4DBF\u4DC0-\u4DFF\u4E00-\u9FFF\uA000-\uA48F\uA490-\uA4CF\uA500-\uA63F\uA640-\uA69F\uA6A0-\uA6FF\uA700-\uA71F\uA720-\uA7FF\uA800-\uA82F\uA830-\uA83F\uA840-\uA87F\uA880-\uA8DF\uA8E0-\uA8FF\uA900-\uA92F\uA930-\uA95F\uA960-\uA97F\uA980-\uA9DF\uA9E0-\uA9FF\uAA00-\uAA5F\uAA60-\uAA7F\uAA80-\uAADF\uAAE0-\uAAFF\uAB00-\uAB2F\uAB30-\uAB6F\uAB70-\uABBF\uABC0-\uABFF\uAC00-\uD7AF\uF900-\uFAFF\uFB00-\uFB4F\uFB50-\uFDFF\uFE70-\uFEFF]/;

let violations = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORE_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (TARGET_EXT.has(path.extname(entry.name))) {
      const text = fs.readFileSync(full, 'utf8');
      const lines = text.split(/\r?\n/);
      lines.forEach((line, i) => {
        if (nonLatinRegex.test(line)) {
          violations.push({ file: full, line: i + 1, snippet: line.trim().slice(0, 160) });
        }
      });
    }
  }
}

walk(ROOT);

if (violations.length) {
  console.error('\nNon-English text detected (English-only policy):');
  for (const v of violations) {
    console.error(`- ${path.relative(ROOT, v.file)}:${v.line} -> ${v.snippet}`);
  }
  console.error('\nIf this is intentional test data, add an exception or translate to English.');
  process.exit(1);
}

console.log('Language check passed: all site copy appears to be English.');
