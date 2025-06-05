import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFormData({
        username: parsedUser.username || '',
        email: parsedUser.email || '',
        phone: parsedUser.phone || ''
      });
    } else {
      navigate('/signin');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
    setSuccess('');
    setError('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      username: user.username || '',
      email: user.email || '',
      phone: user.phone || ''
    });
    setSuccess('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess('');
    setError('');

    try {
      // Update localStorage
      const updatedUser = { ...user, ...formData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      window.dispatchEvent(new Event('userChange')); // Trigger custom event
      setUser(updatedUser);

      // Update backend
      const data = new FormData();
      data.append('username', formData.username);
      data.append('email', formData.email);
      data.append('phone', formData.phone);

      await axios.post('https://ernester1.pythonanywhere.com/api/update_profile', data);

      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('userChange')); // Trigger custom event
    navigate('/signin');
  };

  if (!user) {
    return <div className="container my-5 text-center">Loading...</div>;
  }

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">User Profile</h2>
        </div>
        
        <div className="card-body p-4">
          {success && (
            <div className="alert alert-success mb-4" role="alert">
              {success}
            </div>
          )}
          {error && (
            <div className="alert alert-danger mb-4" role="alert">
              {error}
            </div>
          )}
          
          <div className="row g-3">
            <div className="col-12 d-flex justify-content-center mb-4">
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: '#2a7f62',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '3rem',
                  textTransform: 'uppercase',
                  boxShadow: '0 2px 8px rgba(42,127,98,0.3)'
                }}
              >
                {formData.username?.charAt(0) || 'U'}
              </div>
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold">Username</label>
              {isEditing ? (
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              ) : (
                <div className="form-control bg-light" style={{ padding: '0.75rem' }}>
                  {formData.username || 'N/A'}
                </div>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              ) : (
                <div className="form-control bg-light" style={{ padding: '0.75rem' }}>
                  {formData.email || 'N/A'}
                </div>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold">Phone Number</label>
              {isEditing ? (
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              ) : (
                <div className="form-control bg-light" style={{ padding: '0.75rem' }}>
                  {formData.phone || 'N/A'}
                </div>
              )}
            </div>

            <div className="col-12 mt-4">
              {isEditing ? (
                <div className="d-flex gap-3">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg w-100 py-3"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-lg w-100 py-3"
                    onClick={handleCancel}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary btn-lg w-100 py-3"
                  onClick={handleEdit}
                >
                  Edit Profile
                </button>
              )}
            </div>

            <div className="col-12 mt-3">
              <button
                className="btn btn-danger btn-lg w-100 py-3"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;