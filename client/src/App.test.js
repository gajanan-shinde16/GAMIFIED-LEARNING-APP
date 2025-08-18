import { render, screen } from '@testing-library/react';
import App from './App';

/**
 * A simple "smoke test" for the App component.
 * It renders the entire application and checks if a key piece of text
 * from the HomePage is present in the document. This ensures that the
 * application mounts and renders without crashing.
 */
test('renders the main welcome heading from the home page', () => {
  // Render the entire App component
  render(<App />);

  // Find an element that has the text "Welcome to LearnSphere"
  const headingElement = screen.getByText(/Welcome to LearnSphere/i);

  // Assert that the element was found in the document
  expect(headingElement).toBeInTheDocument();
});