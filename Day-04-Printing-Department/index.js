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

// Read input from file
const data = fs.readFileSync("input.txt", "utf-8");
const grid = data.split("\n");
console.log("Part 1: Total rolls of paper:", findTotalRollsOfPaper(grid));
