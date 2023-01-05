// GET /api/companies
const getCompanies = (req, res) => {
  try {
    const companies = require("../database/mockCompanies.json");

    res.status(200).json({ companies });
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getCompanies };
