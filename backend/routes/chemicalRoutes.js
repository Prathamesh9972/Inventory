const express = require("express");
const router = express.Router();
const { getChemicals, addChemical, getChemicalById, updateChemical, deleteChemical } = require("../controllers/chemicalController");
const checkRole = require("../middlewares/roleMiddleware");

router.get("/", getChemicals);

router.get("/:id", getChemicalById);

router.post("/", checkRole, addChemical);

router.put("/:id", checkRole, updateChemical);

router.delete("/:id", checkRole, deleteChemical);

module.exports = router;
