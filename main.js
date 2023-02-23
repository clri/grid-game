const gridUtils = require("./grid");
const fs = require('fs');

if (process.argv.length < 3) {
  throw new Error("Please input a filename");
}

let filename = process.argv[2];
let gridString = fs.readFileSync(filename, 'utf8');

let gridArray = JSON.parse(gridString);
let gridObj = {
  Grid: gridArray,
  BestRoute: undefined
};

if (gridUtils.isSolvable(gridObj)) {
  console.log("This grid is solvable. Most efficient route:");
  gridUtils.printRoute(gridObj.BestRoute.Grid);
}
else {
  console.log("This grid is note solvable");
}
