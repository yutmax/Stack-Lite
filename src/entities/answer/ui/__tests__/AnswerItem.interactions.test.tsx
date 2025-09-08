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
  store.dispatch(login({ username: "alice", role: "user", id: 1 }));
  return store;
}

describe("AnswerItem interactions", () => {
  it("allows editing and saving", () => {
    const editAnswer = vi.fn();
    const deleteAnswer = vi.fn();
    const answer: any = { id: 7, content: "Original", user: { id: 1, username: "alice" }, isCorrect: false };

    render(
      <Provider store={makeStore()}>
        <AnswerItem answer={answer} editAnswer={editAnswer} deleteAnswer={deleteAnswer} />
      </Provider>
    );

    // first button is edit toggle
    const editToggle = screen.getAllByRole("button")[0];
    fireEvent.click(editToggle);
    const input = screen.getByDisplayValue("Original");
    fireEvent.change(input, { target: { value: "Changed" } });
    const saveBtn = screen.getByRole("button", { name: /save/i });
    fireEvent.click(saveBtn);
    expect(editAnswer).toHaveBeenCalledWith(7, "Changed");
  });

  it("calls delete callback", () => {
    const editAnswer = vi.fn();
    const deleteAnswer = vi.fn();
    const answer: any = { id: 8, content: "ToDelete", user: { id: 1, username: "alice" }, isCorrect: false };

    render(
      <Provider store={makeStore()}>
        <AnswerItem answer={answer} editAnswer={editAnswer} deleteAnswer={deleteAnswer} />
      </Provider>
    );

    // buttons: [edit, delete]
    const buttons = screen.getAllByRole("button");
    const deleteBtn = buttons[buttons.length - 1];
    fireEvent.click(deleteBtn);
    expect(deleteAnswer).toHaveBeenCalledWith(8);
  });
});
