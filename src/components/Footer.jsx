import React from 'react';
import x from './assets/images/x.png';
import ig from './assets/images/ig.png';
import fb from './assets/images/fb.png';

const Footer = () => {
  return (
    <footer className="mt-5">
      <div className="row bg-light text-dark p-5 m-0">
        <div className="col-md-4 mb-4 mb-md-0">
          <h3 className="mb-3">About Us</h3>
          <p className="text-justify">
            At Happy Globe, we believe that everyone deserves a fulfilling career and access to opportunities that match their skills and aspirations. Our mission is to bridge the gap between talented job seekers and forward-thinking employers by providing a seamless, transparent, and user-friendly job platform. Whether you're looking for your dream job or searching for the perfect candidate to join your team, Happy Globe offers tailored solutions to meet your needs. With advanced search tools, real-time updates, and a commitment to fairness, we empower individuals and businesses to connect, grow, and thrive together. Join us in building a happier, more productive workforce—one great job at a time.
          </p>
        </div>
        <div className="col-md-4 mb-4 mb-md-0">
          <h3 className="mb-3">Contact Us</h3>
          <form>
            <div className="mb-3">
              <input 
                type="email" 
                name="email" 
                placeholder="Enter Email" 
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <textarea 
                name="comment" 
                placeholder="Leave a comment" 
                className="form-control" 
                rows="5"
                required
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="btn btn-danger text-light w-100"
            >
              Send Message
            </button>
          </form>
        </div> 
        <div className="col-md-4">
          <h3 className="mb-3">Stay Connected</h3>
          <div className="social-icons mb-4">
            <a href="https://facebook.com" aria-label="Facebook" className="me-2">
              <img src={fb} alt="facebook" width="48" className="img-fluid"/>
            </a>
            <a href="https://instagram.com" aria-label="Instagram" className="me-2">
              <img src={ig} alt="instagram" width="48" className="img-fluid"/>
            </a>
            <a href="https://x.com" aria-label="X (formerly Twitter)">
              <img src={x} alt="x" width="48" className="img-fluid"/>
            </a>
          </div>
          <p className="mb-0">
            <strong>Why Choose Happy Globe?</strong><br />
            ✔ Smart Matching – AI-driven recommendations for the best job fits <br />
            ✔ Trusted Network – Verified employers and qualified candidates<br />
            ✔ Easy & Fast – Simple applications and quick hiring processes <br />
            ✔ Career Growth – Resources and tips to help you succeed
            <br /><br />
            Your future starts here—explore, apply, and grow with Happy Globe! 🌍✨
          </p>
        </div>
      </div>
      <div className="bg-dark text-center text-light p-3">
        <p className="m-0">Developed by Ernest Wanjala. &copy; {new Date().getFullYear()} All rights reserved &trade;</p>
      </div>
    </footer>
  );
};

export default Footer;