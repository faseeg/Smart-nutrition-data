const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "foods.json");
const raw = fs.readFileSync(filePath, "utf-8");
const foods = JSON.parse(raw);

const seenNames = new Map();
const duplicates = [];
const cleanedFoods = [];

foods.forEach((food, index) => {
  if (!food.name) return;

  const nameKey = food.name.trim().toLowerCase();

  if (seenNames.has(nameKey)) {
    duplicates.push({
      name: food.name,
      removedIndex: index,
      keptIndex: seenNames.get(nameKey),
    });
    return;
  }

  seenNames.set(nameKey, index);
  cleanedFoods.push(food);
});

fs.writeFileSync(
  path.join(__dirname, "foods.cleaned.json"),
  JSON.stringify(cleanedFoods, null, 2)
);

console.log("Duplicate removal complete");
console.log(`Original items: ${foods.length}`);
console.log(`Cleaned items: ${cleanedFoods.length}`);
console.log(`Removed: ${duplicates.length}`);

if (duplicates.length) {
  console.log("\nRemoved duplicates:");
  duplicates.forEach(d => console.log(`- ${d.name}`));
}
