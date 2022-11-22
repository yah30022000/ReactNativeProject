import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ISignUpResult } from "amazon-cognito-identity-js";
import { Auth as AmplifyAuth } from "aws-amplify";
import { UserRegisterRequest } from "../../helper/user/user-register-request-response";


// Define a type for the slice state
export interface UserState {
  isLoggedIn: boolean;
}

// Define the initial state using that type
const initialState: UserState = {
  isLoggedIn: false,
};

// Normal Sign Up via AWS Cognito
export const registerThunk = createAsyncThunk<any, UserRegisterRequest>(
  "user/register",
  async (requestBody: UserRegisterRequest, thunkAPI) => {

    console.log("registerThunk request body: ", requestBody);
    try {
      const response: ISignUpResult = await AmplifyAuth.signUp({
        username: requestBody.email,
        password: requestBody.password,
        attributes: {
          email: requestBody.email,
          name: requestBody.name,
        },
        autoSignIn: {
          // TODO: turn to true
          enabled: false,
        },
      });
      // console.log("registerThunk response: ", response);
      return response;
    } catch (error) {
      console.log('error signing in', error);
    }
  },
);

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {

    builder.addCase(registerThunk.pending, (state, action) => {
      console.log("registerThunk extraReducers pending");
    });
    builder.addCase(registerThunk.fulfilled, (state, action) => {
      console.log("registerThunk extraReducers fulfilled: ", action.payload);
    });
    builder.addCase(registerThunk.rejected, (state, action) => {
      console.error("registerThunk extraReducers rejected");
    });
  },
});

export const { login, logout } = userSlice.actions;


// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default userSlice.reducer;
