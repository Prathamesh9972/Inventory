import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header'; // Import the Header component


const Purchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [chemicals, setChemicals] = useState([]);
  const [form, setForm] = useState({
    chemical: '',
    supplierName: '',
    quantity: '',
    purchasedBy: ''
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch all purchases
  const fetchPurchases = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/purchases');
      setPurchases(res.data);
    } catch (err) {
      console.error('Error fetching purchases:', err);
    }
  };

  // Fetch all chemicals (for dropdown)
  const fetchChemicals = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/chemicals');
      setChemicals(res.data);
    } catch (err) {
      console.error('Error fetching chemicals:', err);
    }
  };

  useEffect(() => {
    fetchPurchases();
    fetchChemicals();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/purchases/${editingId}`, form);
        setEditingId(null);
      } else {
        await axios.post('http://localhost:5000/api/purchases', form);
      }
      setForm({ chemical: '', supplierName: '', quantity: '', purchasedBy: '' });
      fetchPurchases();
    } catch (err) {
      console.error('Error saving purchase:', err);
    }
  };

  const handleEdit = (purchase) => {
    setForm({
      chemical: purchase.chemical._id,
      supplierName: purchase.supplierName,
      quantity: purchase.quantity,
      purchasedBy: purchase.purchasedBy
    });
    setEditingId(purchase._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/purchases/${id}`);
      fetchPurchases();
    } catch (err) {
      console.error('Error deleting purchase:', err);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
        <Header />
      <h2>Purchase Records</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <select name="chemical" value={form.chemical} onChange={handleChange} required>
          <option value="">Select Chemical</option>
          {chemicals.map((chem) => (
            <option key={chem._id} value={chem._id}>
              {chem.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="supplierName"
          placeholder="Supplier Name"
          value={form.supplierName}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="purchasedBy"
          placeholder="Purchased By"
          value={form.purchasedBy}
          onChange={handleChange}
          required
        />
        <button type="submit">{editingId ? 'Update' : 'Add'} Purchase</button>
      </form>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Chemical</th>
            <th>Supplier</th>
            <th>Quantity</th>
            <th>Purchased By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase) => (
            <tr key={purchase._id}>
              <td>{purchase.chemical?.name || 'Unknown'}</td>
              <td>{purchase.supplierName}</td>
              <td>{purchase.quantity}</td>
              <td>{purchase.purchasedBy}</td>
              <td>
                <button onClick={() => handleEdit(purchase)}>Edit</button>
                <button onClick={() => handleDelete(purchase._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Purchases;
