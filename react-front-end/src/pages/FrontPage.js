import React from 'react';

const FrontPage = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center mt-5">
          <h1>Welcome to SeniorUpLift</h1>
          <p>
            SeniorUplift helps the elderly in Texas find nearby healthcare centers,
            nursing homes, and entertainment, offering details like ratings
            and proximity for easy access to services.
          </p>
          {/* Adding an image of elderly people */}
          <img 
            src="https://compote.slate.com/images/66168178-3547-4917-8ea9-12938af61a04.jpg" 
            alt="Elderly people enjoying life" 
            className="img-fluid mt-4" 
          />
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
