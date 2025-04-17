const Safety = require('../models/safetyModel');

// Add safety information
const addSafetyInfo = async (req, res) => {
  try {
    const info = await Safety.create(req.body);
    res.status(201).json(info);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add safety info' });
  }
};

// Get all safety information
const getAllSafety = async (req, res) => {
  try {
    const safety = await Safety.find().populate('chemical');
    res.status(200).json(safety);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch safety info' });
  }
};

// Update safety information by ID
const updateSafetyInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSafety = await Safety.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedSafety) {
      return res.status(404).json({ error: 'Safety info not found' });
    }

    res.status(200).json(updatedSafety);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update safety info' });
  }
};

// Delete safety information by ID
const deleteSafetyInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSafety = await Safety.findByIdAndDelete(id);

    if (!deletedSafety) {
      return res.status(404).json({ error: 'Safety info not found' });
    }

    res.status(200).json({ message: 'Safety info deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete safety info' });
  }
};

module.exports = { addSafetyInfo, getAllSafety, updateSafetyInfo, deleteSafetyInfo };
