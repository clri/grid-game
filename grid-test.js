const gridUtils = require("./grid");

let testCounter = 0;
let passes = 0, fails = 0;

function checkTest(assertion, testName) {
  if (assertion) {
    console.log("PASS " + testCounter + ": " + testName);
    ++passes;
  }
  else {
    console.log("FAIL " + testCounter + ": " + testName);
    ++fails;
  }
  ++testCounter;
}

/* Priority Queue tests:
 * Insert several elements and make sure they follow the correct order.
 */
let pq = [];

gridUtils.priorityQueueInsert(pq, { Moves: 1, Health: 1});
let expected = [ { Moves: 1, Health: 1} ];
checkTest(JSON.stringify(pq) === JSON.stringify(expected),
  "Insert into empty queue");

gridUtils.priorityQueueInsert(pq, { Moves: 0, Health: 0});
expected = [ { Moves: 0, Health: 0}, { Moves: 1, Health: 1} ];
checkTest(JSON.stringify(pq) === JSON.stringify(expected),
  "Insert at start");

gridUtils.priorityQueueInsert(pq, { Moves: 4, Health: 5});
expected = [ { Moves: 0, Health: 0}, { Moves: 1, Health: 1}, { Moves: 4, Health: 5} ];
checkTest(JSON.stringify(pq) === JSON.stringify(expected),
  "Insert at end");

gridUtils.priorityQueueInsert(pq, { Moves: 4, Health: 4});
expected = [ { Moves: 0, Health: 0}, { Moves: 1, Health: 1}, { Moves: 4, Health: 4}, { Moves: 4, Health: 5} ];
checkTest(JSON.stringify(pq) === JSON.stringify(expected),
  "Insert in middle");

gridUtils.priorityQueueInsert(pq, { Moves: 5, Health: 3});
expected = [ { Moves: 0, Health: 0}, { Moves: 1, Health: 1}, { Moves: 5, Health: 3}, { Moves: 4, Health: 4}, { Moves: 4, Health: 5} ];
checkTest(JSON.stringify(pq) === JSON.stringify(expected),
  "Insert with equal value in middle");

/* moveOnGrid tests:
 * Make sure moveOnGrid is choosing the best move. We'll use a small grid for
 * ease of use.
 */
gridSize = 3;
let sampleGrid3 = [
  ["A","Lava","Lava"],
  ["Blank","Speeder","Mud"],
  ["Speeder","Blank","B"]
];
sampleGrid3[0][0] = "Visited00";

let grid1 = JSON.parse(JSON.stringify(sampleGrid3));
grid1[0][1] = "Visited01";

let grid2 = JSON.parse(JSON.stringify(sampleGrid3));
grid2[1][0] = "Visited01";

// These dummy values here are obviously wrong. That's okay, this isn't an
// end-to-end test.
pq = [
  { Moves: 10, Health: 10, Grid: grid1, XCoord: 0, YCoord: 2, NumMoves: 2 },
  { Moves: 100, Health: 100, Grid: grid2, XCoord: 1, YCoord: 1, NumMoves: 2 },
];

let winner = gridUtils.moveOnGrid(pq);
checkTest(!winner, "No winner found");
// First one off the queue had valid moves in 3 directions. 2 - 1 (popped) + 3
// = 4.
checkTest(pq.length === 4);
grid2[1][1] = "Visited02"; // We'll use this to check values
expected = [
  // First is unchanged
  { Moves: 10, Health: 10, Grid: grid1, XCoord: 0, YCoord: 2, NumMoves: 2 },
  // Moving to the lava square at (0, 1)
  { Health: 50, Moves: 90, NumMoves: 3, Grid: grid2, XCoord: 0, YCoord: 1 },
  // Moving to the mud square at (1, 2)
  { Health: 90, Moves: 95, NumMoves: 3, Grid: grid2, XCoord: 1, YCoord: 2 },
  // Moving to the blank square at (2, 1)
  { Health: 100, Moves: 99, NumMoves: 3, Grid: grid2, XCoord: 2, YCoord: 1 },
]

