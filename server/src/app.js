const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const healthRoutes = require("./routes/health");
const dataRoutes = require("./routes/data");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/health", healthRoutes);
app.use("/api/data", dataRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
