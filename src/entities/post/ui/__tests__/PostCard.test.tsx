import "@testing-library/jest-dom/vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PostCard from "../PostCard";
import { Provider } from "react-redux";
import { store } from "../../../../app/providers/store/store";
import { MemoryRouter } from "react-router-dom";

// Minimal post shape with marks array
const basePost: any = {
  id: 1,
  user: { id: 1, username: "alice" },
  language: "JavaScript",
  code: "console.log('hi')",
  comments: [{ id: 1 }, { id: 2 }],
  marks: [
    { id: 1, type: "like", user: { id: 2 } },
    { id: 2, type: "dislike", user: { id: 3 } },
  ],
};

describe("PostCard", () => {
  it("renders author, language and comments count", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <PostCard post={basePost} />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Author:/)).toBeInTheDocument();
    expect(screen.getByText(/alice/)).toBeInTheDocument();
    expect(screen.getByText(/Language:/)).toBeInTheDocument();
    expect(screen.getByText(/JavaScript/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /2/ })).toBeInTheDocument();
  });
});
