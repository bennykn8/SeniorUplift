import React from 'react';
import BarChart from './BarChart';
import HealthCenterBubblePlot from './BubbleChart';
import BubbleMap from './BubbleMap';

const CritiqueSection = ({ title, content }) => (
  <section style={{ marginBottom: '20px' }}>
    <h3 style={{ fontWeight: 'bold', fontSize: '1rem', marginBottom: '10px' }}>{title}</h3>
    <div>{content}</div>
  </section>
);

const Visualizations = () => {

  const selfCritiques = [
    {
      title: 'What did we do well?',
      content: (
        <p>
          We did a great job communicating with each other and collaborating each week to ensure the work got done and that all team members were on the same page. Allocating
          tasks and helping each other out when needed was a particular strength of ours.
        </p>
      ),
    },
    {
      title: 'What did we learn?',
      content: (
        <p>
          Each of us had varying skillsets prior to embarking on this project, so collectively we were able to learn from and teach each other various toolings and technologies.
          For example, when we worked on the backend, Benny applied his knowledge of Flask and SQL to inform the team on how to accomplish certain tasks. Similarly, when we worked
          on the frontend, Will was able to assist when we encountered issues with React and JavaScript. We each learned every aspect of a full-stack application, from the DBs, to
          frontend, to APIs, and to deployment.
        </p>
      ),
    },
    {
      title: 'What did we teach each other?',
      content: (
        <p>
          As previously mentioned, each of us had different strengths when it came to application development, so we were able to teach each other how to achieve certain tasks.
          We also observed how each member approached problems and how they solved them, which was an interesting experience as it broadened our understanding of how to diversely
          approach challenges.
        </p>
      ),
    },
    {
      title: 'What can we do better?',
      content: (
        <p>
          One thing that we could have done better was to do more planning beforehand (e.g., drawing diagrams of how some pages should look) so that there was less confusion among
          the team members. When we worked asynchronously, we occasionally had overlap in the tasks that we each were working on. This could have been easily avoided if we had a
          more concrete plan in place.
        </p>
      ),
    },
    {
      title: 'What effect did the peer reviews have?',
      content: (
        <p>
          The anonymous peer reviews allowed each of us to gauge how each of us stood in the eyes of the group as a whole. Although we did not have many shortcomings in terms of
          our collaboration or effectiveness, the peer reviews allowed us to see what we could improve on and what we did well.
        </p>
      ),
    },
    {
      title: 'What puzzles us?',
      content: (
        <p>
          One thing that we likely need to do a deeper dive into is how the site functions on various platforms. We tried to account for latencies in API calls and such, but we did
          not do a whole lot of testing on different devices. This is something that we will likely need to address in the future.
        </p>
      ),
    },
  ];

  const titleStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#333', 
    textTransform: 'uppercase', 
    margin: '20px 0', 
    textDecoration: 'underline', 
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={titleStyle}>Event Categories</h1>
        <BarChart />
        <h1 style={titleStyle}>Elderly Homes Locations</h1>
        <BubbleMap />
        <h1 style={titleStyle}>Most Frequent Hospital Locations</h1>
        <HealthCenterBubblePlot />
      </div>

      <div style={{ margin: '0 auto', maxWidth: '1000px' }}>
      <h1 style={titleStyle}>Self-Critiques</h1>
        {selfCritiques.map((critique, index) => (
          <CritiqueSection key={index} title={critique.title} content={critique.content} />
        ))}
      </div>
    </div>
  );
};

export default Visualizations;
