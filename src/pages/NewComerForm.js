import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const NewComerForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    visitorId: '',
    email: '',
    phone: '',
    aadhaar: '',
    purpose: ''
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

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.visitorId.trim()) {
      newErrors.visitorId = 'Visitor ID is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10-15 digits';
    }

    if (!formData.aadhaar.trim()) {
      newErrors.aadhaar = 'Aadhaar number is required';
    } else if (!/^\d{12}$/.test(formData.aadhaar)) {
      newErrors.aadhaar = 'Aadhaar number must be 12 digits';
    }

    if (!formData.purpose.trim()) {
      newErrors.purpose = 'Purpose is required';
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
      await axios.post('/api/new-comers', formData);
      toast.success('Visitor registered successfully! Notification sent to CSO.');
      navigate('/new-comers');
    } catch (error) {
      const errorMessage = error.response?.data || 'Error registering visitor';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="mb-4">New Visitor Entry</h1>
      
      <div className="card">
        <form onSubmit={handleSubmit}>
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
            <label htmlFor="visitorId" className="form-label">Visitor ID</label>
            <input
              type="text"
              id="visitorId"
              name="visitorId"
              value={formData.visitorId}
              onChange={handleChange}
              className={`form-control ${errors.visitorId ? 'error' : ''}`}
              placeholder="Enter visitor ID (job/student ID)"
            />
            {errors.visitorId && <div className="error-message">{errors.visitorId}</div>}
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
            <label htmlFor="phone" className="form-label">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`form-control ${errors.phone ? 'error' : ''}`}
              placeholder="Enter mobile number"
            />
            {errors.phone && <div className="error-message">{errors.phone}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="aadhaar" className="form-label">Aadhaar Number</label>
            <input
              type="text"
              id="aadhaar"
              name="aadhaar"
              value={formData.aadhaar}
              onChange={handleChange}
              className={`form-control ${errors.aadhaar ? 'error' : ''}`}
              placeholder="Enter 12-digit Aadhaar number"
              maxLength="12"
            />
            {errors.aadhaar && <div className="error-message">{errors.aadhaar}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="purpose" className="form-label">Purpose of Visit</label>
            <textarea
              id="purpose"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              className={`form-control ${errors.purpose ? 'error' : ''}`}
              placeholder="Describe the purpose of visit"
              rows="4"
            />
            {errors.purpose && <div className="error-message">{errors.purpose}</div>}
          </div>

          <div className="d-flex gap-3">
            <button type="submit" className="btn" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Entry'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/new-comers')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewComerForm;
