// Jobsavailable.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Jobsavailable = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const img_url = 'https://ernester1.pythonanywhere.com/static/images/';
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const response = await axios.get('https://ernester1.pythonanywhere.com/api/jobsavailable');
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching Jobs:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const toggleDescription = (jobId) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [jobId]: !prev[jobId]
    }));
  };

  const filteredJobs = jobs.filter((job) =>
    job.job_tittle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatSalary = (salary) => {
    if (!salary) return 'Salary not specified';
    return `$${parseInt(salary).toLocaleString()}`;
  };

  const handleApply = (job) => {
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/apply', { state: { jobId: job.id, jobTitle: job.job_tittle } });
    } else {
      navigate('/signin', { state: { from: '/Jobsavailable' } });
    }
  };

  return (
    <div className='container-fluid'>
      <h3>Explore Jobs Available</h3>

      <input
        type='text'
        className='form-control mb-3'
        placeholder='Search for job...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <br />
      
      <div className='row'>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => (
            <div className='col-md-3 mb-4' key={index}>
              <div className='card shadow card-margin h-100'>
                <div className='d-flex justify-content-center'>
                  <img 
                    src={img_url + job.job_photo} 
                    className='mt-4 product_img img-fluid' 
                    alt={job.job_photo}
                    style={{
                      height: '150px',
                      width: 'auto',
                      objectFit: 'contain'
                    }}
                  />
                </div>

                <div className='card-body d-flex flex-column'>
                  <h5 className='mt-2'>{job.job_tittle}</h5>
                  <div 
                    className='text-muted flex-grow-1 mb-2' 
                    style={{
                      cursor: 'pointer',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: expandedDescriptions[job.id] ? 'unset' : 3,
                      WebkitBoxOrient: 'vertical'
                    }}
                    onClick={() => toggleDescription(job.id)}
                  >
                    {job.job_description}
                  </div>
                  <small 
                    className='text-primary mb-2' 
                    style={{ cursor: 'pointer' }}
                    onClick={() => toggleDescription(job.id)}
                  >
                    {expandedDescriptions[job.id] ? 'Show less' : 'Read more'}
                  </small>
                  <b className='text-warning'>{formatSalary(job.salary)}</b>
                  <button
                    className='btn btn-success mt-2 w-100'
                    onClick={() => handleApply(job)}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className='text-center'>No Job found.</p>
        )}
      </div>
    </div>
  );
};

export default Jobsavailable;