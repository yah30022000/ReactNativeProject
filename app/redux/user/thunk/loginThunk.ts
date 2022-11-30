import { createAsyncThunk } from "@reduxjs/toolkit";
import { CognitoUser } from "amazon-cognito-identity-js";
import { Auth as AmplifyAuth } from "@aws-amplify/auth/lib-esm/Auth";
import { UserState } from "../userSlice";


export const loginThunk = createAsyncThunk<UserState["signInResult"], any>(
  "user/login",
  async (requestBody: any, thunkAPI) => {
    console.log("loginThunk request body: ", requestBody);
    const userData: CognitoUser | any = await AmplifyAuth.signIn({
      username: requestBody.email,
      password: requestBody.password,
    });
    if (!userData) {
      return thunkAPI.rejectWithValue(userData);
    }
    let authProvider = null;
    if(userData.attributes.identities){
      authProvider = JSON.parse(userData.attributes.identities)[0]["providerName"]
    }

    return {
      email: userData.attributes.email,
      emailVerified: userData.attributes.email_verified,
      authProvider: authProvider,
      username: userData.username,
      name: userData.attributes.name,
    };
  }
)
