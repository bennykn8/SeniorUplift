import React from 'react';

const CritiqueSection = ({ title, content }) => (
  <section style={{ marginBottom: '20px' }}>
    <h3 style={{ fontWeight: 'bold', fontSize: '1rem', marginBottom: '10px' }}>{title}</h3>
    <div>{content}</div>
  </section>
);

const ProviderVisualizations = () => {
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
      <div style={{ margin: '0 auto', maxWidth: '1000px' }}>
        <h1>Self-Critiques</h1>
        {selfCritiques.map((critique, index) => (
          <CritiqueSection key={index} title={critique.title} content={critique.content} />
        ))}

        <h1>Other Critiques</h1>
        {otherCritiques.map((critique, index) => (
          <CritiqueSection key={index} title={critique.title} content={critique.content} />
        ))}
      </div>
    </div>
  );
};

export default ProviderVisualizations;
