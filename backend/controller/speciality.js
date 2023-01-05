// GET /api/specialities
const getSpecialities = (req, res) => {
  try {
    const specialities = require("../database/mockSpecialities.json");

    res.status(200).json({ specialities });
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getSpecialities };
