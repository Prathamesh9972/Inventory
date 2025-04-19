import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header'; // Import Header component
import './Reports.css'; // Import CSS for styling (create the corresponding CSS file)

const Reports = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/reports/detailed');
        setReport(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch the report.');
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading report...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="report-container">
      <Header />
      <h2>Inventory Detailed Report</h2>

      {/* Summary Section */}
      <section className="summary">
        <h3>Summary</h3>
        <p><strong>Total Sales Value:</strong> ₹{report.totalSalesValue.toFixed(2)}</p>
        <p><strong>Total Purchase Cost:</strong> ₹{report.totalPurchaseCost.toFixed(2)}</p>
        <p><strong>Total Chemicals in Inventory:</strong> {report.totalChemicals}</p>
      </section>

      {/* Sales Details Section */}
      <section className="details-section">
        <h3>Sales Details ({report.salesCount})</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Chemical</th>
              <th>Batch</th>
              <th>Quantity</th>
              <th>Customer</th>
              <th>Sold By</th>
              <th>Sale Date</th>
            </tr>
          </thead>
          <tbody>
            {report.salesDetails.map((sale) => (
              <tr key={sale._id}>
                <td>{sale.chemical?.name || 'N/A'}</td>
                <td>{sale.chemical?.batchNumber || 'N/A'}</td>
                <td>{sale.quantity}</td>
                <td>{sale.customerName}</td>
                <td>{sale.soldBy}</td>
                <td>{new Date(sale.saleDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Purchase Details Section */}
      <section className="details-section">
        <h3>Purchase Details ({report.purchaseCount})</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Chemical</th>
              <th>Batch</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Supplier</th>
              <th>Purchased By</th>
              <th>Purchase Date</th>
            </tr>
          </thead>
          <tbody>
            {report.purchaseDetails.map((purchase) => (
              <tr key={purchase._id}>
                <td>{purchase.chemical?.name || 'N/A'}</td>
                <td>{purchase.chemical?.batchNumber || 'N/A'}</td>
                <td>{purchase.quantity}</td>
                <td>₹{purchase.price}</td>
                <td>{purchase.supplierName}</td>
                <td>{purchase.purchasedBy}</td>
                <td>{new Date(purchase.purchaseDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Chemical Inventory Section */}
      <section className="details-section">
        <h3>Chemical Inventory ({report.totalChemicals})</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Batch</th>
              <th>Quantity</th>
              <th>Intake Date</th>
              <th>Expiration Date</th>
              <th>Added By</th>
            </tr>
          </thead>
          <tbody>
            {report.chemicalDetails.map((chem) => (
              <tr key={chem._id}>
                <td>{chem.name}</td>
                <td>{chem.batchNumber}</td>
                <td>{chem.quantity}</td>
                <td>{new Date(chem.intakeDate).toLocaleDateString()}</td>
                <td>{new Date(chem.expirationDate).toLocaleDateString()}</td>
                <td>{chem.addedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Reports;
