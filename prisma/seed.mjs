import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
require('dotenv').config();

const { PrismaPg } = require('@prisma/adapter-pg');
const DATABASE_URL = process.env.DATABASE_URL;
console.log("DB URL found:", !!DATABASE_URL);

const adapter = new PrismaPg({ connectionString: DATABASE_URL });
const { PrismaClient } = await import("../src/generated/prisma/client.ts");
const prisma = new PrismaClient({ adapter });

const puzzles = [
  // 🔹 Logical Puzzles (1–37)
  { title: "Pay employee using gold rod", category: "Logical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-4-pay-an-employee-using-a-gold-rod-of-7-units/" },
  { title: "Fastest 3 horses", category: "Logical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-9-find-the-fastest-3-horses/" },
  { title: "Injection for anesthesia", category: "Logical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-5-finding-the-injection-for-anesthesia/" },
  { title: "3 bulbs 3 switches", category: "Logical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-7-3-bulbs-and-3-switches/" },
  { title: "Camel and banana", category: "Logical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-15-camel-and-banana-puzzle/" },
  { title: "Contaminated pills", category: "Logical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-7-find-the-jar-with-contaminated-pills/" },
  { title: "100 prisoners hats", category: "Logical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-13-100-prisoners-with-redblack-hats/" },
  { title: "10 coins", category: "Logical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-24-10-coins-puzzle/" },
  { title: "2-player coin game", category: "Logical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-14-strategy-for-a-2-player-coin-game/" },
  { title: "5 pirates gold", category: "Logical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-20-5-pirates-and-100-gold-coins/" },
  { title: "Minimum cuts", category: "Logical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-31-minimum-cut-puzzle/" },
  { title: "Prisoner & policeman", category: "Logical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-34-prisoner-and-policeman-puzzle/" },
  { title: "Cheating husband", category: "Logical", link: "https://www.geeksforgeeks.org/gfg-academy/guess-the-victim/" },
  { title: "Blind games", category: "Logical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-blind-games/" },
  { title: "Chameleons", category: "Logical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-chameleons-go-on-a-date/" },
  { title: "Heaven & hell", category: "Logical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-heaven-hell/" },
  { title: "Mislabeled jars", category: "Logical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-mislabeled-jars/" },
  { title: "8 balls problem", category: "Logical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-8-balls-problem/" },
  { title: "Cheryl birthday", category: "Logical", link: "https://www.geeksforgeeks.org/aptitude/cheryls-birthday-puzzle-and-solution/" },
  { title: "Lion & unicorn", category: "Logical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-the-lion-and-the-unicorn/" },
  { title: "Farmer goat wolf cabbage", category: "Logical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-farmer-goat-wolf-cabbage/" },
  { title: "Water jug", category: "Logical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-water-jug-problem/" },
  { title: "Blind man pills", category: "Logical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-blind-man-and-pills/" },
  { title: "Burning candles", category: "Logical", link: "https://www.geeksforgeeks.org/gfg-academy/puzzle-the-burning-candles/" },
  { title: "Poison milk bottles", category: "Logical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-rat-and-poisonous-milk-bottles/" },
  { title: "4L & 9L buckets", category: "Logical", link: "https://www.geeksforgeeks.org/aptitude/measuring-6l-water-4l-9l-buckets/" },
  { title: "Six houses puzzle", category: "Logical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-six-houses-p-q-r-s-t-and-u/" },
  { title: "Melting candles", category: "Logical", link: "https://www.geeksforgeeks.org/gfg-academy/melting-candles-puzzle/" },
  { title: "Red vs blue hats", category: "Logical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-47-red-hat-vs-blue-hat/" },
  { title: "Joint family puzzle", category: "Logical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-joint-family-of-seven-persons-l-m-n-o-p-q-and-r/" },
  { title: "Circle of lights", category: "Logical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-the-circle-of-lights/" },
  { title: "9 students hats", category: "Logical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-9-students-and-red-black-hats/" },
  { title: "Light all bulbs", category: "Logical", link: "https://www.geeksforgeeks.org/competitive-programming/puzzle-light-all-the-bulbs/" },
  { title: "Distribute water", category: "Logical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-distribute-the-water/" },
  { title: "Same hair count", category: "Logical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-can-2-persons-be-with-same-number-of-hairs-on-their-heads/" },
  { title: "Heavy ball", category: "Logical", link: "https://www.geeksforgeeks.org/dsa/weight-heavy-ball/" },
  { title: "Weight puzzle", category: "Logical", link: "https://www.geeksforgeeks.org/dsa/weight-heavy-ball/" },

  // 🔹 Mathematical & Analytical (38–79)
  { title: "Ages of daughters", category: "Mathematical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-2-find-ages-of-daughters/" },
  { title: "Bee distance", category: "Mathematical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-3-calculate-total-distance-travelled-by-bee/" },
  { title: "6×6 grid paths", category: "Mathematical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-6x6-grid-how-many-ways/" },
  { title: "Monty Hall", category: "Mathematical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-6-monty-hall-problem/" },
  { title: "Torch & bridge", category: "Mathematical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-18-torch-and-bridge/" },
  { title: "2 eggs 100 floors", category: "Mathematical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-set-35-2-eggs-and-100-floors/" },
  { title: "White ball probability", category: "Mathematical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-12-maximize-probability-of-white-ball/" },
  { title: "Poison & rat", category: "Mathematical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-19-poison-and-rat/" },
  { title: "Hourglass", category: "Mathematical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-27-hourglasses-puzzle/" },
  { title: "Boys girls ratio", category: "Mathematical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-17-ratio-of-boys-and-girls-in-a-country-where-people-want-only-boys/" },
  { title: "Car wheel", category: "Mathematical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-29-car-wheel-puzzle/" },
  { title: "Chocolates max", category: "Mathematical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-22-maximum-chocolates/" },
  { title: "Cake split", category: "Mathematical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-splitting-a-cake-with-a-missing-piece-in-two-equal-portion/" },
  { title: "Fake note", category: "Mathematical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-33-rs-500-note-puzzle/" },
  { title: "Girl or boy", category: "Mathematical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-44-girl-or-boy/" },
  { title: "Average salary", category: "Mathematical", link: "https://www.geeksforgeeks.org/maths/puzzle-26-know-average-salary-without-disclosing-individual-salaries/" },
  { title: "Cricket runs", category: "Mathematical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-37-maximum-run-in-cricket/" },
  { title: "Task completion", category: "Mathematical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-32-completion-of-task/" },
  { title: "Excel row missing", category: "Mathematical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-40-find-missing-row-in-excel/" },
  { title: "Rickety bridge", category: "Mathematical", link: "https://www.geeksforgeeks.org/aptitude/four-people-rickety-bridge/" },
  { title: "Man in well", category: "Mathematical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-man-fell-in-well-puzzle/" },
  { title: "50 red blue marbles", category: "Mathematical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-50-red-marbles-and-50-blue-marbles/" },
  { title: "3 triangles", category: "Mathematical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-form-three-equilateral-triangles/" },
  { title: "Pills bottles", category: "Mathematical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-10-identical-bottles-pills/" },
  { title: "Circle cuts", category: "Mathematical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-maximum-pieces-that-can-be-cut-from-a-circle-using-6-straight-lines/" },
  { title: "Chain link", category: "Mathematical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-85-chain-link-puzzle/" },
  { title: "Shopkeeper fake note", category: "Mathematical", link: "https://www.geeksforgeeks.org/gfg-academy/interview-puzzle-the-shopkeeper-and-the-lady-who-made-a-purchase-of-rs-200-with-fake-note/" },
  { title: "Egg dropping general", category: "Mathematical", link: "https://www.geeksforgeeks.org/dsa/egg-dropping-puzzle-with-2-eggs-and-k-floors/" },
  { title: "Apples guarantee", category: "Mathematical", link: "https://www.geeksforgeeks.org/dsa/minimum-number-of-apples-to-be-collected-from-trees-to-guarantee-m-red-apples/" },
  { title: "Snail wall", category: "Mathematical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-snail-and-wall/" },
  { title: "1000 bulbs", category: "Mathematical", link: "https://www.geeksforgeeks.org/dsa/puzzle-1000-light-bulbs-switched-on-off-by-1000-persons-passing-by/" },
  { title: "Alternating knights", category: "Mathematical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-four-alternating-knights/" },
  { title: "100 cows milk", category: "Mathematical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-100-cows-and-milk/" },
  { title: "One mile globe", category: "Mathematical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-one-mile-on-the-globe-mcq/" },
  { title: "Counters board", category: "Mathematical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-the-counters-and-board/" },
  { title: "Six matches", category: "Mathematical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-six-matches-right-foot-forward/" },
  { title: "Initial money", category: "Mathematical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-how-much-he-had-initially/" },
  { title: "Cake 3 cuts", category: "Mathematical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-3-cuts-cut-round-cake-8-equal-pieces/" },
  { title: "Creepers climbing", category: "Mathematical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-two-creepers-climbing-a-tree/" },
  { title: "Palace legs", category: "Mathematical", link: "https://www.geeksforgeeks.org/aptitude/puzzle-number-of-legs-in-palace/" },

  // 🔹 Arrangement + Shape + Misc (80–100)
  { title: "Days on 2 dice", category: "Arrangement", link: "https://www.geeksforgeeks.org/aptitude/puzzle-23-days-of-month-using-2-dice/" },
  { title: "Matchstick puzzle", category: "Arrangement", link: "https://www.geeksforgeeks.org/aptitude/puzzle-36-matchstick-puzzle/" },
  { title: "Palindrome date", category: "Arrangement", link: "https://www.geeksforgeeks.org/aptitude/puzzle-30-last-palindrome-data/" },
  { title: "10 bottles pills", category: "Arrangement", link: "https://www.geeksforgeeks.org/aptitude/puzzle-10-identical-bottles-pills/" },
  { title: "10 balls 5 lines", category: "Arrangement", link: "https://www.geeksforgeeks.org/aptitude/puzzle-10-balls-in-5-lines/" },
  { title: "Round table coins", category: "Arrangement", link: "https://www.geeksforgeeks.org/aptitude/puzzle-round-table-coin-game/" },
  { title: "Circle of lights", category: "Arrangement", link: "https://www.geeksforgeeks.org/aptitude/puzzle-the-circle-of-lights/" },
  { title: "Chessboard domino", category: "Arrangement", link: "https://www.geeksforgeeks.org/aptitude/puzzle-25chessboard-and-dominos/" },
  { title: "Max circle pieces", category: "Arrangement", link: "https://www.geeksforgeeks.org/aptitude/puzzle-maximum-pieces-that-can-be-cut-from-a-circle-using-6-straight-lines/" },
  { title: "Missing cake piece", category: "Arrangement", link: "https://www.geeksforgeeks.org/aptitude/puzzle-splitting-a-cake-with-a-missing-piece-in-two-equal-portion/" },
  { title: "3 ants triangle", category: "Arrangement", link: "https://www.geeksforgeeks.org/aptitude/puzzle-21-3-ants-and-triangle/" },
  { title: "Measure 45 min wires", category: "Arrangement", link: "https://www.geeksforgeeks.org/aptitude/puzzle-1-how-to-measure-45-minutes-using-two-identical-wires/" },
  { title: "Elevator puzzle", category: "Arrangement", link: "https://www.geeksforgeeks.org/aptitude/puzzle-elevator-puzzle/" },
  { title: "Last ball puzzle", category: "Arrangement", link: "https://www.geeksforgeeks.org/aptitude/puzzle-find-last-ball-remain-entire-process/" },
  { title: "100 people gun", category: "Arrangement", link: "https://www.geeksforgeeks.org/aptitude/puzzle-100-people-in-a-circle-with-gun-puzzle/" },
  { title: "Party guests", category: "Arrangement", link: "https://www.geeksforgeeks.org/aptitude/puzzle-find-the-total-guests-that-are-present-at-the-party/" },
  { title: "Top 100 puzzles index (96)", category: "Arrangement", link: "https://www.geeksforgeeks.org/aptitude/top-100-puzzles-asked-in-interviews/" },
  { title: "Top 100 puzzles index (97)", category: "Arrangement", link: "https://www.geeksforgeeks.org/aptitude/top-100-puzzles-asked-in-interviews/" },
  { title: "Top 100 puzzles index (98)", category: "Arrangement", link: "https://www.geeksforgeeks.org/aptitude/top-100-puzzles-asked-in-interviews/" },
  { title: "Top 100 puzzles index (99)", category: "Arrangement", link: "https://www.geeksforgeeks.org/aptitude/top-100-puzzles-asked-in-interviews/" },
  { title: "Top 100 puzzles index (100)", category: "Arrangement", link: "https://www.geeksforgeeks.org/aptitude/top-100-puzzles-asked-in-interviews/" },
];

async function main() {
  console.log("🌱 Seeding database with correct GFG links...");
  await prisma.puzzleProgress.deleteMany();
  await prisma.puzzle.deleteMany();

  for (let i = 0; i < puzzles.length; i++) {
    await prisma.puzzle.create({
      data: { id: i + 1, title: puzzles[i].title, category: puzzles[i].category, link: puzzles[i].link },
    });
  }
  console.log(`✅ Seeded ${puzzles.length} puzzles`);
}

main()
  .catch((e) => { console.error("❌ Seed error:", e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
