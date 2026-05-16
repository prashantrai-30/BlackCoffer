const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

require("dotenv").config();

const Data = require("../models/Data");

const parseNumber = (value) => {
  if (value === "" || value === null || value === undefined) {
    return null;
  }

  const parsed = Number(value);
  return Number.isNaN(parsed) ? null : parsed;
};

const normalizeRecord = (record) => ({
  end_year: parseNumber(record.end_year),
  intensity: parseNumber(record.intensity),
  sector: record.sector || "",
  topic: record.topic || "",
  insight: record.insight || "",
  url: record.url || "",
  region: record.region || "",
  start_year: parseNumber(record.start_year),
  impact: record.impact === "" ? null : record.impact ?? null,
  added: record.added || "",
  published: record.published || "",
  country: record.country || "",
  relevance: parseNumber(record.relevance),
  pestle: record.pestle || "",
  source: record.source || "",
  title: record.title || "",
  likelihood: parseNumber(record.likelihood),
  city: record.city || "",
  swot: record.swot || ""
});

const importData = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not set");
  }

  const dataPath = path.resolve(__dirname, "../data/jsondata.json");
  const raw = fs.readFileSync(dataPath, "utf-8");
  const records = JSON.parse(raw);

  if (!Array.isArray(records)) {
    throw new Error("jsondata.json must contain an array");
  }

  await mongoose.connect(mongoUri);

  const shouldDrop = process.argv.includes("--drop");
  if (shouldDrop) {
    await Data.deleteMany({});
  }

  const normalized = records.map(normalizeRecord);

  const result = await Data.insertMany(normalized, { ordered: false });

  console.log(`Inserted ${result.length} records`);

  await mongoose.disconnect();
};

importData().catch((error) => {
  console.error("Import failed", error);
  process.exit(1);
});
