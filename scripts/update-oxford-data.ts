import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { PDFParse } from "pdf-parse";

type Level = "A1" | "A2" | "B1" | "B2" | "C1";

type Entry = {
  word: string;
  pos: string | null;
  raw: string;
  warning?: string;
};

const inputDir = "oxford-files";
const outputDir = "src/features/vocabularies";

const levels: Level[] = ["A1", "A2", "B1", "B2", "C1"];
const levelRe = /^(A1|A2|B1|B2|C1)$/;

const posMarkers = [
  "indefinite article",
  "definite article",
  "modal v.",
  "auxiliary v.",
  "phrasal v.",
  "prep.",
  "adv.",
  "adj.",
  "conj.",
  "det.",
  "pron.",
  "exclam.",
  "number",
  "infinitive marker",
  "n.",
  "v.",
];

const posRe = new RegExp(
  `\\b(${posMarkers
    .sort((a, b) => b.length - a.length)
    .map(escapeRegExp)
    .join("|")})`,
);

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function cleanLine(line: string) {
  return line
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isLevel(value: string): value is Level {
  return levelRe.test(value);
}

export function removeHeaders(lines: string[]) {
  return lines.filter((line) => {
    if (!line) return false;
    if (line.startsWith("© Oxford University Press")) return false;
    if (line.includes("The Oxford 3000")) return false;
    if (line.includes("The Oxford 5000")) return false;
    if (/^\d+ \/ \d+$/.test(line)) return false;
    return true;
  });
}

function looksLikeEntry(line: string) {
  return posRe.test(line);
}

function parseEntry(raw: string): Entry {
  const match = raw.match(posRe);

  if (!match || match.index === undefined) {
    return {
      word: raw,
      pos: null,
      raw,
      warning: "No part-of-speech marker found",
    };
  }

  return {
    word: raw.slice(0, match.index).trim(),
    pos: raw.slice(match.index).trim(),
    raw,
  };
}

function createEmptyLevels(): Record<Level, Entry[]> {
  return {
    A1: [],
    A2: [],
    B1: [],
    B2: [],
    C1: [],
  };
}

export function splitEntries(lines: string[]) {
  const result = createEmptyLevels();

  let currentLevel: Level | null = null;
  let buffer = "";

  function flush() {
    const raw = cleanLine(buffer);
    buffer = "";

    if (!raw || !currentLevel) return;

    result[currentLevel].push(parseEntry(raw));
  }

  for (const line of lines) {
    if (isLevel(line)) {
      flush();
      currentLevel = line;
      continue;
    }

    if (!currentLevel) continue;

    if (buffer && looksLikeEntry(line)) {
      flush();
    }

    buffer = buffer ? `${buffer} ${line}` : line;
  }

  flush();

  return result;
}

function dedupe(entries: Entry[]) {
  const seen = new Set<string>();
  const result: Entry[] = [];

  for (const entry of entries) {
    const key = `${entry.word}|${entry.pos}`;

    if (!seen.has(key)) {
      seen.add(key);
      result.push(entry);
    }
  }

  return result;
}

async function getPdfFiles() {
  const fileNames = await fs.readdir(inputDir);

  return fileNames
    .filter((fileName) => fileName.toLowerCase().endsWith(".pdf"))
    .map((fileName) => path.join(inputDir, fileName));
}

async function extractPdf(filePath: string) {
  const buffer = await fs.readFile(filePath);

  const parser = new PDFParse({ data: buffer });
  const data = await parser.getText();

  return data.text;
}

async function main() {
  await fs.mkdir(outputDir, { recursive: true });

  const allLevels = createEmptyLevels();
  const pdfFiles = await getPdfFiles();

  if (pdfFiles.length === 0) {
    throw new Error(`No PDF files found in: ${inputDir}`);
  }

  for (const filePath of pdfFiles) {
    console.log(`Reading: ${filePath}`);

    const text = await extractPdf(filePath);
    const lines = removeHeaders(text.split("\n").map(cleanLine));
    const extracted = splitEntries(lines);

    for (const level of levels) {
      allLevels[level].push(...extracted[level]);
    }
  }

  for (const level of levels) {
    const entries = dedupe(allLevels[level]);
    const outPath = path.join(outputDir, `${level}.json`);

    await fs.writeFile(outPath, JSON.stringify(entries, null, 2), "utf-8");

    const warnings = entries.filter((entry) => entry.warning);

    console.log(`${level}: ${entries.length} entries -> ${outPath}`);

    if (warnings.length > 0) {
      console.log(`  warnings: ${warnings.length}`);

      for (const warning of warnings.slice(0, 10)) {
        console.log(`   - ${warning.raw}`);
      }
    }
  }
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  main().catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  });
}
