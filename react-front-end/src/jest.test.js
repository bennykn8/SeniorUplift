import { render, screen } from '@testing-library/react';
import NBar from './components/Navbar/Navbar.js';
import { BrowserRouter } from 'react-router-dom';
import About from "./pages/AboutPage";
import Home from './pages/FrontPage'; 


test('renders about tab within navbar', () => {
  render(
    <BrowserRouter>
      <NBar />
    </BrowserRouter>
  );
  const aboutButton = screen.getByText(/About/i);
  expect(aboutButton).toBeInTheDocument();
});

test('renders Healthcare tab within navbar', () => {
  render(
    <BrowserRouter>
      <NBar />
    </BrowserRouter>
  );
  const healthcareButton = screen.getByText(/Healthcare/i);
  expect(healthcareButton).toBeInTheDocument();
});

test('renders Nursing Homes tab within navbar', () => {
  render(
    <BrowserRouter>
      <NBar />
    </BrowserRouter>
  );
  const nursingHomesButton = screen.getByText(/Nursing Homes/i);
  expect(nursingHomesButton).toBeInTheDocument();
});

test('renders Entertainment tab within navbar', () => {
  render(
    <BrowserRouter>
      <NBar />
    </BrowserRouter>
  );
  const entertainmentButton = screen.getByText(/Entertainment/i);
  expect(entertainmentButton).toBeInTheDocument();
});

test('renders the title of the About page', () => {
  render(<About />);
  const aboutTitle = screen.getByRole('heading', { level: 1 });
  expect(aboutTitle).toHaveTextContent('About SeniorUpLift');
});

test('renders the group members heading', () => {
  render(<About />);
  const membersHeading = screen.getByRole('heading', { level: 2, name: /Group Members/i });
  expect(membersHeading).toBeInTheDocument();
});

test('renders group members names', () => {
  render(<About />);
  const memberNames = ['Rohan Aggarwal', 'Rikhil Kalidindi', 'Will Kung', 'Benny Nguyen', 'Pranav Akkaraju'];
  
  memberNames.forEach((name) => {
    const member = screen.getByText(name);
    expect(member).toBeInTheDocument();
  });
});

test('renders the Links section with correct content', () => {
  render(<About />);

  const linksHeading = screen.getByRole('heading', { name: /Links/i });
  expect(linksHeading).toBeInTheDocument();

  const gitLabLink = screen.getByRole('link', { name: /GitLab Repository/i });
  expect(gitLabLink).toBeInTheDocument();
  expect(gitLabLink).toHaveAttribute('href', 'https://gitlab.com/wilku702/cs373-group-8');

  const postmanLink = screen.getByRole('link', { name: /Postman API Collection/i });
  expect(postmanLink).toBeInTheDocument();
  expect(postmanLink).toHaveAttribute('href', 'https://documenter.getpostman.com/view/38703996/2sAXxJgtx8');
});

test('renders the Project Stats section with correct labels', () => {
  render(<About />);

  const projectStatsHeading = screen.getByRole('heading', { name: /Project Stats/i });
  expect(projectStatsHeading).toBeInTheDocument();

  const statsLabels = ["Total Number of Commits", "Total Number of Issues", "Total Number of Unit Tests"];
  statsLabels.forEach(label => {
    const labelElement = screen.getByText(new RegExp(label, 'i'));
    expect(labelElement).toBeInTheDocument();
  });
});

test('renders FrontPage and checks for the title', () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  const titleElement = screen.getByText(/Welcome to SeniorUpLift/i);
  expect(titleElement).toBeInTheDocument();
});
