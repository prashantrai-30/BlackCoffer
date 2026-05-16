const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    end_year: { type: Number, default: null },
    intensity: { type: Number, default: null },
    sector: { type: String, default: "" },
    topic: { type: String, default: "" },
    insight: { type: String, default: "" },
    url: { type: String, default: "" },
    region: { type: String, default: "" },
    start_year: { type: Number, default: null },
    impact: { type: mongoose.Schema.Types.Mixed, default: null },
    added: { type: String, default: "" },
    published: { type: String, default: "" },
    country: { type: String, default: "" },
    relevance: { type: Number, default: null },
    pestle: { type: String, default: "" },
    source: { type: String, default: "" },
    title: { type: String, default: "" },
    likelihood: { type: Number, default: null },
    city: { type: String, default: "" },
    swot: { type: String, default: "" }
  },
  { versionKey: false }
);

dataSchema.index({ end_year: 1 });
dataSchema.index({ start_year: 1 });
dataSchema.index({ topic: 1 });
dataSchema.index({ sector: 1 });
dataSchema.index({ region: 1 });
dataSchema.index({ country: 1 });
dataSchema.index({ pestle: 1 });
dataSchema.index({ source: 1 });

module.exports = mongoose.model("Data", dataSchema);
