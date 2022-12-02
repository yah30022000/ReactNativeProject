import { CaseReducer } from "@reduxjs/toolkit";
import { UserState } from "../userSlice";


export const logoutAction: CaseReducer<UserState> = (state) => {
  state.isLoggedIn = false;
  state.allowRegisterVerify = false;
  state.userConfirmed = false;
  state.signUpResult = undefined;
  state.signInResult = undefined;
  state.signUpError = undefined;
  state.signingUp = "none";
  state.signingIn = "none";
  state.userConfirming = "none";
}
