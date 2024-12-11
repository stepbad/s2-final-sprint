// Button.test.jsx
import { render, screen } from '@testing-library/react';
import Button from './Button'; // Adjust the import path as necessary
import { expect } from 'chai'; // Import Chai's expect

describe('Button Component', () => {
  it('renders button correctly when showAdd is true', () => {
    render(<Button showAdd={true} />);

    // Check if the button is in the document (it should be)
    const button = screen.getByRole('button');
    expect(button).to.not.be.null;  // Chai equivalent of 'toBeInTheDocument'
  });

  it('renders button correctly when showAdd is false', () => {
    render(<Button showAdd={false} />);

    // Check if the button is in the document (it should be)
    const button = screen.getByRole('button');
    expect(button).to.not.be.null;  // Chai equivalent of 'toBeInTheDocument'
  });
});

