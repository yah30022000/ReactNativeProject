import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import hotelReducer from "./hotel/hotelSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    hotel: hotelReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
