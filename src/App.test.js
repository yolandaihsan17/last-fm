import { render, screen } from '@testing-library/react';
import App from './App';
import Footer from './components/footer'

test('rendered app component without crashing', () => {
  render(<App />);
});

test('rendered Author in footer', () => {
  render(<Footer />);
  const linkElement = screen.getByText(/Yolanda Ihsan/i);
  expect(linkElement).toBeInTheDocument();
});
