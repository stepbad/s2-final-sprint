import { test, expect, describe, vi } from "vitest"; // Import vi for mocking
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import "@testing-library/jest-dom/vitest"; // for extended matchers

describe("ProductDetails", () => {
  test("renders correctly", async () => {
    const mockProduct = {
      id: 1,
      name: "Mock Product",
      description: "This is a mock product description.",
      price: 29.99,
      quantity: 10,
      image: "mock-image-url.jpg",
    };

    // Mocking fetch response with vi.fn() for Vitest
    global.fetch = vi.fn((url) => {
      if (url === "http://localhost:5001/products/1") {
        return Promise.resolve({
          json: () => Promise.resolve(mockProduct),
        });
      }
      return Promise.reject(new Error("Unknown API endpoint"));
    });

    render(
      <MemoryRouter initialEntries={["/product/1"]}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </MemoryRouter>
    );

    // Assertions
    const productName = await screen.findByRole("heading", { level: 1 });
    expect(productName).toHaveTextContent("Mock Product");

    const productDescription = screen.getByText(/This is a mock product description/i);
    expect(productDescription).toBeInTheDocument();

    const productPrice = screen.getByText(/Price: \$29.99/i);
    expect(productPrice).toBeInTheDocument();

    const productStock = screen.getByText(/In stock: 10/i);
    expect(productStock).toBeInTheDocument();

    const addToCartButton = screen.getByRole("button", { name: /Add to Cart/i });
    expect(addToCartButton).toBeInTheDocument();

    const goBackButton = screen.getByRole("button", { name: /Go Back/i });
    expect(goBackButton).toBeInTheDocument();
  });
});
