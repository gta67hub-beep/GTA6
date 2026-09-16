const { exec, spawn } = require("child_process");
const path = require("path");

console.log("=== GTA 6 Hub - Starting Services ===\n");

// Start the news scheduler
console.log("Starting news scheduler...");
const scheduler = spawn("node", ["scripts/news-scheduler.js"], {
  cwd: path.join(__dirname, ".."),
  stdio: "inherit",
});

scheduler.on("error", (err) => {
  console.error("Scheduler error:", err);
});

// Start Next.js dev server
console.log("Starting Next.js dev server...");
const nextDev = spawn("npm", ["run", "dev:next"], {
  cwd: path.join(__dirname, ".."),
  stdio: "inherit",
  shell: true,
});

nextDev.on("error", (err) => {
  console.error("Next.js error:", err);
});

console.log("\n=== Services Started ===");
console.log("News scheduler: Running (every 6 hours)");
console.log("Next.js: http://localhost:3000");
console.log("\nPress Ctrl+C to stop all services.\n");

// Handle cleanup
process.on("SIGINT", () => {
  console.log("\nShutting down...");
  scheduler.kill();
  nextDev.kill();
  process.exit(0);
});
