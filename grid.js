
// The effects of landing on each type of square.
// B is treated as blank.
let effects = {
  "Blank": {"Health": 0, "Moves": -1},
  "Speeder": {"Health": -5, "Moves": 0},
  "Lava": {"Health": -50, "Moves": -10},
  "Mud": {"Health": -10, "Moves": -5},
};

let startMoves = 450;
let startHealth = 200;

let gridSize = 10;
