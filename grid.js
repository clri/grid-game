
// The effects of landing on each type of square.
// B is treated as blank.
let effects = {
  "Blank": {"Health": 0, "Moves": -1},
  "B": {"Health": 0, "Moves": -1},
  "Speeder": {"Health": -5, "Moves": 0},
  "Lava": {"Health": -50, "Moves": -10},
  "Mud": {"Health": -10, "Moves": -5},
};

let startMoves = 450;
let startHealth = 200;

global.gridSize = 10;


/*
 * priorityQueueInsert: JS has no native PriorityQueue. Let's build one from an
 * array. The only thing we need here is an insert. We can pull with pop()
 * Highest score (moves + health) goes to the end.
 * @param pq: The priority queue
 * @param val: The value to be inserted. An object with Health and Moves values.
 */
function priorityQueueInsert(pq, val) {
  let score = val.Moves + val.Health;
  if (pq.length === 0
    || pq[pq.length - 1].Moves + pq[pq.length - 1].Health <= score) {
    pq.push(val);
  }
  else if (pq[0].Moves + pq[0].Health >= score) {
    pq.unshift(val);
  }
  else {
    for (let i = 1; i < pq.length; ++i) {
      if (pq[i].Moves + pq[i].Health >= score) {
        pq.splice(i, 0, val);
        break;
      }
    }
  }
}

/*
 * moveOnGrid: move to unvisited squares and place the results in the priority
 * queue. Returns the winner (null if none has been found)
 * @param pq: The priority queue of moves.
 */
function moveOnGrid(pq) {
  // Get whatever currently has the best value.
  let val = pq.pop();
  let x = val.XCoord; let y = val.YCoord;

  // And enumerate possible moves. We'll validate those a bit later.
  let possibleMoves = [[x, y+1], [x, y-1], [x-1, y], [x+1, y]];

  // We're going to update the grid. Let's use JSON to make a deep copy.
  let grid = JSON.parse(JSON.stringify(val.Grid));
  let numMoves = val.NumMoves;

  // Mark squares as visited. It will never be the most efficient to go back to
  // a square you've visited, as you will lose either moves or health or both.
  // Because we'll be alphabetizing these at the end, we'll add a leading zero
  // to single digit numbers.
  grid[x][y] = "Visited" + (numMoves < 10 ? "0" + numMoves : numMoves);
  ++numMoves;

  for (let [newX, newY] of possibleMoves) {
    // If we're off the grid, that's invalid. And we don't want to revisit any
    // squares. Just move on to the next on the list.
    if (newX < 0 || newY < 0 || newX > gridSize - 1 || newY > gridSize - 1
      || grid[newX][newY].match(/Visited.*/)) {
        continue;
    }

    let square = grid[newX][newY];

    newHealth = val.Health + effects[square]["Health"];
    newMoves = val.Moves + effects[square]["Moves"];

    // If our score is not valid, skip.
    if (newHealth <= 0 || newMoves < 0) {
      continue;
    }

    if (square === "B") {
      winner = {
        Health: newHealth,
        Moves:  newMoves,
        Grid:   grid,
      };
      return winner;
    }
    else {
      newVal = {
        Health:   newHealth,
        Moves:    newMoves,
        NumMoves: numMoves,
        Grid:     grid,
        XCoord:   newX,
        YCoord:   newY,
      };
      priorityQueueInsert(pq, newVal);
    }

  }
  return undefined;
}


module.exports = { priorityQueueInsert, moveOnGrid };
