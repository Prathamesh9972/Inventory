import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')); // Get the user from localStorage

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user from localStorage
    navigate('/'); // Redirect to the login page after logout
  };

  return (
    <header style={{ backgroundColor: '#f5f5f5', padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Inventory Management</h1>
        </div>
        <nav>
          <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem' }}>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/chemicals">Chemicals</Link></li>
            <li><Link to="/purchases">Purchases</Link></li>
            <li><Link to="/sales">Sales</Link></li>
            <li><Link to="/safety">Safety</Link></li>
            <li><Link to="/reports">Reports</Link></li>
          </ul>
        </nav>
        <div>
          {user ? (
            <button onClick={handleLogout}>Logout</button> // Show Logout button if user is logged in
          ) : (
            <Link to="/">Login</Link> // Show Login link if user is not logged in
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
