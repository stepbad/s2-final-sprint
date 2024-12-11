import { test, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Womenswear from "./Womenswear";
import "@testing-library/jest-dom/vitest";

describe("Womenswear", () => {
  test("renders correctly", async () => {
    render(
      <MemoryRouter>
        <Womenswear />
      </MemoryRouter>
    );

    // page heading
    const pageHeading = screen.getByRole("heading", { level: 1 });
    expect(pageHeading).toHaveTextContent("Women's Products");

    // filter by dropdown
    const filterLabel = screen.getByLabelText("Filter by:");
    expect(filterLabel).toBeInTheDocument();

    // combobox (dropdown)
    const filterCombobox = screen.getByRole("combobox", { name: "Filter by:" });
    expect(filterCombobox).toBeInTheDocument();

    // options in the combobox
    const allOption = screen.getByRole("option", { name: "All" });
    expect(allOption).toBeInTheDocument();

    const outerwearOption = screen.getByRole("option", { name: "Outerwear" });
    expect(outerwearOption).toBeInTheDocument();

    const topsOption = screen.getByRole("option", { name: "Tops" });
    expect(topsOption).toBeInTheDocument();

    const pantssOption = screen.getByRole("option", { name: "Pants" });
    expect(pantssOption).toBeInTheDocument();

    const accessoOption = screen.getByRole("option", { name: "Accessories" });
    expect(accessoOption).toBeInTheDocument();

    
  });
});
