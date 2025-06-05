// Homepage.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaBriefcase, FaHandshake, FaGlobeAmericas, FaSmile } from 'react-icons/fa';
import Carousel from './Carousel';

const Homepage = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem('user');

  const handleFindJobs = () => {
    if (user) {
      navigate('/Jobsavailable');
    } else {
      navigate('/signup', { state: { from: '/Jobsavailable' } });
    }
  };

  const handlePostJob = () => {
    if (user) {
      navigate('/Postajob');
    } else {
      navigate('/signup', { state: { from: '/Postajob' } });
    }
  };

  return (
    <div className="homepage-container">
      <Carousel />
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to <span className="brand-name">Happy Globe</span></h1>
          <p className="hero-text">
            You've found the perfect platform to <span className="highlight">discover global opportunities</span> or 
            <span className="highlight"> share your own</span>. Whether you're seeking work or looking to hire, 
            we connect talent with opportunities worldwide.
          </p>
          <div className="cta-buttons">
            <button onClick={handleFindJobs} className="cta-button primary">
              <FaSearch className="icon" /> Find Jobs
            </button>
            <button onClick={handlePostJob} className="cta-button secondary">
              <FaBriefcase className="icon" /> Post a Job
            </button>
          </div>
        </div>
        
      </section>

      <section className="value-section">
        <h2>Why Choose Happy Globe?</h2>
        <div className="value-cards">
          <div className="value-card">
            <FaGlobeAmericas className="value-icon" />
            <h3>Global Reach</h3>
            <p>Access opportunities from around the world in one convenient platform.</p>
          </div>
          <div className="value-card">
            <FaHandshake className="value-icon" />
            <h3>Trusted Connections</h3>
            <p>Verified employers and professionals ensure quality interactions.</p>
          </div>
          <div className="value-card">
            <FaSmile className="value-icon" />
            <h3>Satisfaction Guaranteed</h3>
            <p>Our users consistently rate us 4.8+ for service and results.</p>
          </div>
        </div>
      </section>

      <section className="testimonial-section">
        <div className="testimonial-content">
          <blockquote>
            "Happy Globe transformed how I find international talent. Within two weeks of posting, 
            I connected with three perfect candidates for our remote team."
          </blockquote>
          <div className="testimonial-author">
            <div>
              <p className="author-name">Sarah K.</p>
              <p className="author-title">HR Director, TechSolutions Inc.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <h2>Ready to Begin Your Journey?</h2>
        <p>Join thousands of satisfied users who found their perfect match through Happy Globe.</p>
        <div className="cta-buttons">
          <Link to="/signup" className="cta-button primary large">
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
