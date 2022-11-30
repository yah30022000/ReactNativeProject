

// Normal Sign Up via AWS Cognito
// !!!!!!!! don't use try catch block inside async function, will make thunkAPI fail to work properly
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserRegisterRequest } from "../../../helper";
import { ISignUpResult } from "amazon-cognito-identity-js";
import { Auth as AmplifyAuth } from "@aws-amplify/auth/lib-esm/Auth";
import { UserState } from "../userSlice";

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
