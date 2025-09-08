import "@testing-library/jest-dom/vitest";
import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import QuestionItem from "../QuestionItem";
import { Provider } from "react-redux";
import { store } from "../../../../app/providers/store/store";
import { MemoryRouter } from "react-router-dom";

describe("QuestionItem", () => {
  const baseQuestion = {
    id: "q1",
    title: "Sample Question",
    description: "How to test a React component?",
    attachedCode: 'console.log("hello")',
    isResolved: false,
    user: { id: 1, username: "alice", role: "user" },
    answers: [],
  };

  it("renders title and description", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <QuestionItem question={baseQuestion as any} />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText("Sample Question")).toBeInTheDocument();
    expect(screen.getByText(/How to test a React component/)).toBeInTheDocument();
  });
});
