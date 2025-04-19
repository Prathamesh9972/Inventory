import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header'; // Adjust if needed

const Safety = () => {
  const [safetyList, setSafetyList] = useState([]);
  const [chemicals, setChemicals] = useState([]);
  const [formData, setFormData] = useState({
    chemical: '',
    hazard: '',
    handlingInstructions: '',
    safetyEquipment: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchSafetyData();
    fetchChemicals();
  }, []);

  const fetchSafetyData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/safety');
      setSafetyList(res.data);
    } catch (err) {
      console.error('Failed to fetch safety info:', err);
    }
  };

  const fetchChemicals = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/chemicals');
      setChemicals(res.data);
    } catch (err) {
      console.error('Failed to fetch chemicals:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const updatedSafety = await axios.put(`http://localhost:5000/api/safety/${editingId}`, formData);
        setSafetyList(
          safetyList.map((safety) =>
            safety._id === editingId ? updatedSafety.data : safety
          )
        );
      } else {
        const newSafety = await axios.post('http://localhost:5000/api/safety', formData);
        setSafetyList([...safetyList, newSafety.data]);
      }

      // Reset form
      setFormData({
        chemical: '',
        hazard: '',
        handlingInstructions: '',
        safetyEquipment: ''
      });
      setEditingId(null);
    } catch (err) {
      console.error('Error submitting safety info:', err);
    }
  };

  const handleEdit = (safety) => {
    setFormData({
      chemical: safety.chemical?._id || safety.chemical || '',
      hazard: safety.hazard,
      handlingInstructions: safety.handlingInstructions,
      safetyEquipment: safety.safetyEquipment
    });
    setEditingId(safety._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/safety/${id}`);
      setSafetyList(safetyList.filter((safety) => safety._id !== id));
    } catch (err) {
      console.error('Failed to delete safety info:', err);
    }
  };

  const getChemicalName = (chemicalField) => {
    if (!chemicalField) return 'Unknown';
    if (typeof chemicalField === 'object' && chemicalField.name) {
      return chemicalField.name;
    }
    const chemical = chemicals.find((chem) => chem._id === chemicalField);
    return chemical ? chemical.name : 'Unknown';
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Header />
      <h2>Safety Information</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <div>
          <label>Chemical:</label>
          <select
            name="chemical"
            value={formData.chemical}
            onChange={handleChange}
            required
          >
            <option value="">Select Chemical</option>
            {chemicals.map((chem) => (
              <option key={chem._id} value={chem._id}>
                {chem.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Hazard:</label>
          <input
            type="text"
            name="hazard"
            value={formData.hazard}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Handling Instructions:</label>
          <input
            type="text"
            name="handlingInstructions"
            value={formData.handlingInstructions}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Safety Equipment:</label>
          <input
            type="text"
            name="safetyEquipment"
            value={formData.safetyEquipment}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{editingId ? 'Update' : 'Add'} Safety Info</button>
      </form>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Chemical</th>
            <th>Hazard</th>
            <th>Handling</th>
            <th>Safety Equipment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {safetyList.map((safety) => (
            <tr key={safety._id}>
              <td>{getChemicalName(safety.chemical)}</td>
              <td>{safety.hazard}</td>
              <td>{safety.handlingInstructions}</td>
              <td>{safety.safetyEquipment}</td>
              <td>
                <button onClick={() => handleEdit(safety)}>Edit</button>
                <button onClick={() => handleDelete(safety._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Safety;
