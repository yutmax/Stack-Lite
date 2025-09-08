import "@testing-library/jest-dom/vitest";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AnswerItem from "../AnswerItem";
import { Provider } from "react-redux";
import { store } from "../../../../app/providers/store/store";

const baseAnswer: any = {
  id: 5,
  content: "Initial answer",
  isCorrect: false,
  user: { id: 1, username: "alice" },
};

describe("AnswerItem", () => {
  it("renders answer content and author", () => {
    render(
      <Provider store={store}>
        <AnswerItem answer={baseAnswer} deleteAnswer={vi.fn()} editAnswer={vi.fn()} />
      </Provider>
    );
    expect(screen.getByText(/Initial answer/)).toBeInTheDocument();
    expect(screen.getByText(/Answered by:/)).toBeInTheDocument();
    expect(screen.getByText(/alice/)).toBeInTheDocument();
  });
});
