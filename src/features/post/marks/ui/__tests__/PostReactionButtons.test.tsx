import "@testing-library/jest-dom/vitest";
import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PostReactionButtons from "../PostReactionButtons";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer, { login } from "../../../../../entities/user/model/slice";
import * as markPostModule from "../../model/markPost";
import { MemoryRouter } from "react-router-dom";

vi.spyOn(markPostModule, "markPost").mockResolvedValue(undefined as any);

function makeStore(auth = true) {
  const store = configureStore({ reducer: { user: userReducer } });
  if (auth) {
    store.dispatch(login({ username: "alice", role: "user", id: 1 }));
  }
  return store;
}

describe("PostReactionButtons", () => {
  it("shows initial like/dislike counts", () => {
    const store = makeStore();
    render(
      <MemoryRouter>
        <Provider store={store}>
          <PostReactionButtons postId="1" marks={[{ id: 1, type: "like", user: { id: 2, username: "bob" } } as any, { id: 2, type: "dislike", user: { id: 3, username: "carol" } } as any]} />
        </Provider>
      </MemoryRouter>
    );
    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toHaveTextContent("1");
    expect(buttons[1]).toHaveTextContent("1");
  });

  it("toggles like when clicked", async () => {
    const store = makeStore();
    render(
      <MemoryRouter>
        <Provider store={store}>
          <PostReactionButtons postId="1" marks={[]} />
        </Provider>
      </MemoryRouter>
    );
    const [likeBtn] = screen.getAllByRole("button");
    expect(likeBtn).toHaveTextContent("0");
    fireEvent.click(likeBtn);
    expect(likeBtn).toHaveTextContent("1");
    fireEvent.click(likeBtn);
    expect(likeBtn).toHaveTextContent("0");
  });
});
