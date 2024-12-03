import React from 'react';
import ConditionsPieChart from './ProviderConditionPieChart';
import TreatmentsBarChart from './ProviderTreatmentBar';

const CritiqueSection = ({ title, content }) => (
  <section style={{ marginBottom: '20px' }}>
    <h3 style={{ fontWeight: 'bold', fontSize: '1rem', marginBottom: '10px' }}>{title}</h3>
    <div>{content}</div>
  </section>
);

const ProviderVisualizations = () => {

  const otherCritiques = [
    {
      title: 'What did they do well?',
      content: (
        <p>
          Their website was very responsive and satisfying to traverse. They did a great job listening to the customer stories and accounting for potential desired capabilities.
          The website was also very visually appealing and easy to navigate.
        </p>
      ),
    },
    {
      title: 'How effective was their RESTful API?',
      content: (
        <p>
          Their RESTful API was holistic in providing functionality. They also did a great job describing the API in their documentation; everything was quite easy to follow.
        </p>
      ),
    },
    {
      title: 'How well did they implement your user stories?',
      content: (
        <p>
          The developer group implemented our user stories effectively. They cover most of the functionalities that a customer of their website would want, which allows for a
          positive experience when using the website.
        </p>
      ),
    },
    {
      title: 'What did we learn from their website?',
      content: (
        <p>
          We took inspiration for stylistic components of the website to improve our own. We often struggled with how we should format data and present it, so having a base to
          work off of was very helpful at times.
        </p>
      ),
    },
    {
      title: 'What can they do better?',
      content: (
        <p>
          We would have liked to see more images for each instance on the different tabs/pages. It would improve their UI and allow for a more user-friendly experience. Right now,
          it feels a bit bland with a lot of text.
        </p>
      ),
    },
    {
      title: 'What puzzles us about their website?',
      content: (
        <p>
          Something that we really cannot answer without analyzing their search/filter logic is that we see some false positives occasionally. When I search for a particular item,
          I sometimes get results that are not relevant to my search. We wonder if this can be improved, or if it is a limitation of the data that they have.
        </p>
      ),
    },
  ];

  return (
    <div style={{ textAlign: 'center' }}>

      <div style={{ marginBottom: '40px' }}> {/* Add margin-bottom */}
        <h1>Conditions Age Group Distribution</h1>
        <ConditionsPieChart />
        <h1>Treatment Type Distribution</h1>
        <TreatmentsBarChart />
        <h1>Most Frequent Hospital Locations</h1>
      </div>

      <div style={{ margin: '0 auto', maxWidth: '1000px' }}>
        <h1>Other Critiques</h1>
        {otherCritiques.map((critique, index) => (
          <CritiqueSection key={index} title={critique.title} content={critique.content} />
        ))}
      </div>
    </div>
  );
};

export default ProviderVisualizations;
