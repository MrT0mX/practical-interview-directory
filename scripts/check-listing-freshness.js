const fs = require("node:fs");
const path = require("node:path");

const readmePath = path.join(__dirname, "..", "README.md");
const readme = fs.readFileSync(readmePath, "utf8");
const listingPattern = /^- \[([^\]]+)\]\([^)]+\)\s*\|.*$/gm;
const checkedPattern = /\bchecked (\d{4}-\d{2}-\d{2})\b/;
const today = new Date();
const latestAllowedDate = new Date(
  Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() + 1)
);
const oldestCurrentDate = new Date(today);
oldestCurrentDate.setUTCDate(oldestCurrentDate.getUTCDate() - 365);

let total = 0;
let verified = 0;
let historical = 0;
let invalid = 0;
const staleListings = [];
let match;

while ((match = listingPattern.exec(readme)) !== null) {
  total += 1;
  const [line] = match;
  const lineNumber = readme.slice(0, match.index).split("\n").length;
  const checkedMatch = line.match(checkedPattern);
  const hasSource = /\bSource:\s*\[[^\]]+\]\(https?:\/\/[^)]+\)/.test(line);

  if (!checkedMatch && !hasSource) {
    historical += 1;
    continue;
  }

  if (!checkedMatch || !hasSource) {
    console.error(`Listing metadata is incomplete: ${match[1]} (line ${lineNumber})`);
    invalid += 1;
    continue;
  }

  const checkedDate = new Date(`${checkedMatch[1]}T00:00:00Z`);
  if (
    Number.isNaN(checkedDate.getTime()) ||
    checkedDate.toISOString().slice(0, 10) !== checkedMatch[1]
  ) {
    console.error(`Invalid verification date: ${match[1]} (line ${lineNumber})`);
    invalid += 1;
    continue;
  }

  if (checkedDate > latestAllowedDate) {
    console.error(`Verification date is in the future: ${match[1]} (line ${lineNumber})`);
    invalid += 1;
    continue;
  }

  verified += 1;

  if (checkedDate < oldestCurrentDate) {
    staleListings.push({ company: match[1], date: checkedMatch[1], lineNumber });
  }
}

console.log(
  `Checked ${total} company listings: ${verified} with source and date; ${historical} historical/unverified.`
);

for (const listing of staleListings) {
  console.log(
    `::warning file=README.md,line=${listing.lineNumber},title=Review interview report::${listing.company} was last checked ${listing.date} (over 12 months ago).`
  );
}

if (invalid > 0) {
  process.exitCode = 1;
}
