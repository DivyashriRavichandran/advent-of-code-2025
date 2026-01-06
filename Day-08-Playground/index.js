import fs from "fs";

const calculateDistance = (pointA, pointB) => {
  if (pointA.x == 0 && pointA.y == 0 && pointA.z == 0) {
    return 0;
  }
  if (pointB.x == 0 && pointB.y == 0 && pointB.z == 0) {
    return 0;
  }

  return Math.sqrt(
    (pointA.x - pointB.x) ** 2 +
      (pointA.y - pointB.y) ** 2 +
      (pointA.z - pointB.z) ** 2
  );
};
// Part 1:
const findJunction = (lines) => {
  let coordinates = [];
  for (let i = 0; i < lines.length; i++) {
    const row = lines[i].split(",");
    console.log(row);
    const [x, y, z] = row;
    console.log(x, y, z);
  }
  const distances = new Set();

  for (let i = 0; i < coordinates.length; i++) {
    for (let j = i + 1; j < coordinates.length; j++) {
      const dist =
        Math.abs(coordinates[i][0] - coordinates[j][0]) +
        Math.abs(coordinates[i][1] - coordinates[j][1]) +
        Math.abs(coordinates[i][2] - coordinates[j][2]);
      distances.add(dist);
    }
  }

  return distances.size;
};

// Read input from file
const input = fs.readFileSync("test.txt", "utf-8");
const lines = input.split("\n");

console.log("Part 1:", findJunction(lines));
