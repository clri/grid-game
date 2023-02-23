
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


module.exports = { priorityQueueInsert };
