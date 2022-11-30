import { createSlice } from "@reduxjs/toolkit";
import { CodeDeliveryDetails } from "amazon-cognito-identity-js";
import { loginAction } from "./action/loginAction";
import { logoutAction } from "./action/logoutAction";
import { getCurrentAuthenticatedUserThunk } from "./thunk/getCurrentAuthenticatedUserThunk";
import { resendVerifyCodeThunk } from "./thunk/resendVerifyCodeThunk";
import { loginThunk } from "./thunk/loginThunk";
import { confirmRegisterThunk } from "./thunk/confirmRegisterThunk";
import { registerThunk } from "./thunk/registerThunk";


// Define a type for the slice state
export interface UserState {
  isLoggedIn: boolean;
  signInResult?: {
    email: string,
    emailVerified: boolean,
    username: string
    name: string
    authProvider: string | null
    // accessToken?: string
  };
  signInError?: {
    code?: string,
    name?: string,
    message?: string
    username?: string
  };
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
  signingIn: "loading" | "completed" | "failed" | "none";
  userConfirmed: boolean; // in case not following normal sign up process
  allowRegisterVerify: boolean;
};

// Define the initial state using that type
const initialState: UserState = {
  isLoggedIn: false,
  signingUp: "none",
  signingIn: "none",
  userConfirmed: false,
  allowRegisterVerify: false,
};


export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    login: loginAction,
    logout: logoutAction,
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
      // console.log('registerThunk failed: ', action)
      console.log("registerThunk failed username: ", action.meta.arg.email, "code: ", action.error.code, " message: ", action.error.message);
    });

    // resendVerifyCodeThunk
    builder.addCase(resendVerifyCodeThunk.fulfilled, (state, action) => {
      console.log("resendVerifyCodeThunk completed: ", action.payload);
    });
    builder.addCase(resendVerifyCodeThunk.rejected, (state, action) => {
      // console.log("resendVerifyCodeThunk failed: ", action);
      console.log("resendVerifyCodeThunk failed: ", action.error.message);
      if (action.error.message != "User is already confirmed.") {
        state.allowRegisterVerify = true;
      } else {
        state.allowRegisterVerify = false;
        state.signUpError = {
          code: action.error.code,
          name: action.error.name,
          message: "User is already confirmed, please try 'Forgot Password'",
        };
      }
    });

    // confirmRegisterThunk
    builder.addCase(confirmRegisterThunk.fulfilled, (state, action) => {
      console.log("confirmRegisterThunk completed: ", action.payload);
      if (state.signUpResult) {
        state.signUpResult = { ...state.signUpResult, userConfirmed: true };
      }
      state.userConfirmed = true;
    });
    builder.addCase(confirmRegisterThunk.rejected, (state, action) => {
      console.log("confirmRegisterThunk failed: ", action.error.message);
    });

    // loginThunk
    builder.addCase(loginThunk.pending, (state, action) => {
      state.signingIn = "loading";
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.signingIn = "completed";
      // state.signUpResult = action.payload;
      console.log("loginThunk completed: ", action.payload)
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.signingIn = "failed";
      state.signInError = {
        code: action.error.code,
        name: action.error.name,
        message: action.error.message,
        username: action.meta.arg.email,
      };
      console.log('loginThunk failed: ', action)
      console.log("loginThunk failed username: ", action.meta.arg.email, "code: ", action.error.code, " message: ", action.error.message);
      console.log("loginThunk failed:", action.error)
    });

    // logoutThunk
    // builder.addCase(logoutThunk.fulfilled, (state, action) => {
    //   state.isLoggedIn = false;
    //   state.allowRegisterVerify = false;
    //   state.userConfirmed = false;
    //   state.signUpResult = undefined;
    //   state.signInResult = undefined;
    //   state.signUpError = undefined;
    //   state.signingUp = "none";
    //   state.signingIn = "none";
    //   console.log("logoutThunk completed: ", action.payload)
    // });
    // builder.addCase(logoutThunk.rejected, (state, action) => {
    //   console.log("logoutThunk failed:", action.error)
    // });

    // getCurrentAuthenticatedUserThunk
    builder.addCase(getCurrentAuthenticatedUserThunk.fulfilled, (state, action) => {
      console.log("getCurrentAuthenticatedUserThunk completed: ", action.payload);
      state.signInResult = action.payload;
      state.isLoggedIn = true;
    });
    builder.addCase(getCurrentAuthenticatedUserThunk.rejected, (state, action) => {
      console.log("getCurrentAuthenticatedUserThunk failed: ", action.error.message);
    });
  },
});


export const { login, logout } = userSlice.actions;


// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default userSlice.reducer;

