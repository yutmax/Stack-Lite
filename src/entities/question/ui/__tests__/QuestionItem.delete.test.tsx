import "@testing-library/jest-dom/vitest";
import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer, { login } from "../../../user/model/slice";

const mockDelete = vi.fn();
vi.mock("../../../../features/question/model/deleteQuestion", () => ({
  deleteQuestion: (...args: any[]) => mockDelete(...args),
}));

// mock useAnswers again to keep test isolated
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

import QuestionItem from "../QuestionItem";

function makeStore() {
  const store = configureStore({ reducer: { user: userReducer } });
  store.dispatch(login({ username: "alice", role: "user", id: 1 }));
  return store;
}

const question: any = {
  id: "dq1",
  title: "ToDelete",
  description: "Desc",
  attachedCode: "",
  isResolved: false,
  user: { id: 1, username: "alice" },
  answers: [],
};

describe("QuestionItem delete", () => {
  beforeEach(() => {
    mockDelete.mockReset();
  });
  it("shows success message on successful delete", async () => {
    mockDelete.mockResolvedValueOnce({ success: true });
    render(
      <MemoryRouter>
        <Provider store={makeStore()}>
          <QuestionItem question={question} />
        </Provider>
      </MemoryRouter>
    );
    // click the icon that has the DeleteIcon test id
    const deleteIcon = screen.getByTestId("DeleteIcon");
    fireEvent.click(deleteIcon.closest("button")!);
    await waitFor(() => expect(mockDelete).toHaveBeenCalledTimes(1));
    expect(await screen.findByText(/deleted successfully/i)).toBeInTheDocument();
  });

  it("shows error message on failure", async () => {
    mockDelete.mockResolvedValueOnce({ success: false, error: "Boom" });
    render(
      <MemoryRouter>
        <Provider store={makeStore()}>
          <QuestionItem question={question} />
        </Provider>
      </MemoryRouter>
    );
    const deleteIcon = screen.getByTestId("DeleteIcon");
    fireEvent.click(deleteIcon.closest("button")!);
    await waitFor(() => expect(mockDelete).toHaveBeenCalledTimes(1));
    expect(await screen.findByText(/Boom/)).toBeInTheDocument();
  });
});
