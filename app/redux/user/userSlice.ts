import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CognitoUser } from "amazon-cognito-identity-js";
import { Auth as AmplifyAuth } from "aws-amplify";


// Define a type for the slice state
export interface UserState {
  isLoggedIn: boolean;
}

// Define the initial state using that type
const initialState: UserState = {
  isLoggedIn: false,
};

// Normal Sign Up via AWS Cognito
export const registerThunk = createAsyncThunk<any, any>(
  "user/register",
  async (requestBody: any, thunkAPI) => {

    console.log("registerThunk request body: ", requestBody);
    try {
      // const user = await AmplifyAuth.signUp(
      //
      // )

      // return user
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
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // }

  },
});

export const { login, logout } = userSlice.actions;


// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default userSlice.reducer;
