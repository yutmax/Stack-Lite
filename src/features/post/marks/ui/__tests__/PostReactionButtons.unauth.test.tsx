import "@testing-library/jest-dom/vitest";
import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PostReactionButtons from "../PostReactionButtons";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../../../../../entities/user/model/slice";
import * as markPostModule from "../../model/markPost";
import { MemoryRouter } from "react-router-dom";

const navigateSpy = vi.fn();
vi.mock("react-router-dom", async (orig) => {
  const actual: any = await orig();
  return { ...actual, useNavigate: () => navigateSpy };
});

vi.spyOn(markPostModule, "markPost").mockImplementation(async () => {
  throw new Error("Server error");
});

function makeStoreAuth(isAuth: boolean) {
  const store = configureStore({
    reducer: { user: userReducer },
    preloadedState: { user: { isAuth, username: isAuth ? "u" : null, role: isAuth ? "user" : null, id: isAuth ? 5 : null } },
  } as any);
  return store;
}

describe("PostReactionButtons unauthorized", () => {
  it("redirects to login when not authenticated", () => {
    render(
      <MemoryRouter>
        <Provider store={makeStoreAuth(false)}>
          <PostReactionButtons postId="10" marks={[]} />
        </Provider>
      </MemoryRouter>
    );
    const [likeBtn] = screen.getAllByRole("button");
    fireEvent.click(likeBtn);
    expect(navigateSpy).toHaveBeenCalledWith("/login");
  });

  it("does not break on markPost failure (auth user)", () => {
    render(
      <MemoryRouter>
        <Provider store={makeStoreAuth(true)}>
          <PostReactionButtons postId="10" marks={[]} />
        </Provider>
      </MemoryRouter>
    );
    const [likeBtn] = screen.getAllByRole("button");
    fireEvent.click(likeBtn);
    expect(likeBtn).toHaveTextContent("1");
  });
});
