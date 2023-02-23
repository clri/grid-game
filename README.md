# grid-game

To play: Have a valid 10x10 grid in a JSON file. Make sure to have node installed. Then, run `node main.js <filename>.json` inside this directory.

This will check whether the grid in your JSON file is solvable. If it is, it will output the (zero-indexed) coordinates of each step on the best route from A to B. If not, it will tell you the grid is not solvable.

# Files:
- grid.js: This contains the main algorithm and some helper functions
- grid-tests.js: Unit tests. Run them with `node grid-tests.js`.
- main.js: Calls functionality in the grid.
- README.md: This file
- sample.json: A sample you can try out or use as a model for your own grid.

# The algorithm:
I chose a greedy algorithm using a priority queue. At each step, I take the node with the highest score (health + remaining moves). This is guaranteed to get us the best route. Let me illustrate with an example:
You have a priority queue, and you pick the highest score from it. You move from that square into B, thus winning the game with score X. Since B is a blank space, your prior score would have been X+1. Therefore, all other routes in the queue will have score at most X+1. For any of these other routes to win, they must move into B, which will decrement 1 from their score. So any potential other winning route has score at most X, and therefore there is no route with a better score than X--i.e. no route more efficient than the one we just picked.
(This would not be true if there were values for squares that could increase one's score.)

# Unit testing:
I don't know any real testing frameworks for Node, and this was on such a small scale that installing and learning one felt like overkill. 
