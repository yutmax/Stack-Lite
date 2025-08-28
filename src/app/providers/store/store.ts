import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../../../entities/user/model/slice";
import postsReducer from "../../../entities/post/model/slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
