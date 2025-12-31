import fs from "fs";

// Part 1: Calculate total number of splits in the beam grid
const findTotalSplits = (grid) => {
  let totalSplits = 0;
  let timelines = 1; // Start with one timeline

  let row = grid.findIndex((r) => r.includes("S")); // Start from the row with 'S'
  let beams = new Map([[grid[row].indexOf("S"), 1]]); // Map of column index to beam count

  // Function to spread beam counts
  const spreadCount = (cell, col, count, next) => {
    if (cell === ".") {
      next.set(col, (next.get(col) || 0) + count); // Continue downward
    } else {
      next.set(col - 1, (next.get(col - 1) || 0) + count); // Split left
      next.set(col + 1, (next.get(col + 1) || 0) + count); // Split right
      totalSplits++;
      timelines += count; // Each split creates new timelines
    }
  };

  // Process the grid row by row
  while (grid[row]) {
    const next = new Map();

    // Spread each beam in the current row
    for (const [col, count] of beams) {
      spreadCount(grid[row][col], col, count, next);
    }

    beams = next; // Move to the next row
    row++;
  }

  return { totalSplits, timelines };
};

// Read input from file
const input = fs.readFileSync("input.txt", "utf-8");
const lines = input.split("\n");

console.log("Part 1: Total Splits:", findTotalSplits(lines).totalSplits);
console.log("Part 2: Total Timelines:", findTotalSplits(lines).timelines);
