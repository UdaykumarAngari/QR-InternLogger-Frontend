import React, { useState, useEffect } from 'react';
import { FaDownload } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

const NewComers = () => {
  const [newComers, setNewComers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNewComers();
  }, []);

  const fetchNewComers = async () => {
    try {
      const response = await axios.get('/api/new-comers');
      setNewComers(response.data);
    } catch (error) {
      toast.error('Error fetching visitors');
      console.error('Error fetching visitors:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const exportToCSV = () => {
    const csvContent = [
      ['ID', 'Name', 'Visitor ID', 'Email', 'Phone', 'Aadhaar', 'Purpose', 'Entry Time'],
      ...newComers.map(visitor => [
        visitor.id,
        visitor.name,
        visitor.visitorId,
        visitor.email,
        visitor.phone,
        visitor.aadhaar,
        visitor.purpose,
        visitor.entryTime
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `visitors_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
    
    toast.success('Visitor records exported successfully');
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Visitor Records</h1>
        <div className="d-flex gap-3">
          <span className="badge bg-primary">{newComers.length} visitors</span>
          <button className="btn btn-success" onClick={exportToCSV}>
            <FaDownload /> Export CSV
          </button>
        </div>
      </div>

      <div className="card">
        {newComers.length === 0 ? (
          <div className="text-center p-4">
            <p>No visitor records found.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Visitor ID</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Aadhaar</th>
                  <th>Purpose</th>
                  <th>Entry Time</th>
                </tr>
              </thead>
              <tbody>
                {newComers.map((visitor) => (
                  <tr key={visitor.id}>
                    <td>{visitor.id}</td>
                    <td>{visitor.name}</td>
                    <td>{visitor.visitorId}</td>
                    <td>{visitor.email}</td>
                    <td>{visitor.phone}</td>
                    <td>{visitor.aadhaar}</td>
                    <td style={{ maxWidth: '200px', wordWrap: 'break-word' }}>
                      {visitor.purpose}
                    </td>
                    <td>{formatDate(visitor.entryTime)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewComers;
