import React from 'react';

const ProviderVisualizations = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ marginBottom: '40px' }}> {/* Add margin-bottom */}
        <h1>{/* Add visualization */}</h1>
        <h1>{/* Add visualization */}</h1>
        <h1>{/* Add visualization */}</h1>
        <br></br>
        <div style={{margin: '0 auto', maxWidth: '1000px'}}>
        <h1>Self-Critiques</h1>
        <p>
          <strong>What did we do well?</strong><br />
        </p>
        <p>
          <strong>What did we learn?</strong><br />
        </p>
        <p>
          <strong>What did we teach each other?</strong><br />
        </p>
        <p>
          <strong>What can we do better?</strong><br />
        </p>
        <p>
          <strong>What effect did the peer reviews have?</strong><br />
        </p>
        <p>
          <strong>What puzzles us?</strong><br />
        </p>
        <h1>Other Critiques</h1>
        <p>
          <strong>What did they do well?</strong><br />
           </p>
           <p>
          <strong>How effective was their RESTful API?</strong><br />
           </p>
           <p>
          <strong>How well did they implement your user stories?</strong><br />
           </p>
           <p>
          <strong>What did we learn from their website?</strong><br />
           </p>
           <p>
          <strong>What can they do better?</strong><br />
           </p>
           <p>
          <strong>What puzzles us about their website?</strong><br />
           </p>
        </div>
      </div>
    </div>
  );
};

export default ProviderVisualizations;
