import fs from "fs";

// Part 1: Calculate total rolls of paper that can be accessed by a forklift
const findTotalRollsOfPaper = (grid) => {
  let total = 0;

  const rows = grid.length; // Number of rows
  const cols = grid[0].length; // Number of columns

  // Check 8 adjacent cells
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  // Traverse the grid to count '@' symbols
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] !== "@") continue; // Skip non-'@' cells

      let neighbor = 0;

      // Count adjacent '@' symbols
      for (const [dr, dc] of directions) {
        const nr = r + dr; // new row
        const nc = c + dc; // new column

        // Check bounds
        if (nr >= 0 && nc >= 0 && nr < rows && nc < cols) {
          if (grid[nr][nc] == "@") {
            neighbor++;
          }
        }
      }

      // If less than 4 adjacent '@', increment total
      if (neighbor < 4) {
        total++;
      }
    }
  }

  return total;
};

// Part 2: Calculate total rolls of paper that can be removed
const findTotalRollsOfPaperRemoved = (grid) => {
  const rows = grid.length; // Number of rows
  const cols = grid[0].length; // Number of columns

  // Convert each row to an array of characters
  const newGrid = grid.map((row) => row.split(""));

  // Check 8 adjacent cells
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  let total = 0;
  let removedThisRound;

  do {
    removedThisRound = 0; // Reset for this round
    const toRemove = []; // Positions to remove

    // Traverse the grid to count '@' symbols
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (newGrid[r][c] !== "@") continue; // Skip non-'@' cells

        let neighbor = 0;

        // Count adjacent '@' symbols
        for (const [dr, dc] of directions) {
          const nr = r + dr; // new row
          const nc = c + dc; // new column

          // Check bounds
          if (nr >= 0 && nc >= 0 && nr < rows && nc < cols) {
            if (newGrid[nr][nc] == "@") {
              neighbor++;
            }
          }
        }

        // If less than 4 adjacent '@', increment total
        if (neighbor < 4) {
          toRemove.push([r, c]);
        }
      }
    }

    // Remove marked positions
    for (const [r, c] of toRemove) {
      newGrid[r][c] = ".";
      removedThisRound++;
    }

    total += removedThisRound; // Update total removed
  } while (removedThisRound > 0);

  return total;
};

// Read input from file
const data = fs.readFileSync("input.txt", "utf-8");
const grid = data.split("\n");

console.log("Part 1: Total rolls of paper:", findTotalRollsOfPaper(grid));
console.log(
  "Part 2: Total rolls of paper that can be removed:",
  findTotalRollsOfPaperRemoved(grid)
);
