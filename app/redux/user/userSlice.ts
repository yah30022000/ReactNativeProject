import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CodeDeliveryDetails, ISignUpResult } from "amazon-cognito-identity-js";
import { Auth as AmplifyAuth } from "aws-amplify";
import { UserRegisterRequest } from "../../helper/user/user-register-request-response";
import { ConfirmRegisterRequest } from "../../helper/user/confirm-register-request-response";


// Define a type for the slice state
export interface UserState {
  isLoggedIn: boolean;
  signUpResult?: {
    codeDeliveryDetails: CodeDeliveryDetails,
    userConfirmed: boolean,
    userSub: string,
    username: string,
  };
  signUpError?: {
    code?: string,
    name?: string,
    message?: string
    username?: string
  };
  signingUp: "loading" | "completed" | "failed" | "none";
  userConfirmed: boolean // in case not following normal sign up process
}

// Define the initial state using that type
const initialState: UserState = {
  isLoggedIn: false,
  signingUp: "none",
  userConfirmed: false
};

// Normal Sign Up via AWS Cognito
// !!!!!!!! don't use try catch block inside async function, will make thunkAPI fail to work properly
export const registerThunk = createAsyncThunk<UserState["signUpResult"], UserRegisterRequest>(
  "user/register",
  async (requestBody: UserRegisterRequest, thunkAPI) => {

    console.log("registerThunk request body: ", requestBody);
    const response: ISignUpResult = await AmplifyAuth.signUp({
      username: requestBody.email,
      password: requestBody.password,
      attributes: {
        email: requestBody.email,
        name: requestBody.name,
      },
      autoSignIn: {
        // TODO: turn to true
        enabled: true,
      },
    });
    if (!response) {
      return thunkAPI.rejectWithValue(response);
    }
    let payload = {
      codeDeliveryDetails: response.codeDeliveryDetails,
      userConfirmed: response.userConfirmed,
      userSub: response.userSub,
      username: response.user.getUsername(),
      // authenticationFlowType: response.user.getAuthenticationFlowType(),
    };

    return payload;
  },
);

export const resendVerifyCodeThunk = createAsyncThunk<any, string>(
  "user/resendVerifyCode",
  async (requestBody: string, thunkAPI) => {
    console.log("resendVerifyCodeThunk request body: ", requestBody);
    const response: any = await AmplifyAuth.resendSignUp(requestBody);
    if (!response) {
      return thunkAPI.rejectWithValue(response);
    }
    return response;
  });

export const confirmRegisterThunk = createAsyncThunk<any, ConfirmRegisterRequest>(
  "user/confirmRegister",
  async (requestBody: ConfirmRegisterRequest, thunkAPI) => {
    console.log("confirmRegisterThunk request body: ", requestBody);
    const response: any = await AmplifyAuth.confirmSignUp(requestBody.username, requestBody.code)
    if (!response) {
      return thunkAPI.rejectWithValue(response);
    }
    return response;
  });

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

    // registerThunk
    builder.addCase(registerThunk.pending, (state, action) => {
      state.signingUp = "loading";
    });
    builder.addCase(registerThunk.fulfilled, (state, action) => {
      state.signingUp = "completed";
      state.signUpResult = action.payload;
      console.log("registerThunk completed: ", action.payload)
    });
    builder.addCase(registerThunk.rejected, (state, action) => {
      state.signingUp = "failed";
      state.signUpError = {
        code: action.error.code,
        name: action.error.name,
        message: action.error.message,
        username: action.meta.arg.email,
      };
      console.log("signUpResult failed username: ", action.meta.arg.email, "code: ", action.error.code, " message: ", action.error.message);
    });

    // resendVerifyCodeThunk
    builder.addCase(resendVerifyCodeThunk.fulfilled, (state, action) => {
      console.log("resendVerifyCodeThunk completed: ", action.payload);
      if(state.signUpResult){
        state.signUpResult = {...state.signUpResult, userConfirmed: true}
      }
      state.userConfirmed = true
    });
    builder.addCase(resendVerifyCodeThunk.rejected, (state, action) => {
      console.log("resendVerifyCodeThunk failed: ", action.error.message);
    });

    // confirmRegisterThunk
    builder.addCase(confirmRegisterThunk.fulfilled, (state, action) => {
      console.log("confirmRegisterThunk completed: ", action.payload);
    });
    builder.addCase(confirmRegisterThunk.rejected, (state, action) => {
      console.log("confirmRegisterThunk failed: ", action.error.message);
    });
  },
});

export const { login, logout } = userSlice.actions;


// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default userSlice.reducer;

