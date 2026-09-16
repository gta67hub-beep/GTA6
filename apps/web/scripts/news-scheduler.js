const cron = require("node-cron");
const { exec } = require("child_process");

console.log("=== GTA 6 News Scheduler Started ===");
console.log("Running every 6 hours to fetch new articles...\n");

// Run every 6 hours
cron.schedule("0 */6 * * *", () => {
  console.log(`\n[${new Date().toISOString()}] Fetching news...`);
  exec("node scripts/fetch-news.js", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
    }
    console.log(stdout);
  });
});

// Run immediately on start
console.log("Running initial fetch...");
exec("node scripts/fetch-news.js", (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
  }
  console.log(stdout);
});

console.log("\nScheduler is running. Press Ctrl+C to stop.");
console.log("News will be fetched every 6 hours automatically.");
