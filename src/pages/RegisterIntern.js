import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const RegisterIntern = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    internId: '',
    name: '',
    email: '',
    aadhaarNumber: '',
    mobileNumber: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.internId.trim()) {
      newErrors.internId = 'Intern ID is required';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.aadhaarNumber.trim()) {
      newErrors.aadhaarNumber = 'Aadhaar number is required';
    } else if (!/^\d{12}$/.test(formData.aadhaarNumber)) {
      newErrors.aadhaarNumber = 'Aadhaar number must be 12 digits';
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^\d{10,15}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Mobile number must be 10-15 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await axios.post('/api/interns/register', formData);
      toast.success('Intern registered successfully! QR code has been sent to their email.');
      navigate('/interns');
    } catch (error) {
      const errorMessage = error.response?.data || 'Error registering intern';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="mb-4">Register New Intern</h1>
      
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="internId" className="form-label">Intern ID</label>
            <input
              type="text"
              id="internId"
              name="internId"
              value={formData.internId}
              onChange={handleChange}
              className={`form-control ${errors.internId ? 'error' : ''}`}
              placeholder="Enter intern ID"
            />
            {errors.internId && <div className="error-message">{errors.internId}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-control ${errors.name ? 'error' : ''}`}
              placeholder="Enter full name"
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-control ${errors.email ? 'error' : ''}`}
              placeholder="Enter email address"
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="aadhaarNumber" className="form-label">Aadhaar Number</label>
            <input
              type="text"
              id="aadhaarNumber"
              name="aadhaarNumber"
              value={formData.aadhaarNumber}
              onChange={handleChange}
              className={`form-control ${errors.aadhaarNumber ? 'error' : ''}`}
              placeholder="Enter 12-digit Aadhaar number"
              maxLength="12"
            />
            {errors.aadhaarNumber && <div className="error-message">{errors.aadhaarNumber}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              className={`form-control ${errors.mobileNumber ? 'error' : ''}`}
              placeholder="Enter mobile number"
            />
            {errors.mobileNumber && <div className="error-message">{errors.mobileNumber}</div>}
          </div>

          <div className="d-flex gap-3">
            <button type="submit" className="btn" disabled={loading}>
              {loading ? 'Registering...' : 'Register Intern'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/interns')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterIntern;
