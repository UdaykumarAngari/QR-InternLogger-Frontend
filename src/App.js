import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Interns from './pages/Interns';
import RegisterIntern from './pages/RegisterIntern';
import EntryLogs from './pages/EntryLogs';
import QRScanner from './pages/QRScanner';
import NewComerForm from './pages/NewComerForm';
import NewComers from './pages/NewComers';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/interns" element={<Interns />} />
          <Route path="/register-intern" element={<RegisterIntern />} />
          <Route path="/entry-logs" element={<EntryLogs />} />
          <Route path="/scan" element={<QRScanner />} />
          <Route path="/new-comer" element={<NewComerForm />} />
          <Route path="/new-comers" element={<NewComers />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
