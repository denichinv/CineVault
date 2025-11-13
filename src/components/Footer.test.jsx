import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Footer from "./Footer";

describe("Footer", () => {
  it("should render the footer logo", () => {
    render(<Footer />);
    expect(screen.getByText("CineVault")).toBeInTheDocument();
  });

  it("should render the description", () => {
    render(<Footer />);
    expect(
      screen.getByText(/Your ultimate vault for movies/)
    ).toBeInTheDocument();
  });

  it("should render copyright text", () => {
    render(<Footer />);
    expect(
      screen.getByText(/© 2025 CineVault. All rights reserved./)
    ).toBeInTheDocument();
  });
});
