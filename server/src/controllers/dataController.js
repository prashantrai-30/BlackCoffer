const Data = require("../models/Data");

const parseList = (value) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const parseNumber = (value) => {
  if (value === "" || value === null || value === undefined) {
    return null;
  }

  const parsed = Number(value);
  return Number.isNaN(parsed) ? null : parsed;
};

const buildNumericFilter = (exactValue, minValue, maxValue) => {
  if (exactValue) {
    const list = parseList(exactValue)
      .map(parseNumber)
      .filter((value) => value !== null);

    if (list.length > 0) {
      return { $in: list };
    }
  }

  const min = parseNumber(minValue);
  const max = parseNumber(maxValue);
  const range = {};

  if (min !== null) {
    range.$gte = min;
  }

  if (max !== null) {
    range.$lte = max;
  }

  return Object.keys(range).length > 0 ? range : null;
};


const applyListFilter = (filters, field, value) => {
  if (!value) {
    return;
  }

  const list = parseList(value);
  if (list.length > 0) {
    filters[field] = { $in: list };
  }
};

const buildFiltersFromQuery = (query) => {
  const filters = {};

  applyListFilter(filters, "topic", query.topic);
  applyListFilter(filters, "sector", query.sector);
  applyListFilter(filters, "region", query.region);
  applyListFilter(filters, "pestle", query.pestle);
  applyListFilter(filters, "source", query.source);
  applyListFilter(filters, "country", query.country);
  applyListFilter(filters, "city", query.city);
  applyListFilter(filters, "swot", query.swot);

  const endYearFilter = buildNumericFilter(
    query.end_year,
    query.end_year_min,
    query.end_year_max
  );
  if (endYearFilter) {
    filters.end_year = endYearFilter;
  }

  const startYearFilter = buildNumericFilter(
    query.start_year,
    query.start_year_min,
    query.start_year_max
  );
  if (startYearFilter) {
    filters.start_year = startYearFilter;
  }

  const intensityFilter = buildNumericFilter(
    query.intensity,
    query.intensity_min,
    query.intensity_max
  );
  if (intensityFilter) {
    filters.intensity = intensityFilter;
  }

  const relevanceFilter = buildNumericFilter(
    query.relevance,
    query.relevance_min,
    query.relevance_max
  );
  if (relevanceFilter) {
    filters.relevance = relevanceFilter;
  }

  const likelihoodFilter = buildNumericFilter(
    query.likelihood,
    query.likelihood_min,
    query.likelihood_max
  );
  if (likelihoodFilter) {
    filters.likelihood = likelihoodFilter;
  }

  return filters;
};

const getData = async (req, res, next) => {
  try {
    const page = Number.parseInt(req.query.page || "1", 10);
    const limit = Math.min(
      Number.parseInt(req.query.limit || "50", 10),
      500
    );
    const skip = (page - 1) * limit;

    const filters = buildFiltersFromQuery(req.query);

    const [items, total] = await Promise.all([
      Data.find(filters).skip(skip).limit(limit).lean(),
      Data.countDocuments(filters)
    ]);

    res.status(200).json({
      success: true,
      page,
      limit,
      total,
      items
    });
  } catch (error) {
    next(error);
  }
};

const getSummary = async (req, res, next) => {
  try {
    const filters = buildFiltersFromQuery(req.query);

    const [total, summary] = await Promise.all([
      Data.countDocuments(filters),
      Data.aggregate([
        { $match: filters },
        {
          $group: {
            _id: null,
            avgIntensity: { $avg: "$intensity" },
            avgLikelihood: { $avg: "$likelihood" },
            avgRelevance: { $avg: "$relevance" }
          }
        }
      ])
    ]);

    const metrics = summary[0] || {
      avgIntensity: null,
      avgLikelihood: null,
      avgRelevance: null
    };

    res.status(200).json({
      success: true,
      total,
      metrics
    });
  } catch (error) {
    next(error);
  }
};

const getGroupBy = async (req, res, next) => {
  try {
    const allowedFields = new Set([
      "topic",
      "sector",
      "region",
      "country",
      "pestle",
      "source",
      "end_year",
      "start_year",
      "city",
      "swot"
    ]);
    const numericFields = new Set(["end_year", "start_year"]);
    const allowedMetrics = new Set(["intensity", "likelihood", "relevance"]);

    const field = req.query.field;
    if (!field || !allowedFields.has(field)) {
      const fieldError = new Error("Invalid or missing field parameter");
      fieldError.statusCode = 400;
      throw fieldError;
    }

    const metric = req.query.metric;
    if (metric && !allowedMetrics.has(metric)) {
      const metricError = new Error("Invalid metric parameter");
      metricError.statusCode = 400;
      throw metricError;
    }

    const limit = Math.min(
      Number.parseInt(req.query.limit || "20", 10),
      200
    );
    const sortField = metric ? `avg_${metric}` : "count";
    const filters = buildFiltersFromQuery(req.query);
    const fieldFilter = numericFields.has(field)
      ? { $ne: null }
      : { $nin: ["", null] };

    const groupStage = {
      _id: `$${field}`,
      count: { $sum: 1 }
    };

    if (metric) {
      groupStage[`avg_${metric}`] = { $avg: `$${metric}` };
    }

    const results = await Data.aggregate([
      { $match: { ...filters, [field]: fieldFilter } },
      { $group: groupStage },
      { $sort: { [sortField]: -1 } },
      { $limit: limit },
      {
        $project: {
          _id: 0,
          key: "$_id",
          count: 1,
          [`avg_${metric}`]: metric ? 1 : 0
        }
      }
    ]);

    res.status(200).json({
      success: true,
      field,
      metric: metric || null,
      items: results
    });
  } catch (error) {
    next(error);
  }
};


const getDataById = async (req, res, next) => {
  try {
    const item = await Data.findById(req.params.id).lean();

    if (!item) {
      const notFoundError = new Error("Record not found");
      notFoundError.statusCode = 404;
      throw notFoundError;
    }

    res.status(200).json({
      success: true,
      item
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getData,
  getDataById,
  getSummary,
  getGroupBy
};
