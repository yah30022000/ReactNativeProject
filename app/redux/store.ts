import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import hotelReducer from "./hotel/hotelSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    hotel: hotelReducer,
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
// >> for useSelector()
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// >> for action, change something state
export type AppDispatch = typeof store.dispatch