checkTest(JSON.stringify(pq) === JSON.stringify(expected),
  "Health, moves, grids, etc. are as expected in the priority queue");

//In one more move we'll reach the winner.
winner = gridUtils.moveOnGrid(pq);
checkTest(winner, "Winner found");

/* mostEfficientRoute tests:
 * Check the validity of mER on a small grid
 */
winner = gridUtils.mostEfficientRoute(sampleGrid3);
checkTest(winner, "Winner found");
let winningGrid3 = [
  ["Visited00","Lava","Lava"],
  ["Visited01","Visited02","Mud"],
  ["Speeder","Visited03","B"]
];
expected = { Health: 195, Moves: 447, Grid: winningGrid3 };
checkTest(JSON.stringify(winner) === JSON.stringify(expected),
  "Got correct winner");


/* isSolvable tests:
 * Work on the larger grid, to make sure it completes with a decent runtime
 */
gridSize = 10;

let sampleGrid10 = [
  ["A","Lava","Lava","Speeder","Speeder","Mud","Lava","Blank","Lava","Blank"],
  ["Blank","Speeder","Mud","Lava","Speeder","Speeder","Mud","Blank","Lava","Mud"],
  ["Blank","Mud","Mud","Blank","Speeder","Blank","Mud","Blank","Lava","Mud"],
  ["Lava","Speeder","Mud","Blank","Speeder","Blank","Mud","Lava","Lava","Mud"],
  ["Mud","Lava","Lava","Lava","Mud","Blank","Mud","Speeder","Speeder","Lava"],
  ["Mud","Lava","Lava","Lava","Lava","Mud","Mud","Blank","Lava","Speeder"],
  ["Blank","Blank","Mud","Speeder","Mud","Blank","Lava","Lava","Mud","Blank"],
  ["Blank","Blank","Blank","Blank","Blank","Blank","Blank","Blank","Blank","Blank"],
  ["Lava","Speeder","Mud","Lava","Mud","Lava","Speeder","Lava","Lava","Lava"],
  ["Speeder","B","Blank", "Lava","Speeder","Mud","Lava","Mud","Lava","Speeder"]
];
let gridObj = {
 Grid: sampleGrid10,
 BestRoute: undefined,
};

let sampleIsSolvable = gridUtils.isSolvable(gridObj);
checkTest(sampleIsSolvable, "Grid is solvable");
checkTest(gridObj.BestRoute.length === 10, "Grid cached");

let sampleGridLava = [
  ["A","Lava","Lava","Lava","Lava","Lava","Lava","Lava","Lava","Blank"],
  ["Lava","Lava","Lava","Lava","Lava","Lava","Lava","Lava","Blank","Lava"],
  ["Lava","Lava","Lava","Lava","Lava","Lava","Lava","Lava","Lava","Lava"],
  ["Lava","Lava","Lava","Lava","Lava","Lava","Lava","Lava","Lava","Lava"],
  ["Lava","Lava","Lava","Lava","Lava","Lava","Lava","Lava","Lava","Lava"],
  ["Lava","Lava","Lava","Lava","Lava","Lava","Lava","Lava","Lava","Lava"],
  ["Lava","Lava","Lava","Lava","Lava","Lava","Lava","Lava","Lava","Lava"],
  ["Lava","Lava","Lava","Lava","Lava","Lava","Lava","Lava","Lava","Lava"],
  ["Lava","Lava","Lava","Lava","Lava","Lava","Lava","Lava","Lava","Lava"],
  ["Lava","Lava","Lava","Lava","Lava","Lava","Lava","Lava","Lava","Lava"],
  ["Speeder","B","Blank", "Lava","Speeder","Mud","Lava","Mud","Lava","Speeder"]
];
gridObj = {
 Grid: sampleGridLava,
 BestRoute: undefined,
};

sampleIsSolvable = gridUtils.isSolvable(gridObj);
checkTest(!sampleIsSolvable, "Grid is not solvable");
checkTest(gridObj.BestRoute === null, "Grid cached");
