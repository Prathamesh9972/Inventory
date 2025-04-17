const Chemical = require("../models/chemicalModel");

// Get all chemicals
exports.getChemicals = async (req, res) => {
  try {
    const chemicals = await Chemical.find();
    res.json(chemicals);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch chemicals" });
  }
};

// Add a new chemical
exports.addChemical = async (req, res) => {
  const { name, batchNumber, quantity, intakeDate, expirationDate, addedBy } = req.body;
  const chemical = new Chemical({ name, batchNumber, quantity, intakeDate, expirationDate, addedBy });
  
  try {
    await chemical.save();
    res.status(201).json(chemical);
  } catch (error) {
    res.status(500).json({ error: "Failed to add chemical" });
  }
};

// Get a specific chemical by ID
exports.getChemicalById = async (req, res) => {
  try {
    const chemical = await Chemical.findById(req.params.id);
    if (!chemical) {
      return res.status(404).json({ error: "Chemical not found" });
    }
    res.status(200).json(chemical);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch chemical" });
  }
};

// Update a chemical by ID
exports.updateChemical = async (req, res) => {
  try {
    const updatedChemical = await Chemical.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedChemical) {
      return res.status(404).json({ error: "Chemical not found" });
    }
    res.status(200).json(updatedChemical);
  } catch (error) {
    res.status(500).json({ error: "Failed to update chemical" });
  }
};

// Delete a chemical by ID
exports.deleteChemical = async (req, res) => {
  try {
    const chemical = await Chemical.findByIdAndDelete(req.params.id);
    if (!chemical) {
      return res.status(404).json({ error: "Chemical not found" });
    }
    res.status(200).json({ message: "Chemical deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete chemical" });
  }
};
