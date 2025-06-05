import React from 'react';
import cleaning from './assets/images/slider4.jpg';
import header from './assets/images/slider2.jpg';
import busy from './assets/images/busy-male-entrepreneur.webp';
import farm from './assets/images/slider3.jpg';

const Carousel = () => {
  // Array of carousel items for easier management
  const carouselItems = [
    { id: 1, image: busy, alt: "Busy professional working on laptop", active: true },
    { id: 2, image: farm, alt: "Agricultural farm landscape with workers" },
    { id: 3, image: header, alt: "Team of professionals collaborating" },
    { id: 4, image: cleaning, alt: "Cleaning service professional at work" }
  ];

  return (
    <div className="carousel-container mb-4">
      <div className="row">
        <div className="col-12 p-0">
          <div 
            id="jobCarousel" 
            className="carousel slide" 
            data-bs-ride="carousel"
            data-bs-interval="5000" // 5 second interval
          >
            {/* Optional indicators */}
            <div className="carousel-indicators">
              {carouselItems.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  data-bs-target="#jobCarousel"
                  data-bs-slide-to={index}
                  className={item.active ? "active" : ""}
                  aria-current={item.active ? "true" : undefined}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>

            <div className="carousel-inner rounded-3 overflow-hidden shadow">
              {carouselItems.map((item) => (
                <div 
                  key={item.id} 
                  className={`carousel-item ${item.active ? 'active' : ''}`}
                >
                  <img 
                    src={item.image} 
                    alt={item.alt}
                    className="d-block w-100 carousel-img"
                    style={{ height: "400px", objectFit: "cover" }}
                  />
                  {/* Optional captions */}
                  <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
                    <h5>Find Your Dream Job</h5>
                    <p>Browse thousands of opportunities worldwide</p>
                  </div>
                </div>
              ))}
            </div>

            <button 
              className="carousel-control-prev" 
              type="button" 
              data-bs-target="#jobCarousel" 
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button 
              className="carousel-control-next" 
              type="button" 
              data-bs-target="#jobCarousel" 
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;