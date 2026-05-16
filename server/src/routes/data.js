const express = require("express");

const {
	getData,
	getDataById,
	getSummary,
	getGroupBy
} = require("../controllers/dataController");

const {
	validatePagination,
	validateGroupQuery
} = require("../middleware/validateQuery");

const router = express.Router();

router.get("/", validatePagination, getData);
router.get("/summary", getSummary);
router.get("/group", validateGroupQuery, getGroupBy);
router.get("/:id", getDataById);

module.exports = router;
