import { test, expect, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ShoppingCart from './ShoppingCart'; // Adjust the import based on the correct path
import '@testing-library/jest-dom'; // Extends jest-dom for extra DOM assertions

describe("ShoppingCart", () => {
  test("renders the shopping cart with items", async () => {
    // Mocking the global fetch API to return cart data with items
    global.fetch = vi.fn().mockResolvedValueOnce({
      json: vi.fn().mockResolvedValue([
        {
          id: 1,
          name: "Mock Product 1",
          price: 20.0,
          quantity: 2,
          image: "mock-image-1.jpg",
          size: "M",
          color: "Black",
        },
        {
          id: 2,
          name: "Mock Product 2",
          price: 30.0,
          quantity: 1,
          image: "mock-image-2.jpg",
          size: "L",
          color: "Blue",
        },
      ]),
    });

    render(
      <MemoryRouter>
        <ShoppingCart />
      </MemoryRouter>
    );

    // Wait for the products to appear in the DOM
    await screen.findByText("Mock Product 1"); // Wait for product 1
    await screen.findByText("Mock Product 2"); // Wait for product 2

    // Assertions: Check if product names and prices are rendered
    expect(screen.getByText("Mock Product 1")).toBeInTheDocument();
    expect(screen.getByText("Mock Product 2")).toBeInTheDocument();
    expect(screen.getByText("Price: $20")).toBeInTheDocument();
    expect(screen.getByText("Price: $30")).toBeInTheDocument();
  });
});

