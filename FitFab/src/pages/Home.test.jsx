import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';  // Required for routing
import { describe, test, expect } from 'vitest';  // Import necessary Vitest methods
import '@testing-library/jest-dom';  // This import is necessary for `toBeInTheDocument`
import Home from './Home'; // Adjust the import based on the correct path

describe("Home Component", () => {
  test("renders the category images and links", () => {
    render(
      <MemoryRouter> {/* Wrap with MemoryRouter for routing context */}
        <Home />
      </MemoryRouter>
    );

    // Test if the images are displayed for each category
    expect(screen.getByAltText("Menswear")).toBeInTheDocument();
    expect(screen.getByAltText("Womenswear")).toBeInTheDocument();
    expect(screen.getByAltText("Kidswear")).toBeInTheDocument();

    // Test if the links are correctly set up (check the 'to' attribute)
    const menswearLink = screen.getByAltText("Menswear").closest('a');
    const womenswearLink = screen.getByAltText("Womenswear").closest('a');
    const kidswearLink = screen.getByAltText("Kidswear").closest('a');

    expect(menswearLink).toHaveAttribute('href', '/menswear');
    expect(womenswearLink).toHaveAttribute('href', '/womenswear');
    expect(kidswearLink).toHaveAttribute('href', '/kidswear');
  });
});
