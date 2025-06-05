// Signup.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [Username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const submit = async (e) => {
    e.preventDefault();
    setLoading("Please wait...");

    try {
      const data = new FormData();
      data.append("username", Username);
      data.append("email", email);
      data.append("password", password);
      data.append("phone", phonenumber);

      const response = await axios.post('https://ernester1.pythonanywhere.com/api/signup', data);
      
      setError("");
      setLoading("");
      setSuccess(response.data.message);

      setUsername("");
      setEmail("");
      setPassword("");
      setPhonenumber("");

      // Redirect to signin with the intended destination
      const from = location.state?.from || '/';
      navigate('/signin', { state: { from } });
    } catch (error) {
      setLoading("");
      setError(error.response?.data?.error);
    }
  };

  return (
    <div className='row justify-content-center p-4'>
      <div className="col-md-6 card shadow mt-4 p-4">
        <form onSubmit={submit}>
          <h2>Sign Up</h2>

          {loading && <div className="alert alert-info">{loading}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <input
            type="text"
            placeholder='Enter your Username'
            className='form-control my-4'
            required
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="email"
            placeholder='Enter your email'
            className='form-control mb-4'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder='password'
            className='form-control mb-4'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="tel"
            placeholder='phone number'
            className='form-control mb-4'
            required
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
          />
          
          <br />

          <button
            type="submit"
            className='btn btn-primary px-4'
          >
            Sign Up 🚀
          </button>

          <p>
            Already have an account? <Link to='/signin'>Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;