import React, { useState, useEffect } from 'react';
import { FaDownload, FaEye } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

const Interns = () => {
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInterns();
  }, []);

  const fetchInterns = async () => {
    try {
      const response = await axios.get('/api/interns');
      setInterns(response.data);
    } catch (error) {
      toast.error('Error fetching interns');
      console.error('Error fetching interns:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadQRCode = async (internId) => {
    try {
      const response = await axios.get(`/api/interns/${internId}/qr-code`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${internId}_qr_code.png`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      toast.success('QR code downloaded successfully');
    } catch (error) {
      toast.error('Error downloading QR code');
      console.error('Error downloading QR code:', error);
    }
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
        <h1>All Interns</h1>
        <span className="badge bg-primary">{interns.length} interns</span>
      </div>

      <div className="card">
        {interns.length === 0 ? (
          <div className="text-center p-4">
            <p>No interns registered yet.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Intern ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Aadhaar</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {interns.map((intern) => (
                  <tr key={intern.internId}>
                    <td>{intern.internId}</td>
                    <td>{intern.name}</td>
                    <td>{intern.email}</td>
                    <td>{intern.mobileNumber}</td>
                    <td>{intern.aadhaarNumber}</td>
                    <td>
                      <div className="d-flex gap-3">
                        <button
                          className="btn btn-secondary"
                          onClick={() => downloadQRCode(intern.internId)}
                          title="Download QR Code"
                        >
                          <FaDownload />
                        </button>
                      </div>
                    </td>
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

export default Interns;
