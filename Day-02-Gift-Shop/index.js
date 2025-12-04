import fs from "fs";

// Part 1: Find the total of all invalid gift IDs in the given ranges
const findTotalOfInvalidIds = (range) => {
  let total = 0;

  // go through each range
  for (let i of range) {
    // Split the range into two parts
    const firstId = Number(i.split("-")[0]);
    const secondId = Number(i.split("-")[1]);

    // go through each ID in the range
    for (let id = firstId; id <= secondId; id++) {
      // check even length
      if (id.length % 2 == 0) {
        continue;
      }

      const strId = id.toString();

      // split the ID into 2 equal parts
      const half = strId.length / 2;
      const firstHalf = strId.slice(0, half);
      const secondHalf = strId.slice(half);

      // check if both halves are equal = invalid ID
      if (firstHalf == secondHalf) {
        total += id;
      }
    }
  }
  return total;
};

// Part 2: Find the total of all invalid gift IDs in the given ranges with new rules
const findTotalNewRules = (range) => {
  let total = 0;

  // go through each range
  for (let i of range) {
    // Split the range into two parts
    const firstId = Number(i.split("-")[0]);
    const secondId = Number(i.split("-")[1]);

    // go through each ID in the range
    for (let id = firstId; id <= secondId; id++) {
      const strId = id.toString();

      // check minimum length
      if (strId.length < 2) {
        continue;
      }

      // check for repeating parts
      for (let p = 1; p <= strId.length / 2; p++) {
        // check if length is divisible by part length
        if (strId.length % p !== 0) {
          continue;
        }

        // build the repeated pattern
        const pattern = strId.slice(0, p);
        const repeats = strId.length / p;
        let repeatedStr = "";

        // repeat the pattern
        for (let r = 0; r < repeats; r++) {
          repeatedStr += pattern;
        }

        // check if the repeated pattern matches the original ID
        if (repeatedStr == strId) {
          total += id;
          break;
        }
      }
    }
  }
  return total;
};

// Read input from file
const data = fs.readFileSync("input.txt", "utf-8");
const range = data.split(",");
console.log("Part 1: Total of invalid IDs:", findTotalOfInvalidIds(range));
console.log(
  "Part 2: Total of invalid IDs with new rules:",
  findTotalNewRules(range)
);
