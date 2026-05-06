const { PrismaClient } = require("../src/generated/prisma");

const prisma = new PrismaClient();

const puzzles = [
  // Logic Puzzles (1-20)
  { title: "The 100 Prisoners Problem", category: "Logic", link: "https://www.geeksforgeeks.org/puzzle-the-100-prisoners-problem/" },
  { title: "Bridge and Torch Problem", category: "Logic", link: "https://www.geeksforgeeks.org/puzzle-bridge-and-torch/" },
  { title: "Einstein's Riddle", category: "Logic", link: "https://www.geeksforgeeks.org/puzzle-einsteins-riddle/" },
  { title: "Pirates and Gold Coins", category: "Logic", link: "https://www.geeksforgeeks.org/puzzle-pirates-and-gold-coins/" },
  { title: "Prisoners and Hats", category: "Logic", link: "https://www.geeksforgeeks.org/puzzle-prisoners-and-hats/" },
  { title: "5 Pirates and 100 Gold Coins", category: "Logic", link: "https://www.geeksforgeeks.org/puzzle-5-pirates-and-100-gold-coins/" },
  { title: "King and Wine", category: "Logic", link: "https://www.geeksforgeeks.org/puzzle-king-and-wine/" },
  { title: "Light Switches in a Room", category: "Logic", link: "https://www.geeksforgeeks.org/puzzle-light-switches/" },
  { title: "Three Ants on Triangle", category: "Logic", link: "https://www.geeksforgeeks.org/puzzle-three-ants-on-triangle/" },
  { title: "Blue Eyes Island", category: "Logic", link: "https://www.geeksforgeeks.org/puzzle-blue-eyes-island/" },
  { title: "2 Doors and 2 Guards", category: "Logic", link: "https://www.geeksforgeeks.org/puzzle-2-doors/" },
  { title: "Counterfeit Coin Problem", category: "Logic", link: "https://www.geeksforgeeks.org/puzzle-counterfeit-coin/" },
  { title: "8 Queens Problem", category: "Logic", link: "https://www.geeksforgeeks.org/puzzle-8-queens/" },
  { title: "Horse Puzzle", category: "Logic", link: "https://www.geeksforgeeks.org/puzzle-horse/" },
  { title: "Monty Hall Problem", category: "Logic", link: "https://www.geeksforgeeks.org/puzzle-monty-hall/" },
  { title: "Liars and Truth Tellers", category: "Logic", link: "https://www.geeksforgeeks.org/puzzle-liars-truth-tellers/" },
  { title: "Burning Rope Timer", category: "Logic", link: "https://www.geeksforgeeks.org/puzzle-burning-rope/" },
  { title: "Poison and Rat", category: "Logic", link: "https://www.geeksforgeeks.org/puzzle-poison-and-rat/" },
  { title: "100 Lockers Problem", category: "Logic", link: "https://www.geeksforgeeks.org/puzzle-100-lockers/" },
  { title: "Two Trains Puzzle", category: "Logic", link: "https://www.geeksforgeeks.org/puzzle-two-trains/" },

  // Math Puzzles (21-40)
  { title: "Egg Drop Problem", category: "Math", link: "https://www.geeksforgeeks.org/puzzle-egg-drop/" },
  { title: "Measuring 4 Liters of Water", category: "Math", link: "https://www.geeksforgeeks.org/puzzle-water-jug/" },
  { title: "Handshake Problem", category: "Math", link: "https://www.geeksforgeeks.org/puzzle-handshake/" },
  { title: "Birthday Paradox", category: "Math", link: "https://www.geeksforgeeks.org/birthday-paradox/" },
  { title: "Josephus Problem", category: "Math", link: "https://www.geeksforgeeks.org/josephus-problem/" },
  { title: "Tower of Hanoi", category: "Math", link: "https://www.geeksforgeeks.org/puzzle-tower-of-hanoi/" },
  { title: "Crossing the Bridge in 17 Minutes", category: "Math", link: "https://www.geeksforgeeks.org/puzzle-crossing-bridge/" },
  { title: "Minimum Cuts to Make Equal Pieces", category: "Math", link: "https://www.geeksforgeeks.org/puzzle-minimum-cuts/" },
  { title: "1000 Bottles of Wine", category: "Math", link: "https://www.geeksforgeeks.org/puzzle-1000-bottles-wine/" },
  { title: "Weighing Balance Puzzle", category: "Math", link: "https://www.geeksforgeeks.org/puzzle-weighing-balance/" },
  { title: "Coins on a Round Table", category: "Math", link: "https://www.geeksforgeeks.org/puzzle-coins-round-table/" },
  { title: "Tiling Problem", category: "Math", link: "https://www.geeksforgeeks.org/puzzle-tiling/" },
  { title: "Missing Number in Series", category: "Math", link: "https://www.geeksforgeeks.org/puzzle-missing-number/" },
  { title: "Sum of Consecutive Numbers", category: "Math", link: "https://www.geeksforgeeks.org/puzzle-sum-consecutive/" },
  { title: "Clock Angle Problem", category: "Math", link: "https://www.geeksforgeeks.org/puzzle-clock-angle/" },
  { title: "Trailing Zeros in Factorial", category: "Math", link: "https://www.geeksforgeeks.org/puzzle-trailing-zeros/" },
  { title: "Number of Rectangles on Chessboard", category: "Math", link: "https://www.geeksforgeeks.org/puzzle-rectangles-chessboard/" },
  { title: "Broken Calculator", category: "Math", link: "https://www.geeksforgeeks.org/puzzle-broken-calculator/" },
  { title: "Frog Jump Problem", category: "Math", link: "https://www.geeksforgeeks.org/puzzle-frog-jump/" },
  { title: "Probability of Same Birthday", category: "Math", link: "https://www.geeksforgeeks.org/puzzle-probability-birthday/" },

  // Lateral Thinking (41-60)
  { title: "Man in Elevator", category: "Lateral Thinking", link: "https://www.geeksforgeeks.org/puzzle-man-elevator/" },
  { title: "Dead Man in a Field", category: "Lateral Thinking", link: "https://www.geeksforgeeks.org/puzzle-dead-man-field/" },
  { title: "Cabin in the Woods", category: "Lateral Thinking", link: "https://www.geeksforgeeks.org/puzzle-cabin-woods/" },
  { title: "Surgeon's Dilemma", category: "Lateral Thinking", link: "https://www.geeksforgeeks.org/puzzle-surgeons-dilemma/" },
  { title: "Two Fathers Two Sons", category: "Lateral Thinking", link: "https://www.geeksforgeeks.org/puzzle-two-fathers/" },
  { title: "Apples and Oranges Mislabel", category: "Lateral Thinking", link: "https://www.geeksforgeeks.org/puzzle-apples-oranges/" },
  { title: "River Crossing Problem", category: "Lateral Thinking", link: "https://www.geeksforgeeks.org/puzzle-river-crossing/" },
  { title: "Fox Chicken Grain", category: "Lateral Thinking", link: "https://www.geeksforgeeks.org/puzzle-fox-chicken-grain/" },
  { title: "Candle in a Room", category: "Lateral Thinking", link: "https://www.geeksforgeeks.org/puzzle-candle-room/" },
  { title: "Prisoner's Last Statement", category: "Lateral Thinking", link: "https://www.geeksforgeeks.org/puzzle-prisoner-statement/" },
  { title: "Three Switches One Bulb", category: "Lateral Thinking", link: "https://www.geeksforgeeks.org/puzzle-three-switches/" },
  { title: "Heaven or Hell", category: "Lateral Thinking", link: "https://www.geeksforgeeks.org/puzzle-heaven-or-hell/" },
  { title: "The Missing Dollar", category: "Lateral Thinking", link: "https://www.geeksforgeeks.org/puzzle-missing-dollar/" },
  { title: "Two Ropes to Measure 45 Min", category: "Lateral Thinking", link: "https://www.geeksforgeeks.org/puzzle-two-ropes/" },
  { title: "Camel and Banana Transport", category: "Lateral Thinking", link: "https://www.geeksforgeeks.org/puzzle-camel-banana/" },
  { title: "Tournament Matches Problem", category: "Lateral Thinking", link: "https://www.geeksforgeeks.org/puzzle-tournament-matches/" },
  { title: "Four People on a Bridge", category: "Lateral Thinking", link: "https://www.geeksforgeeks.org/puzzle-four-people-bridge/" },
  { title: "Airplane Seat Problem", category: "Lateral Thinking", link: "https://www.geeksforgeeks.org/puzzle-airplane-seat/" },
  { title: "Infinite Hotel Paradox", category: "Lateral Thinking", link: "https://www.geeksforgeeks.org/puzzle-infinite-hotel/" },
  { title: "Zen Puzzle: Empty Cup", category: "Lateral Thinking", link: "https://www.geeksforgeeks.org/puzzle-zen-empty-cup/" },

  // Algorithm Puzzles (61-80)
  { title: "Detect Loop in Linked List", category: "Algorithm", link: "https://www.geeksforgeeks.org/detect-loop-in-a-linked-list/" },
  { title: "Find Duplicate in Array", category: "Algorithm", link: "https://www.geeksforgeeks.org/find-duplicates-in-on-time/" },
  { title: "Majority Element", category: "Algorithm", link: "https://www.geeksforgeeks.org/majority-element/" },
  { title: "Stock Buy Sell Problem", category: "Algorithm", link: "https://www.geeksforgeeks.org/stock-buy-sell/" },
  { title: "Celebrity Problem", category: "Algorithm", link: "https://www.geeksforgeeks.org/the-celebrity-problem/" },
  { title: "Maze Problem", category: "Algorithm", link: "https://www.geeksforgeeks.org/rat-in-a-maze/" },
  { title: "N-Queens Problem", category: "Algorithm", link: "https://www.geeksforgeeks.org/n-queen-problem-backtracking-3/" },
  { title: "Knight's Tour", category: "Algorithm", link: "https://www.geeksforgeeks.org/the-knights-tour-problem/" },
  { title: "Sudoku Solver", category: "Algorithm", link: "https://www.geeksforgeeks.org/sudoku-backtracking-7/" },
  { title: "Word Search in Grid", category: "Algorithm", link: "https://www.geeksforgeeks.org/search-a-word-in-a-2d-grid-of-characters/" },
  { title: "Coin Change Problem", category: "Algorithm", link: "https://www.geeksforgeeks.org/coin-change-dp-7/" },
  { title: "Longest Common Subsequence", category: "Algorithm", link: "https://www.geeksforgeeks.org/longest-common-subsequence-dp-4/" },
  { title: "Matrix Chain Multiplication", category: "Algorithm", link: "https://www.geeksforgeeks.org/matrix-chain-multiplication-dp-8/" },
  { title: "0/1 Knapsack Problem", category: "Algorithm", link: "https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/" },
  { title: "Edit Distance", category: "Algorithm", link: "https://www.geeksforgeeks.org/edit-distance-dp-5/" },
  { title: "Subset Sum Problem", category: "Algorithm", link: "https://www.geeksforgeeks.org/subset-sum-problem-dp-25/" },
  { title: "Egg Dropping with 2 Eggs", category: "Algorithm", link: "https://www.geeksforgeeks.org/egg-dropping-puzzle-dp-11/" },
  { title: "Water Trapping Problem", category: "Algorithm", link: "https://www.geeksforgeeks.org/trapping-rain-water/" },
  { title: "Max Subarray Sum (Kadane)", category: "Algorithm", link: "https://www.geeksforgeeks.org/largest-sum-contiguous-subarray/" },
  { title: "Merge Intervals", category: "Algorithm", link: "https://www.geeksforgeeks.org/merging-intervals/" },

  // Pattern & Observation (81-100)
  { title: "Rotate Matrix 90 Degrees", category: "Pattern", link: "https://www.geeksforgeeks.org/inplace-rotate-square-matrix-by-90-degrees/" },
  { title: "Spiral Matrix Print", category: "Pattern", link: "https://www.geeksforgeeks.org/print-a-given-matrix-in-spiral-form/" },
  { title: "Zig-Zag Traversal", category: "Pattern", link: "https://www.geeksforgeeks.org/zigzag-tree-traversal/" },
  { title: "Pascal's Triangle", category: "Pattern", link: "https://www.geeksforgeeks.org/pascal-triangle/" },
  { title: "Magic Square", category: "Pattern", link: "https://www.geeksforgeeks.org/magic-square/" },
  { title: "Next Greater Element", category: "Pattern", link: "https://www.geeksforgeeks.org/next-greater-element/" },
  { title: "Sliding Window Maximum", category: "Pattern", link: "https://www.geeksforgeeks.org/sliding-window-maximum-maximum-of-all-subarrays-of-size-k/" },
  { title: "Two Sum Problem", category: "Pattern", link: "https://www.geeksforgeeks.org/given-an-array-a-and-a-number-x-check-for-pair-in-a-with-sum-as-x/" },
  { title: "Three Sum Problem", category: "Pattern", link: "https://www.geeksforgeeks.org/find-a-triplet-that-sum-to-a-given-value/" },
  { title: "Find Median in Stream", category: "Pattern", link: "https://www.geeksforgeeks.org/median-of-stream-of-integers-running-integers/" },
  { title: "Longest Palindrome Substring", category: "Pattern", link: "https://www.geeksforgeeks.org/longest-palindrome-substring-set-1/" },
  { title: "Count Inversions in Array", category: "Pattern", link: "https://www.geeksforgeeks.org/counting-inversions/" },
  { title: "Find Peak Element", category: "Pattern", link: "https://www.geeksforgeeks.org/find-a-peak-in-a-given-array/" },
  { title: "Search in Rotated Array", category: "Pattern", link: "https://www.geeksforgeeks.org/search-an-element-in-a-sorted-and-pivoted-array/" },
  { title: "Minimum Platforms Problem", category: "Pattern", link: "https://www.geeksforgeeks.org/minimum-number-platforms-required-railwaybus-station/" },
  { title: "Activity Selection Problem", category: "Pattern", link: "https://www.geeksforgeeks.org/activity-selection-problem-greedy-algo-1/" },
  { title: "Huffman Coding Problem", category: "Pattern", link: "https://www.geeksforgeeks.org/huffman-coding-greedy-algo-3/" },
  { title: "Job Sequencing Problem", category: "Pattern", link: "https://www.geeksforgeeks.org/job-sequencing-problem/" },
  { title: "Fractional Knapsack", category: "Pattern", link: "https://www.geeksforgeeks.org/fractional-knapsack-problem/" },
  { title: "Detect Cycle in Graph", category: "Pattern", link: "https://www.geeksforgeeks.org/detect-cycle-in-a-graph/" },
];

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing puzzles
  await prisma.puzzleProgress.deleteMany();
  await prisma.puzzle.deleteMany();

  // Seed puzzles
  for (let i = 0; i < puzzles.length; i++) {
    await prisma.puzzle.create({
      data: {
        id: i + 1,
        title: puzzles[i].title,
        category: puzzles[i].category,
        link: puzzles[i].link,
      },
    });
  }

  console.log(`✅ Seeded ${puzzles.length} puzzles`);
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
