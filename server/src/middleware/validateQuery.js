const parseNumber = (value) => {
  if (value === undefined) {
    return null;
  }

  const parsed = Number(value);
  return Number.isNaN(parsed) ? null : parsed;
};

const validatePagination = (req, res, next) => {
  const page = req.query.page ? parseNumber(req.query.page) : 1;
  const limit = req.query.limit ? parseNumber(req.query.limit) : 50;

  if (!Number.isInteger(page) || page < 1) {
    return res.status(400).json({
      success: false,
      message: "Invalid page parameter"
    });
  }

  if (!Number.isInteger(limit) || limit < 1 || limit > 500) {
    return res.status(400).json({
      success: false,
      message: "Invalid limit parameter"
    });
  }

  return next();
};

const validateGroupQuery = (req, res, next) => {
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
  const allowedMetrics = new Set(["intensity", "likelihood", "relevance"]);

  if (!req.query.field || !allowedFields.has(req.query.field)) {
    return res.status(400).json({
      success: false,
      message: "Invalid or missing field parameter"
    });
  }

  if (req.query.metric && !allowedMetrics.has(req.query.metric)) {
    return res.status(400).json({
      success: false,
      message: "Invalid metric parameter"
    });
  }

  if (req.query.limit) {
    const limit = parseNumber(req.query.limit);
    if (!Number.isInteger(limit) || limit < 1 || limit > 200) {
      return res.status(400).json({
        success: false,
        message: "Invalid limit parameter"
      });
    }
  }

  return next();
};


module.exports = {
  validatePagination,
  validateGroupQuery
};
