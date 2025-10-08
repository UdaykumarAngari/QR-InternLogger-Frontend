import React, { useState, useEffect } from 'react';
import { FaEye, FaDownload } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

const EntryLogs = () => {
  const [entryLogs, setEntryLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEntryLogs();
  }, []);

  const fetchEntryLogs = async () => {
    try {
      const response = await axios.get('/api/entry-logs');
      setEntryLogs(response.data);
    } catch (error) {
      toast.error('Error fetching entry logs');
      console.error('Error fetching entry logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Log ID', 'Intern ID', 'Timestamp', 'Status'],
      ...entryLogs.map(log => [
        log.logId,
        log.internId,
        log.timestamp,
        log.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `entry_logs_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
    
    toast.success('Entry logs exported successfully');
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
        <h1>Entry Logs</h1>
        <div className="d-flex gap-3">
          <span className="badge bg-primary">{entryLogs.length} entries</span>
          <button className="btn btn-success" onClick={exportToCSV}>
            <FaDownload /> Export CSV
          </button>
        </div>
      </div>

      <div className="card">
        {entryLogs.length === 0 ? (
          <div className="text-center p-4">
            <p>No entry logs found.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Log ID</th>
                  <th>Intern ID</th>
                  <th>Timestamp</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {entryLogs.map((log) => (
                  <tr key={log.logId}>
                    <td>{log.logId}</td>
                    <td>{log.internId}</td>
                    <td>{formatDate(log.timestamp)}</td>
                    <td>
                      <span className={`badge ${log.status === 'entered' ? 'bg-success' : 'bg-warning'}`}>
                        {log.status}
                      </span>
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

export default EntryLogs;
