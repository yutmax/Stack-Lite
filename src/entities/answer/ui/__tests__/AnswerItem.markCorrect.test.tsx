import "@testing-library/jest-dom/vitest";
import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import AnswerItem from "../AnswerItem";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer, { login } from "../../../user/model/slice";

function makeStore() {
  const store = configureStore({ reducer: { user: userReducer } });
  store.dispatch(login({ username: "owner", role: "user", id: 1 }));
  return store;
}

describe("AnswerItem mark correct", () => {
  it("marks and unmarks answer as correct", () => {
    const markAsCorrect = vi.fn();
    const answer: any = { id: 11, content: "Answer", user: { id: 1, username: "owner" }, isCorrect: false };

    render(
      <Provider store={makeStore()}>
        <AnswerItem answer={answer} editAnswer={vi.fn()} deleteAnswer={vi.fn()} markAsCorrect={markAsCorrect} isOwner />
      </Provider>
    );

    const toggleBtn = screen.getByRole("button", { name: /mark as correct/i });
    fireEvent.click(toggleBtn);
    expect(markAsCorrect).toHaveBeenCalledWith(11, "correct");
  });
});
