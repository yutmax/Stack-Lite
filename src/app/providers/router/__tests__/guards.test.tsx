import "@testing-library/jest-dom/vitest";
import React from "react";
import { describe, it, expect } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../../../../entities/user/model/slice";
import { AuthGuard, GuestGuard } from "../guards";
import { render, screen } from "@testing-library/react";

function makeStore(isAuth: boolean) {
  return configureStore({
    reducer: { user: userReducer },
    preloadedState: { user: { isAuth, username: isAuth ? "u" : null, role: isAuth ? "user" : null, id: isAuth ? 1 : null } },
  } as any);
}

describe("Route Guards", () => {
  it("AuthGuard redirects unauthenticated to /login", () => {
    render(
      <Provider store={makeStore(false)}>
        <MemoryRouter initialEntries={["/private"]}>
          <Routes>
            <Route element={<AuthGuard />}>
              <Route path="/private" element={<div>Private</div>} />
            </Route>
            <Route path="/login" element={<div>LoginPage</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/LoginPage/)).toBeInTheDocument();
  });

  it("GuestGuard redirects authenticated to /", () => {
    render(
      <Provider store={makeStore(true)}>
        <MemoryRouter initialEntries={["/register"]}>
          <Routes>
            <Route element={<GuestGuard />}>
              <Route path="/register" element={<div>RegisterPage</div>} />
            </Route>
            <Route path="/" element={<div>HomePage</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/HomePage/)).toBeInTheDocument();
  });
});
