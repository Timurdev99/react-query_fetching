const express = require("express");
const { getCompanies } = require("../controller/company");
const { getSpecialities } = require("../controller/speciality");

const router = express.Router();
router.get("/companies", getCompanies);
router.get("/specialities", getSpecialities);

module.exports = router;
