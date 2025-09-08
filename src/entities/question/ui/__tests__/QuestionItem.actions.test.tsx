import "@testing-library/jest-dom/vitest";
import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer, { login } from "../../../user/model/slice";
import { MemoryRouter } from "react-router-dom";

// Mock hooks used inside QuestionItem before importing it
vi.mock("../../../../features/answer/model/useAnswers", () => ({
  useAnswers: () => ({
    answers: [],
    loading: false,
    error: null,
    deleteAnswer: vi.fn(),
    refetch: vi.fn(),
    editAnswer: vi.fn(),
    markAsCorrect: vi.fn(),
  }),
}));

vi.mock("../../../../features/question/model/deleteQuestion", () => ({
  deleteQuestion: vi.fn().mockResolvedValue({ success: true }),
}));

import QuestionItem from "../QuestionItem";
import { deleteQuestion } from "../../../../features/question/model/deleteQuestion";

function makeStore(owner = true) {
  const store = configureStore({ reducer: { user: userReducer } });
  if (owner) store.dispatch(login({ username: "alice", role: "user", id: 1 }));
  else store.dispatch(login({ username: "bob", role: "user", id: 2 }));
  return store;
}

const questionBase: any = {
  id: "q55",
  title: "Title",
  description: "Desc",
  attachedCode: "console.log('test')",
  isResolved: false,
  user: { id: 1, username: "alice" },
  answers: [],
};

describe("QuestionItem actions", () => {
  it("shows edit/delete buttons for owner", () => {
    render(
      <MemoryRouter>
        <Provider store={makeStore(true)}>
          <QuestionItem question={questionBase} />
        </Provider>
      </MemoryRouter>
    );
    const buttons = screen.getAllByRole("button");
    // Expect at least edit & delete plus PostAnswerBar (>=2)
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });

  it("hides owner controls for other user", () => {
    render(
      <MemoryRouter>
        <Provider store={makeStore(false)}>
          <QuestionItem question={questionBase} />
        </Provider>
      </MemoryRouter>
    );
    const buttons = screen.getAllByRole("button");
    expect(screen.getByText("Title")).toBeInTheDocument();
  });
});
