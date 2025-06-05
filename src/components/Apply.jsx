import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Apply = () => {
  const location = useLocation();
  const { jobId, jobTitle } = location.state || {};
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: jobTitle || '',
    message: ''
  });
  const [resume, setResume] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formDataToSend = new FormData();
    formDataToSend.append('job_id', jobId);
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('position', formData.position);
    formDataToSend.append('message', formData.message);
    
    if (resume) {
      formDataToSend.append('resume', resume);
    }

    try {
      const response = await axios.post(
        'https://ernester1.pythonanywhere.com/api/apply',
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      setIsSubmitted(true);
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          position: jobTitle || '',
          message: ''
        });
        setResume(null);
      }, 5000);
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">Job Application Form</h2>
        </div>
        
        <div className="card-body p-4">
          {isSubmitted && (
            <div className="alert alert-success mb-4" role="alert">
              <h4 className="alert-heading">Application Submitted Successfully!</h4>
              <p>Thank you for applying. We've received your application for {formData.position}.</p>
              <p>We'll review your qualifications and get back to you soon.</p>
            </div>
          )}
          
          {!isSubmitted && (
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                {/* Full Name */}
                <div className="col-md-6">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="name" 
                    placeholder="John Doe" 
                    required 
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                
                {/* Email */}
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    placeholder="example@example.com" 
                    required 
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                
                {/* Phone Number */}
                <div className="col-md-6">
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <input 
                    type="tel" 
                    className="form-control" 
                    id="phone" 
                    placeholder="+1234567890" 
                    required 
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                
                {/* Job Position */}
                <div className="col-md-6">
                  <label htmlFor="position" className="form-label">Job Applied For</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="position" 
                    placeholder="Software Developer" 
                    required 
                    value={formData.position}
                    onChange={handleChange}
                  />
                </div>
                
                {/* File Upload */}
                <div className="col-12">
                  <label htmlFor="resume" className="form-label">
                    Upload your resume (PDF, DOC, DOCX)
                  </label>
                  <input 
                    type="file" 
                    className="form-control" 
                    id="resume" 
                    accept=".pdf,.doc,.docx" 
                    required 
                    onChange={handleFileChange}
                  />
                  <div className="form-text">
                    Please upload any file showing your education level and qualifications
                  </div>
                </div>
                
                {/* Cover Letter */}
                <div className="col-12">
                  <label htmlFor="message" className="form-label">
                    Why should we hire you?
                  </label>
                  <textarea 
                    className="form-control" 
                    id="message" 
                    rows="5" 
                    placeholder="Explain your qualifications and why you're a good fit..."
                    required
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                
                {/* Submit Button */}
                <div className="col-12 mt-4">
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg w-100 py-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Submitting...
                      </>
                    ) : (
                      'Submit Application'
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Apply;