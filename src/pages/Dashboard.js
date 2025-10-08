import React, { useState, useEffect } from 'react';
import { FaUsers, FaHistory, FaQrcode, FaUserPlus, FaUserCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalInterns: 0,
    totalEntries: 0,
    todayEntries: 0,
    totalVisitors: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [internsRes, entriesRes, visitorsRes] = await Promise.all([
        axios.get('/api/interns'),
        axios.get('/api/entry-logs'),
        axios.get('/api/new-comers')
      ]);

      const today = new Date().toISOString().split('T')[0];
      const todayEntries = entriesRes.data.filter(entry => 
        entry.timestamp.startsWith(today)
      ).length;

      setStats({
        totalInterns: internsRes.data.length,
        totalEntries: entriesRes.data.length,
        todayEntries: todayEntries,
        totalVisitors: visitorsRes.data.length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      title: 'Register New Intern',
      description: 'Add a new intern to the system',
      icon: FaUserPlus,
      link: '/register-intern',
      color: '#28a745'
    },
    {
      title: 'Scan QR Code',
      description: 'Log intern entry using QR code',
      icon: FaQrcode,
      link: '/scan',
      color: '#007bff'
    },
    {
      title: 'New Visitor Entry',
      description: 'Register a new visitor',
      icon: FaUserCheck,
      link: '/new-comer',
      color: '#17a2b8'
    },
    {
      title: 'View All Interns',
      description: 'Manage intern records',
      icon: FaUsers,
      link: '/interns',
      color: '#6f42c1'
    }
  ];

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-4">Dashboard</h1>
      
      {/* Statistics Cards */}
      <div className="grid">
        <div className="card text-center">
          <FaUsers size={48} color="#667eea" />
          <h3 className="mt-4">{stats.totalInterns}</h3>
          <p>Total Interns</p>
        </div>
        <div className="card text-center">
          <FaHistory size={48} color="#28a745" />
          <h3 className="mt-4">{stats.totalEntries}</h3>
          <p>Total Entries</p>
        </div>
        <div className="card text-center">
          <FaQrcode size={48} color="#007bff" />
          <h3 className="mt-4">{stats.todayEntries}</h3>
          <p>Today's Entries</p>
        </div>
        <div className="card text-center">
          <FaUserCheck size={48} color="#17a2b8" />
          <h3 className="mt-4">{stats.totalVisitors}</h3>
          <p>Total Visitors</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="mb-4">Quick Actions</h2>
        <div className="grid">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.link} className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="d-flex align-items-center gap-3">
                <action.icon size={32} color={action.color} />
                <div>
                  <h4>{action.title}</h4>
                  <p className="text-muted">{action.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
