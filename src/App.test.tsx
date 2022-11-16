import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';
import { TestRender } from './utils/test-utils';

test('renders learn react link', () => {
  // render(<App />);
  const {container} = TestRender(<App />)
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
