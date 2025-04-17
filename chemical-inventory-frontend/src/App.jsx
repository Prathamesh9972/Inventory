import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Chemicals from './pages/Chemicals';
import Purchases from './pages/Purchases';
import Sales from './pages/Sales';
import Safety from './pages/Safety';
import Reports from './pages/Reports';
import Login from './pages/Login';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chemicals" element={<Chemicals />} />
        <Route path="/purchases" element={<Purchases />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/  " element={<Safety />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </div>
  );
}

export default App;
