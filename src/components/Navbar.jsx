import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Initialize user state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Listen for userChange event to update user state
  useEffect(() => {
    const handleUserChange = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    window.addEventListener('userChange', handleUserChange);
    return () => window.removeEventListener('userChange', handleUserChange);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.dispatchEvent(new Event('userChange')); // Trigger userChange event
    navigate('/signin');
  };

  return (
    <nav 
      className={`navbar navbar-expand-lg fixed-top py-3 ${scrolled ? 'navbar-scrolled' : ''}`}
      aria-label="Main navigation"
      style={{
        fontSize: '1.1rem',
        background: scrolled 
          ? 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(245,255,240,0.98) 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #f5fff0 100%)',
        transition: 'all 0.3s ease',
        boxShadow: '0 2px 15px rgba(0,0,0,0.1)'
      }}
    >
      <div className="container">
        <Link 
          to="/" 
          className="navbar-brand fw-bold d-flex align-items-center" 
          style={{ 
            fontSize: '1.5rem',
            color: '#2a7f62',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          <span 
            className="d-inline-block me-2" 
            style={{ 
              fontSize: '1.8rem',
              filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.2))'
            }}
          >
            🌍
          </span>
          Happy Globe
        </Link>
        
        <button 
          className="navbar-toggl
er"
          type="button"
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation"
          style={{ 
            fontSize: '1.3rem', 
            padding: '0.5rem 0.75rem',
            borderColor: '#2a7f62'
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div 
          className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`} 
          id="navbarContents"
        >
          <div className="navbar-nav ms-auto d-flex align-items-center">
            {user && (
              <>
                <NavLink 
                  to="/Jobsavailable" 
                  activeClassName="active"
                  scrolled={scrolled}
                >
                  Jobs Available
                </NavLink>
                
                <NavLink 
                  to="/Postajob" 
                  activeClassName="active"
                  scrolled={scrolled}
                >
                  Post Job
                </NavLink>
              </>
            )}
            
            <div className="d-flex ms-lg-4 my-2 my-lg-0" style={{ gap: '0.75rem' }}>
              {user ? (
                <>
                  <Link 
                    to="/profile" 
                    className="btn d-flex align-items-center justify-content-center"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: '#2a7f62',
                      color: 'white',
                      fontWeight: '600',
                      fontSize: '1.2rem',
                      textTransform: 'uppercase',
                      boxShadow: '0 2px 8px rgba(42,127,98,0.3)'
                    }}
                  >
                    {user.username?.charAt(0) || 'U'}
                  </Link>
                  <button
                    className="btn mx-2 px-3 py-2"
                    onClick={handleLogout}
                    style={{
                      fontSize: '1.1rem',
                      background: 'transparent',
                      border: '2px solid #dc3545',
                      color: '#dc3545',
                      fontWeight: '500',
                      borderRadius: '8px'
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/signin" 
                    className="btn mx-2 px-3 py-2"
                    aria-label="Sign in"
                    style={{ 
                      fontSize: '1.1rem',
                      background: 'transparent',
                      border: '2px solid #2a7f62',
                      color: '#2a7f62',
                      fontWeight: '500',
                      borderRadius: '8px'
                    }}
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/signup" 
                    className="btn mx-2 px-3 py-2"
                    aria-label="Sign up"
                    style={{ 
                      fontSize: '1.1rem',
                      background: '#2a7f62',
                      color: 'white',
                      fontWeight: '500',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(42,127,98,0.3)'
                    }}
                  >
                    Sign Up
                  </Link>
                </>
              )}
              
              <Link 
                to="/chatbot" 
                className="btn mx-2 d-flex align-items-center px-3 py-2"
                aria-label="Happy Globe Helper"
                style={{ 
                  fontSize: '1.1rem',
                  background: '#4a9fe0',
                  color: 'white',
                  fontWeight: '500',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(74,159,224,0.3)'
                }}
              >
                <span className="d-none d-lg-inline">HappyGlobe Helper</span>
                <span className="d-lg-none">Helper</span>
                <i className="fas fa-robot ms-2" style={{ fontSize: '1.2rem' }}></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, children, activeClassName, scrolled }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`nav-link mx-3 px-2 py-1 ${isActive ? activeClassName : ''}`}
      aria-current={isActive ? 'page' : undefined}
      style={{ 
        fontSize: '1.15rem',
        color: scrolled ? '#2a7f62' : '#2a7f62',
        fontWeight: isActive ? '600' : '500',
        position: 'relative',
        transition: 'all 0.2s ease'
      }}
    >
      {children}
      {isActive && (
        <span 
          style={{
            position: 'absolute',
            bottom: '-2px',
            left: '10%',
            width: '80%',
            height: '3px',
            background: '#2a7f62',
            borderRadius: '3px'
          }}
        ></span>
      )}
    </Link>
  );
};

export default Navbar;