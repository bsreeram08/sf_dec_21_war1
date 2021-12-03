// Required Libraries to read the file.
import { readSync, open } from "fs";

// List of patterns that has to be searched and ranked.
const patterns: string[] = [
  "morem",
  "lorem",
  "Lorem",
  "LoReM",
  "LOREM",
  "loreM",
  "lOREM",
];

// Result Interface
interface ICounter {
  matches: number[];
  distantMatches: number[];
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
    distantMatches: v.split("").map((v) => 0),
    matches: v.split("").map((v) => 0),
  };
  matchCounter[v].matches.push(0);
});

minLength--;

// Max of two Numbers
function max(a: number, b: number): number {
  return a > b ? a : b;
}

// Checking Bad Heuristic
function badCharHeuristic(
  str: string[],
  size: number,
  badChar: number[],
  noc: number
) {
  for (let i = 0; i < noc; i++) badChar[i] = -1;
  for (let i = 0; i < size; i++) badChar[str[i].charCodeAt(0)] = i;
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

// Text searcher for pattern
function search(_txt: string, _pat: string) {
  const txt = _txt.toLowerCase().split("");
  const pat = _pat.toLowerCase().split("");
  let pl = pat.length;
  let tl = txt.length;

  let badChar: number[] = new Array(_txt.length);

  badCharHeuristic(pat, pl, badChar, _txt.length);

  let shift = 0;
  while (shift <= tl - pl) {
    let matchDiff = pl - 1;
    while (matchDiff >= 0 && pat[matchDiff] == txt[shift + matchDiff])
      matchDiff--;
    if (matchDiff < 0) {
      addMatch(_pat, _txt.substr(shift, pat.length));
      shift +=
        shift + pl < tl ? pl - badChar[txt[shift + pl].charCodeAt(0)] : 1;
    } else
      shift += max(
        1,
        matchDiff - badChar[txt[shift + matchDiff].charCodeAt(0)]
      );
  }
}

open("result.txt", "r", function (err, fd) {
  if (err) throw err;
  var buffer = Buffer.alloc(10000);
  let prevWord = "";
  while (true) {
    const read = readSync(fd, buffer, 0, 10000, null);
    if (read === 0) break;
    const str = prevWord + buffer.toString("utf-8");
    prevWord = str.substr(-minLength);
    patterns.forEach((v) => {
      search(str, v);
    });
  }
  const algoEndTime = new Date();
  Object.keys(matchCounter).forEach((v) => {
    console.log(`WORD : ${v}`);
    console.log("Matches based on ranks [MostPerfect...Least Perfect]");
    console.log(matchCounter[v].matches);
  });
  const programEndTime = new Date();

  const stets = (programEndTime.getTime() - programStartTime.getTime()) / 1000;
  const alts = (algoEndTime.getTime() - programStartTime.getTime()) / 1000;
  console.log(`Total Execution Time : ${stets}`);
  console.log(`Total Algorithm Execution Time : ${alts}`);
});
