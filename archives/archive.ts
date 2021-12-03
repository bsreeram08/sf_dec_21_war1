/*

 const inStream = createReadStream("result.txt");
 const rl = createInterface(inStream, outStream);

let stream = fs.createReadStream(_path, options);
stream.on("data", (data) => {
  console.log({ data });
});
stream.resume();
*/
/*

const matchCase: {
  matchRank: number[];
  distantMatches: number[];
  pattern: string;
}[] = patterns.map((v: string) => {
  return {
    matchRank: v.split("").map((v) => 0),
    distantMatches: v.split("").map((v) => 0),
    pattern: v,
  };
});

function addValueToCounter(word: string): void {
  if (!!wordCounter[word]) {
    wordCounter[word] = wordCounter[word] + 1;
  } else wordCounter[word] = 1;
}

let lineCount = 0;
const ts1 = new Date();
// rl.on("line", (line: string) => {
//   lineCount++;
//   addValueToCounter(line);
// });

rl.on("line", (v) => {
  console.log(v);
});

rl.on("close", () => {
  const ts2 = new Date();
  const diff = ts2.getTime() - ts1.getTime();
  console.log(matchCase);
  const ts = (diff / 1000).toFixed(0);
  console.log(ts1);
  console.log(ts2);
  console.log(ts);
  Object.keys(wordCounter).forEach((word) => {
    // search(
    //   word,
    //   patterns.map((v) => v)
    // );
    // console.log(lineCount);
    console.log(word, wordCounter[word]);
  });
});

function search(text: string, patterns: string[]) {
  const words = text.split(" ");

  words.forEach((word, wordLocation) => {
    patterns.forEach((pattern, location) => {
      if (pattern.length === word.length) {
        if (word === pattern) {
          matchCase[location].matchRank[0]++;
        } else if (word.toLowerCase() === pattern.toLowerCase()) {
          const rank = findRank(word, pattern);
          if (rank === word.length) {
            if (matchCase[location].matchRank.length !== word.length + 1)
              matchCase[location].matchRank.push(0);
            matchCase[location].matchRank[rank]++;
          }
          matchCase[location].matchRank[rank]++;
        }
      }
    });
  });
}

function findRank(word: string, pattern: string) {
  const _word = word.split("");
  const _pattern = pattern.split("");
  let rank = _word.length;
  _word.forEach((v, index) => {
    if (v === _pattern[index]) rank--;
  });
  return rank;
}
*/
// const inStream = createReadStream("result.txt");
// const rl = createInterface(inStream, outStream);

// let stream = fs.createReadStream(_path, options);
// stream.on("data", (data) => {
//   console.log({ data });
// });
// stream.resume();

// const matchCase: {
//   matchRank: number[];
//   distantMatches: number[];
//   pattern: string;
// }[] = patterns.map((v: string) => {
//   return {
//     matchRank: v.split("").map((v) => 0),
//     distantMatches: v.split("").map((v) => 0),
//     pattern: v,
//   };
// });

// function addValueToCounter(word: string): void {
//   if (!!wordCounter[word]) {
//     wordCounter[word] = wordCounter[word] + 1;
//   } else wordCounter[word] = 1;
// }

// let lineCount = 0;
// const ts1 = new Date();
// // rl.on("line", (line: string) => {
// //   lineCount++;
// //   addValueToCounter(line);
// // });

// rl.on("line", (v) => {
//   console.log(v);
// });

// rl.on("close", () => {
//   const ts2 = new Date();
//   const diff = ts2.getTime() - ts1.getTime();
//   console.log(matchCase);
//   const ts = (diff / 1000).toFixed(0);
//   console.log(ts1);
//   console.log(ts2);
//   console.log(ts);
//   Object.keys(wordCounter).forEach((word) => {
//     // search(
//     //   word,
//     //   patterns.map((v) => v)
//     // );
//     // console.log(lineCount);
//     console.log(word, wordCounter[word]);
//   });
// });

// function search(text: string, patterns: string[]) {
//   const words = text.split(" ");

//   words.forEach((word, wordLocation) => {
//     patterns.forEach((pattern, location) => {
//       if (pattern.length === word.length) {
//         if (word === pattern) {
//           matchCase[location].matchRank[0]++;
//         } else if (word.toLowerCase() === pattern.toLowerCase()) {
//           const rank = findRank(word, pattern);
//           if (rank === word.length) {
//             if (matchCase[location].matchRank.length !== word.length + 1)
//               matchCase[location].matchRank.push(0);
//             matchCase[location].matchRank[rank]++;
//           }
//           matchCase[location].matchRank[rank]++;
//         }
//       }
//     });
//   });
// }

// function findRank(word: string, pattern: string) {
//   const _word = word.split("");
//   const _pattern = pattern.split("");
//   let rank = _word.length;
//   _word.forEach((v, index) => {
//     if (v === _pattern[index]) rank--;
//   });
//   return rank;
// }
