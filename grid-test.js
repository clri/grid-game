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
