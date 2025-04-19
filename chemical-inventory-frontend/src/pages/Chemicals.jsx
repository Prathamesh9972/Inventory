import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header"; // Import the Header component

// Component for managing chemicals
const ChemicalsManagement = () => {
  const [chemicals, setChemicals] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    batchNumber: "",
    quantity: 0,
    intakeDate: "",
    expirationDate: "",
    addedBy: "admin", // Assuming the user is admin
  });
  const [editChemicalId, setEditChemicalId] = useState(null);

  // Fetch chemicals on component mount
  useEffect(() => {
    fetchChemicals();
  }, []);

  // Function to fetch all chemicals from the backend
  const fetchChemicals = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/chemicals");
      setChemicals(response.data);
    } catch (error) {
      console.error("Error fetching chemicals:", error.response.data);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle adding a new chemical
  const handleAddChemical = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/chemicals",
        formData
      );
      setChemicals([...chemicals, response.data]);
      setFormData({
        name: "",
        batchNumber: "",
        quantity: 0,
        intakeDate: "",
        expirationDate: "",
        addedBy: "admin", // Reset to default
      });
    } catch (error) {
      console.error("Error adding chemical:", error.response.data);
    }
  };

  // Handle editing a chemical (populate form with existing data)
  const handleEditChemical = (chemical) => {
    setFormData({
      name: chemical.name,
      batchNumber: chemical.batchNumber,
      quantity: chemical.quantity,
      intakeDate: chemical.intakeDate.split("T")[0], // Format to "YYYY-MM-DD"
      expirationDate: chemical.expirationDate.split("T")[0], // Format to "YYYY-MM-DD"
      addedBy: chemical.addedBy,
    });
    setEditChemicalId(chemical._id); // Set the ID of the chemical being edited
  };

  // Handle updating a chemical
  const handleUpdateChemical = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/chemicals/${editChemicalId}`,
        formData
      );
      const updatedChemicals = chemicals.map((chemical) =>
        chemical._id === editChemicalId ? response.data : chemical
      );
      setChemicals(updatedChemicals);
      setFormData({
        name: "",
        batchNumber: "",
        quantity: 0,
        intakeDate: "",
        expirationDate: "",
        addedBy: "admin", // Reset to default
      });
      setEditChemicalId(null); // Reset edit mode
    } catch (error) {
      console.error("Error updating chemical:", error.response.data);
    }
  };

  // Handle deleting a chemical
  const handleDeleteChemical = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/chemicals/${id}`);
      setChemicals(chemicals.filter((chemical) => chemical._id !== id));
    } catch (error) {
      console.error("Error deleting chemical:", error.response.data);
    }
  };

  return (
    <div>
              <Header/>
      <h2>Manage Chemicals</h2>
      {/* Form for adding or editing chemicals */}
      <form
        onSubmit={editChemicalId ? handleUpdateChemical : handleAddChemical}
      >
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Batch Number</label>
          <input
            type="text"
            name="batchNumber"
            value={formData.batchNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Intake Date</label>
          <input
            type="date"
            name="intakeDate"
            value={formData.intakeDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Expiration Date</label>
          <input
            type="date"
            name="expirationDate"
            value={formData.expirationDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">
          {editChemicalId ? "Update Chemical" : "Add Chemical"}
        </button>
      </form>

      {/* Displaying list of chemicals */}
      <h3>Existing Chemicals</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Batch Number</th>
            <th>Quantity</th>
            <th>Intake Date</th>
            <th>Expiration Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {chemicals.map((chemical) => (
            <tr key={chemical._id}>
              <td>{chemical._id}</td> 
              <td>{chemical.name}</td>
              <td>{chemical.batchNumber}</td>
              <td>{chemical.quantity}</td>
              <td>{chemical.intakeDate.split("T")[0]}</td> {/* Format date */}
              <td>{chemical.expirationDate.split("T")[0]}</td> {/* Format date */}
              <td>
                <button onClick={() => handleEditChemical(chemical)}>
                  Edit
                </button>
                <button onClick={() => handleDeleteChemical(chemical._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChemicalsManagement;
