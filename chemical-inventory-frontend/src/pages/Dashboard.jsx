import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'; // Import the Header component


function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')); // Retrieve user from localStorage

  useEffect(() => {
    if (!user) {
      navigate('/'); 
    }
  }, [user, navigate]);

  const handleNavigation = (path) => {
    navigate(path); 
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Header />
      <h2>Dashboard</h2>
      {user ? (
        <>
          <p>Welcome, {user.name} ({user.role})</p>

          {/* Button to navigate to various pages */}
          <button onClick={() => handleNavigation('/chemicals')}>Chemicals</button>
          <button onClick={() => handleNavigation('/purchases')}>Purchases</button>
          <button onClick={() => handleNavigation('/sales')}>Sales</button>
          <button onClick={() => handleNavigation('/safety')}>Safety</button>
          <button onClick={() => handleNavigation('/reports')}>Reports</button>
        </>
      ) : (
        <p>Loading...</p> // Display a loading message if user is still being fetched
      )}
    </div>
  );
}

export default Dashboard;
