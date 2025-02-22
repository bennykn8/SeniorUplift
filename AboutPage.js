import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AboutPage = () => {
  //const accessToken = '';

  const [totalCommits, setTotalCommits] = useState(0);
  const [totalIssues, setTotalIssues] = useState(0);
  const [totalPipelines, setTotalPipelines] = useState(0);


  const [membersData, setMembersData] = useState({
    rohan: { commits: 0, issues: 0, tests: 0 },
    rikhil: { commits: 0, issues: 0, tests: 0 },
    will: { commits: 0, issues: 0, tests: 0 },
    benny: { commits: 0, issues: 0, tests: 0 },
    pranav: { commits: 0, issues: 0, tests: 0 }
  });


  const fetchAllGitLabData = async (endpoint) => {
    let allData = [];
    let page = 1;
    let perPage = 100;
    let hasMoreData = true;
    const headers = {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    };

    while (hasMoreData) {
      const response = await fetch(`https://gitlab.com/api/v4/projects/61943658/${endpoint}?per_page=${perPage}&page=${page}`, { headers });
      const data = await response.json();
      allData = allData.concat(data);
      if (data.length < perPage) {
        hasMoreData = false;
      }
      page++;
    }
    return allData;
  };

  const fetchGitLabData = async (usernames, userEmails, memberKey, updateTotals) => {
    try {
      const [allCommits, allIssues, allPipelines] = await Promise.all([
        fetchAllGitLabData('repository/commits'),
        fetchAllGitLabData('issues'),
        fetchAllGitLabData('pipelines')
      ]);

      const userCommits = allCommits.filter(commit => commit.author_email && userEmails.includes(commit.author_email));
      const userIssues = allIssues.filter(issue => issue.author && issue.author.username && usernames.includes(issue.author.username));
      const userPipelines = allPipelines.filter(pipeline => pipeline.user && pipeline.user.username && usernames.includes(pipeline.user.username));


      setMembersData(prevState => ({
        ...prevState,
        [memberKey]: {
          commits: userCommits.length,
          issues: userIssues.length,
          tests: userPipelines.length
        }
      }));


      updateTotals(userCommits.length, userIssues.length, userPipelines.length);

    } catch (error) {
      console.error('Error fetching GitLab data:', error);
    }
  };


  const fetchAllData = async () => {
    let totalCommitsCount = 0;
    let totalIssuesCount = 0;
    let totalPipelinesCount = 0;


    const updateTotals = (commits, issues, pipelines) => {
      totalCommitsCount += commits;
      totalIssuesCount += issues;
      totalPipelinesCount += pipelines;
    };


    await fetchGitLabData(['sendrohan123'], ['sendrohan123@gmail.com'], 'rohan', updateTotals);
    await fetchGitLabData(['RikhilKal', 'rikhilkal'], ['rikhil.kalidindi@averlon.io', 'rikhilkal@gmail.com'], 'rikhil', updateTotals);
    await fetchGitLabData(['wilku702'], ['willkung702@gmail.com'], 'will', updateTotals);
    await fetchGitLabData(['bennykn8'], ['bennykn8@gmail.com', 'bennykn8@utexas.edu'], 'benny', updateTotals);
    await fetchGitLabData(['K1210859'], ['pranav.akkaraju@gmail.com'], 'pranav', updateTotals);


    setTotalCommits(totalCommitsCount);
    setTotalIssues(totalIssuesCount);
    setTotalPipelines(totalPipelinesCount);
  };


  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <div className="container mt-5">
      {/* About Section */}
      <div className="row">
        <div className="col-md-12">
          <h1>About SeniorUpLift</h1>
          <p>SeniorUpLift is a platform dedicated to supporting the elderly population in Texas by providing
            information on healthcare centers, nursing homes, and entertainment options. The purpose of the site
            is to help seniors and their families easily access important welfare resources. The intended users
            are elderly individuals, their caregivers, and healthcare professionals.</p>
        </div>
      </div>

      {/* Group Members Section */}
      <div className="row mt-5 justify-content-center">
        <div className="col-md-12 text-center">
          <h2>Group Members</h2>
          <div className="row mt-4 justify-content-center">

            {/* Member 1 - Rohan */}
            <div className="col-md-6 col-lg-4 mb-4 d-flex justify-content-center">
              <div className="card" style={{ width: '18rem' }}>
                <img className="card-img-top member-img" src="https://miro.medium.com/v2/resize:fit:786/format:webp/1*lN9ulWc7JQkBw3543tThig.jpeg" alt="Rohan Aggarwal" />
                <div className="card-body">
                  <h5 className="card-title">Rohan Aggarwal</h5>
                  <p className="card-text"><strong>Bio:</strong> I am a junior studying Computer Science with an interest in CyberSecurity. I love playing video games and soccer.</p>
                  <p><strong>Major Responsibilities:</strong> Front-end</p>
                  <p><strong>Number of Commits:</strong> {membersData.rohan.commits}</p>
                  <p><strong>Number of Issues:</strong> {membersData.rohan.issues}</p>
                  <p><strong>Number of Unit Tests:</strong> {membersData.rohan.tests}</p>
                </div>
              </div>
            </div>

            {/* Member 2 - Rikhil */}
            <div className="col-md-6 col-lg-4 mb-4 d-flex justify-content-center">
              <div className="card" style={{ width: '18rem' }}>
                <img className="card-img-top member-img" src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*rKURKkvujmDUchjKxOAJWw.png" alt="Rikhil Kalidindi" />
                <div className="card-body">
                  <h5 className="card-title">Rikhil Kalidindi</h5>
                  <p className="card-text"><strong>Bio:</strong> I am a junior studying computer science and I am interested in learning machine learning and security applications of software. I enjoy music and rock climbing.</p>
                  <p><strong>Major Responsibilities:</strong> Front-end</p>
                  <p><strong>Number of Commits:</strong> {membersData.rikhil.commits}</p>
                  <p><strong>Number of Issues:</strong> {membersData.rikhil.issues}</p>
                  <p><strong>Number of Unit Tests:</strong> {membersData.rikhil.tests}</p>
                </div>
              </div>
            </div>

            {/* Member 3 - Will */}
            <div className="col-md-6 col-lg-4 mb-4 d-flex justify-content-center">
              <div className="card" style={{ width: '18rem' }}>
                <img className="card-img-top member-img" src="https://miro.medium.com/v2/resize:fit:786/format:webp/1*IhCH2zSybE9seLR-9XC3Bg.jpeg" alt="Will Kung" />
                <div className="card-body">
                  <h5 className="card-title">Will Kung</h5>
                  <p className="card-text"><strong>Bio:</strong> I am a junior computer science student interested in machine learning and game development. I love working out and listening to music.</p>
                  <p><strong>Major Responsibilities:</strong> Back-end</p>
                  <p><strong>Number of Commits:</strong> {membersData.will.commits}</p>
                  <p><strong>Number of Issues:</strong> {membersData.will.issues}</p>
                  <p><strong>Number of Unit Tests:</strong> {membersData.will.tests}</p>
                </div>
              </div>
            </div>

            {/* Member 4 - Benny */}
            <div className="col-md-6 col-lg-4 mb-4 d-flex justify-content-center">
              <div className="card" style={{ width: '18rem' }}>
                <img className="card-img-top member-img" src="https://miro.medium.com/v2/resize:fit:786/format:webp/1*4HDcXxqZoRnebmiU9yQlMg.jpeg" alt="Benny Nguyen" />
                <div className="card-body">
                  <h5 className="card-title">Benny Nguyen</h5>
                  <p className="card-text"><strong>Bio:</strong> I am a senior computer science student interested in data science and machine learning. I love listening to music, going to concerts, and playing marimba.</p>
                  <p><strong>Major Responsibilities:</strong> Back-end</p>
                  <p><strong>Number of Commits:</strong> {membersData.benny.commits}</p>
                  <p><strong>Number of Issues:</strong> {membersData.benny.issues}</p>
                  <p><strong>Number of Unit Tests:</strong> {membersData.benny.tests}</p>
                </div>
              </div>
            </div>

            {/* Member 5 - Pranav */}
            <div className="col-md-6 col-lg-4 mb-4 d-flex justify-content-center">
              <div className="card" style={{ width: '18rem' }}>
                <img className="card-img-top member-img" src="https://miro.medium.com/v2/resize:fit:786/format:webp/1*fuhwqun3bzhRIgUg7tcGXw.jpeg" alt="Pranav Akkaraju" />
                <div className="card-body">
                  <h5 className="card-title">Pranav Akkaraju</h5>
                  <p className="card-text"><strong>Bio:</strong> I am a junior studying Computer Science with an interest in Software Engineering. I love playing basketball and watching new shows in my free time.</p>
                  <p><strong>Major Responsibilities:</strong> Back-end</p>
                  <p><strong>Number of Commits:</strong> {membersData.pranav.commits}</p>
                  <p><strong>Number of Issues:</strong> {membersData.pranav.issues}</p>
                  <p><strong>Number of Unit Tests:</strong> {membersData.pranav.tests}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Project Stats and Data Sources */}
      <div className="row mt-5">
        <div className="col-md-6 mb-4">
          <div style={{ padding: '20px', border: '1px solid #dee2e6', borderRadius: '0.25rem', backgroundColor: '#fff' }}>
            <h2 style={{ color: '#343a40' }}>Project Stats</h2>
            <p data-testid="commit count"><strong>Total Number of Commits:</strong> {totalCommits}</p>
            <p><strong>Total Number of Issues:</strong> {totalIssues}</p>
            <p><strong>Total Number of Unit Tests:</strong> {totalPipelines}</p>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div style={{ padding: '20px', border: '1px solid #dee2e6', borderRadius: '0.25rem', backgroundColor: '#fff' }}>
            <h2 style={{ color: '#343a40' }}>Data Sources</h2>
            <ul>
              <li>
                <a href="https://www.ahd.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'none' }}>
                  Health Centers
                </a>
              </li>
              <li>
                <a href="https://mapsplatform.google.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'none' }}>
                  Nursing Homes
                </a>
              </li>
              <li>
                <a href="https://www.eventbrite.com/d/united-states--texas/senior-events/" target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'none' }}>
                  Entertainment Data
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tools and Links Section */}
      <div className="row mt-5">
        <div className="col-md-6 mb-4">
          <div style={{ padding: '20px', border: '1px solid #dee2e6', borderRadius: '0.25rem', backgroundColor: '#fff' }}>
            <h2 style={{ color: '#343a40' }}>Tools</h2>
            <ul>
              <li><strong>Python</strong>: Used for back-end development and data processing, helping automate tasks and handle data efficiently.</li>
              <li><strong>Bootstrap</strong>: Used to create a responsive and mobile-friendly front-end design with pre-built components.</li>
              <li><strong>Postman</strong>: Used to test and debug APIs by sending requests and verifying responses for accuracy.</li>
              <li><strong>GitLab</strong>: Used for version control, collaboration, and continuous integration to manage code changes and automate testing.</li>
            </ul>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div style={{ padding: '20px', border: '1px solid #dee2e6', borderRadius: '0.25rem', backgroundColor: '#fff' }}>
            <h2 style={{ color: '#343a40' }}>Links</h2>
            <p style={{ marginBottom: '5px' }}>
              <a href="https://gitlab.com/wilku702/cs373-group-8" target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'none' }}>
                GitLab Repository
              </a>
            </p>
            <p style={{ marginBottom: '5px' }}>
              <a href="https://documenter.getpostman.com/view/38703996/2sAXxJgtx8" target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'none' }}>
                Postman API Collection
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
