// Required Libraries to read the file.
import { readSync, statSync, open } from "fs";
const noc = 256;
// List of patterns that has to be searched and ranked.
const patterns: string[] = [
  "Morem",
  "morem",
  "lorem",
  "Lorem",
  "LoReM",
  "LOREM",
  "loreM",
  "lOREM",
  "sreeram",
  "amet",
  "dui",
  "dolor",
];

const fileName = "result1.txt";

// Result Interface
interface ICounter {
  matches: number[];
  distantMatches: number;
}

// Min length of the pattern
let minLength: number = 10000000000;

// Result tracker
const matchCounter: { [key: string]: ICounter } = {};

// Start time of the Algorithm
const programStartTime = new Date();

// Framing the Result Pattern structure.
patterns.forEach((v) => {
  if (v.length < minLength) minLength = v.length;
  matchCounter[v] = {
    distantMatches: 0,
    matches: new Array(v.length + 1).fill(0),
  };
});

minLength--;

// Max of two Numbers
function max(a: number, b: number): number {
  return a > b ? a : b;
}

// Checking Bad Heuristicclear
function badCharHeuristic(str: string[], size: number): number[] {
  const badChar = new Array(noc).fill(-1);
  for (let i = 0; i < size; i++) badChar[str[i].charCodeAt(0)] = i;
  return badChar;
}

// Add found match to the result based on Rank
function addMatch(pattern: string, match: string) {
  if (pattern === match) {
    matchCounter[pattern].matches[0]++;
  } else {
    let _rank = pattern.length;
    for (let i = 0; i < pattern.length; i++) {
      if (pattern[i] == match[i]) _rank--;
    }
    matchCounter[pattern].matches[_rank]++;
  }
}

function addDistantMatch(pattern: string): void {
  matchCounter[pattern].distantMatches++;
}

// Text searcher for pattern

function search(_txt: string, _pat: string) {
  const txt = _txt.toLowerCase().split("");
  const pat = _pat.toLowerCase().split("");
  let pl = pat.length;
  let tl = txt.length;

  let badChar: number[] = badCharHeuristic(pat, pl);

  let shift = 0;

  while (shift <= tl - pl) {
    let matchDiff = pl - 1;
    while (matchDiff >= 0 && pat[matchDiff] == txt[shift + matchDiff])
      matchDiff--;
    if (matchDiff < 0) {
      addMatch(_pat, _txt.substr(shift, _pat.length));
      shift +=
        shift + pl < tl ? pl - badChar[txt[shift + pl].charCodeAt(0)] : 1;
    } else {
      if (matchDiff === 0) {
        addDistantMatch(_pat);
      }
      shift += max(
        1,
        matchDiff - badChar[txt[shift + matchDiff].charCodeAt(0)]
      );
    }
  }
}

open(fileName, "r", function (err, fd) {
  if (err) throw err;
  let chunks = statSync(fileName).size;
  console.log(`FileSize : ${(chunks / (1000 * 1024 * 1024)).toFixed(4)} GiB\n`);
  let readBytes = 10000;
  let start = 0;
  let buffer;
  while (chunks > 0) {
    if (chunks - readBytes <= 0) readBytes += 10;
    buffer = Buffer.alloc(readBytes);
    const read = readSync(
      fd,
      buffer,
      0,
      readBytes,
      start === 0 ? start : start - minLength - 1
    );
    if (read === 0) break;
    const str = buffer.toString("utf-8");
    patterns.forEach((v) => {
      search(str, v);
    });
    start += readBytes;
    chunks -= readBytes;
    if (chunks < readBytes) readBytes = chunks;
  }
  const algoEndTime = new Date();
  Object.keys(matchCounter).forEach((v) => {
    console.log(`\nWORD : ${v}`);
    console.log("Matches based on ranks [Most Perfect ... Least Perfect]");
    console.log(matchCounter[v].matches);
    console.log(`Distant Matches : ${matchCounter[v].distantMatches}\n`);
  });
  const programEndTime = new Date();

  const stets = (programEndTime.getTime() - programStartTime.getTime()) / 1000;
  const alts = (algoEndTime.getTime() - programStartTime.getTime()) / 1000;
  console.log(`Total Execution Time : ${stets} seconds`);
  console.log(`Total Algorithm Execution Time : ${alts} seconds\n`);
});
