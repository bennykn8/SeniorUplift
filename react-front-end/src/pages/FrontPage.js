import React from 'react';
import './FrontPage.css'; 
import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const FrontPage = () => {
  const navigate = useNavigate(); 

  return (
    <div className="container-fluid">
      <div className="hero-section">
        <div className="hero-text text-center">
          <h1>Welcome to SeniorUpLift</h1>
          <p>
            Helping the elderly in Texas find nearby healthcare centers, nursing homes,
            and entertainment options with ratings and proximity for easy access to services.
          </p>
          <a href="#learn-more" className="cta-button">Learn More</a>
        </div>
      </div>

      <div className="carousel-container mt-5">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-img"
              src="https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg?cs=srgb&dl=pexels-olly-3768131.jpg&fm=jpg"
              alt="Slide 1"
            />
          </Carousel.Item>
          
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-img"
              src="https://media.istockphoto.com/id/1413583709/photo/cheerful-senior-having-fun-while-taking-selfie-at-retirement-community.jpg?s=612x612&w=0&k=20&c=nYFvWrL80Zh9DCDbBJNO5DnUQQv9qliQfBjLfFcymCc="
              alt="Slide 2"
            />
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100 carousel-img"
              src="https://vistaliving.net/wp-content/uploads/2017/07/AdobeStock_136239519-1080x675.jpeg"
              alt="Slide 3"
            />
          </Carousel.Item>
        </Carousel>
      </div>

      <div className="row justify-content-center mt-5 features-section" id="learn-more">


        <div className="col-md-4 text-center feature-item"
        onClick={() => navigate('/healthcare')} 
        style={{ cursor: 'pointer' }} >
          <img
            src="https://media.gettyimages.com/id/183361838/photo/medical-center.jpg?s=612x612&w=gi&k=20&c=405YNZE_8YM3kx_mNIw4AqnNPVPln6oby6UcYEq1rCA="
            alt="Elderly people enjoying life"
            className="img-fluid rounded-circle feature-image"
          />
          <h3 className="mt-3">Healthcare Centers</h3>
          <p>Find the best healthcare centers nearby with ratings and reviews.</p>
        </div>

        <div 
          className="col-md-4 text-center feature-item clickable-box" 
          onClick={() => navigate('/nursing-homes')} 
          style={{ cursor: 'pointer' }} 
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzVx_1TJ2qSPMFcF_cHPh32Bqx4z2-7x0z4g&s"
            alt="Nursing Homes"
            className="img-fluid rounded-circle feature-image"
          />
          <h3 className="mt-3">Nursing Homes</h3>
          <p>Locate top-rated nursing homes within your vicinity for elderly care.</p>
        </div>

        <div 
        className="col-md-4 text-center feature-item"
        onClick={() => navigate('/entertainment')} 
          style={{ cursor: 'pointer' }} 
        >
          
          <img
            src="https://fairviewadc.com/wp-content/uploads/2019/08/elderly-entertainment.jpg"
            alt="Entertainment"
            className="img-fluid rounded-circle feature-image"
          />
          <h3 className="mt-3">Entertainment</h3>
          <p>Explore fun and engaging activities available for seniors in Texas.</p>
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
