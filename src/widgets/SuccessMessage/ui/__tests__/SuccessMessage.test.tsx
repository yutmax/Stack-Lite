import "@testing-library/jest-dom/vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SuccessMessage from "../SuccessMessage";

describe("SuccessMessage", () => {
  it("renders success message", () => {
    render(<SuccessMessage message="Saved!" />);
    expect(screen.getByText("Saved!")).toBeInTheDocument();
  });
});
