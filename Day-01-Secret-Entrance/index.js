import fs from "fs";

export function countZeroes(rotations) {
  let dialPosition = 50;
  let zeroCount = 0;

  // rotations is an array of strings like ["L10", "R20", ...]
  for (let rotation of rotations) {
    const direction = rotation[0]; // 'L' or 'R' the first character
    const amount = parseInt(rotation.slice(1), 10); // the rest is the number

    if (direction === "L") {
      dialPosition = (dialPosition + amount) % 100;
    } else if (direction === "R") {
      dialPosition = (dialPosition - amount + 100) % 100;
    }

    if (dialPosition === 0) {
      zeroCount++;
    }
  }

  return zeroCount;
}

// Read input from file and execute the function
const data = fs.readFileSync("input.txt", "utf-8");
const inputRotations = data.trim().split("\n"); // Split by new lines

console.log("Password:", countZeroes(inputRotations));
