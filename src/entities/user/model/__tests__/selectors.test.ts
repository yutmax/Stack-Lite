import { describe, it, expect } from "vitest";
import { selectUser, selectIsAuth } from "../selectors";

const mockState: any = {
  user: { id: 10, username: "bob", isAuth: true },
};

describe("user selectors", () => {
  it("selectUser returns user slice", () => {
    expect(selectUser(mockState)).toEqual(mockState.user);
  });
  it("selectIsAuth returns auth flag", () => {
    expect(selectIsAuth(mockState)).toBe(true);
  });
});
