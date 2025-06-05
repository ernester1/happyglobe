// Signin.jsx
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const submit = async (e) => {
    e.preventDefault();
    setLoading("Please wait...");

    try {
      const data = new FormData();
      data.append("email", email);
      data.append("password", password);

      const response = await axios.post('https://ernester1.pythonanywhere.com/api/signin', data);
      setLoading("");
      
      if (response.data.user) {
        setSuccess(response.data.message);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        window.dispatchEvent(new Event('userChange'));

        // Redirect to the intended destination or default to "/"
        const from = location.state?.from || '/';
        navigate(from, { replace: true });
      } else {
        setError("Login Failed!!");
      }
    } catch (error) {
      setLoading("");
      setSuccess("");
      setError(error.response?.data?.error);
    }
  };

  return (
    <div className='row justify-content-center m-4'>
      <div className="col-md-6 card shadow p-4">
        <form onSubmit={submit}>
          <h2>Sign In</h2>
          {success && <div className="alert alert-success">{success}</div>}
          {loading && <div className="alert alert-info">{loading}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <input 
            type="email" 
            placeholder='Enter email'
            className='form-control my-3'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input 
            type="password" 
            placeholder='Enter Password'
            className='form-control my-3'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="btn btn-success">Sign In ✅</button>
        </form>
      </div>
    </div>
  );
};

export default Signin;