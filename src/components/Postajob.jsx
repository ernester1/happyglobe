import axios from 'axios';
import { useState } from 'react';

const Postajob = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [jobPhoto, setJobPhoto] = useState("");
  
  // Hooks for information messages
  const [loading, setLoading] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  
  // Submit Function
  const submit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!jobTitle || !jobDescription || !salary) {
      setError("Please fill in all required fields");
      return;
    }
    
    setLoading("Please wait...");
    setError("");
    setMessage("");
    
    const data = new FormData();
    data.append("job_tittle", jobTitle);
    data.append("job_description", jobDescription);
    data.append("salary", salary);
    data.append("job_photo", jobPhoto);
    
    try {
      const response = await axios.post(
        "https://ernester1.pythonanywhere.com/api/post_job",
        data
      );
      
      setLoading("");
      setMessage(response.data.success || "Job posted successfully!");
      
      // Reset the form
      setJobTitle("");
      setJobDescription("");
      setSalary("");
      setJobPhoto("");
      
    } catch (error) {
      setLoading("");
      setError(error.response?.data?.error || "Failed to post job. Please try again.");
    }
  };

  return (
    <div className="row justify-content-center mt-2 y">
      <div className="col-md-6 card shadow p-4">
        <form onSubmit={submit}>
          <h2 className='text-info'>Post Job</h2>
          
          {loading && <div className="alert alert-info">{loading}</div>}
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          
          <div className="mb-3">
            <label className="form-label">Job Title*</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Enter the Job Title" 
              value={jobTitle} 
              onChange={(e) => setJobTitle(e.target.value)} 
              required
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label">Job Description*</label>
            <textarea 
              placeholder="Enter the Job Description..." 
              className="form-control" 
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              required
            ></textarea>
          </div>
          
          <div className="mb-3">
            <label className="form-label">Salary*</label>
            <input 
              type="number" 
              placeholder="Enter the salary" 
              className="form-control"
              onChange={(e) => setSalary(e.target.value)} 
              value={salary} 
              required
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label">Job Photo</label>
            <input 
              type="file" 
              className="form-control"
              accept='image/*'
              onChange={(e) => setJobPhoto(e.target.files[0])}
            />
          </div>
          
          <button type="submit" className="btn btn-primary w-100">Post Job</button>
        </form>
      </div>
    </div>
  );
}

export default Postajob;