import { describe, it, expect } from "vitest";
import reducer, { login, logout } from "../slice";

describe("user slice", () => {
  it("should return initial state", () => {
    const state = reducer(undefined, { type: "unknown" });
    expect(state).toEqual({ isAuth: false, username: null, role: null, id: null });
  });

  it("should handle login", () => {
    const state = reducer(undefined, login({ username: "alice", role: "admin", id: 1 }));
    expect(state).toEqual({ isAuth: true, username: "alice", role: "admin", id: 1 });
  });

  it("should handle logout", () => {
    const loggedIn = reducer(undefined, login({ username: "bob", role: "user", id: 2 }));
    const state = reducer(loggedIn, logout());
    expect(state).toEqual({ isAuth: false, username: null, role: null, id: null });
  });
});
