import React from 'react';
import { render } from '@testing-library/react';
import { ThemeContextProvider } from '../context/ThemeContext';
import App from '../App';

describe('App Component', () => {
  it('renders portfolio without crashing in ThemeContextProvider', () => {
    const { container } = render(
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    );
    expect(container).toBeTruthy();
  });
});
