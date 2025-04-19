import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header'; // Import the Header component

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [formData, setFormData] = useState({
    chemical: '',
    quantity: '',
    customerName: '',
    saleDate: '',
    soldBy: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/sales');
      setSales(res.data);
    } catch (error) {
      console.error('Failed to fetch sales:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/sales/${editingId}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/sales', formData);
      }
      setFormData({
        chemical: '',
        quantity: '',
        customerName: '',
        saleDate: '',
        soldBy: ''
      });
      setEditingId(null);
      fetchSales();
    } catch (error) {
      console.error('Error submitting sale:', error);
    }
  };

  const handleEdit = (sale) => {
    setFormData({
      chemical: sale.chemical._id || sale.chemical,
      quantity: sale.quantity,
      customerName: sale.customerName,
      saleDate: sale.saleDate.split('T')[0],
      soldBy: sale.soldBy
    });
    setEditingId(sale._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/sales/${id}`);
      fetchSales();
    } catch (error) {
      console.error('Failed to delete sale:', error);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
        <Header/>
      <h2>Sales</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <div>
          <label>Chemical ID:</label>
          <input
            type="text"
            name="chemical"
            value={formData.chemical}
            onChange={handleChange}
            placeholder="Chemical ID"
            required
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Customer Name:</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Sale Date:</label>
          <input
            type="date"
            name="saleDate"
            value={formData.saleDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Sold By:</label>
          <input
            type="text"
            name="soldBy"
            value={formData.soldBy}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{editingId ? 'Update Sale' : 'Add Sale'}</button>
      </form>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Chemical</th>
            <th>Quantity</th>
            <th>Customer</th>
            <th>Sale Date</th>
            <th>Sold By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale._id}>
              <td>{sale.chemical?.name || sale.chemical}</td>
              <td>{sale.quantity}</td>
              <td>{sale.customerName}</td>
              <td>{new Date(sale.saleDate).toLocaleDateString()}</td>
              <td>{sale.soldBy}</td>
              <td>
                <button onClick={() => handleEdit(sale)}>Edit</button>
                <button onClick={() => handleDelete(sale._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Sales;
