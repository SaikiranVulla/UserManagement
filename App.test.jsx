// App.test.jsx
import React from 'react';
import {render, screen} from '@testing-library/react-native';
import App from './App';

test('renders "Hello, World!"', () => {
  render(<App />);
  const textElement = screen.getByText('Hello, World!');
  expect(textElement).toBeInTheDocument();
});
