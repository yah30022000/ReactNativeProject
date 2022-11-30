import { createAsyncThunk } from "@reduxjs/toolkit";
import { CognitoUser } from "amazon-cognito-identity-js";
import { Auth as AmplifyAuth } from "@aws-amplify/auth/lib-esm/Auth";


export const logoutThunk = createAsyncThunk<any, undefined>(
  "user/logout",
  async (_: undefined, thunkAPI) => {
    const userData: CognitoUser | any = await AmplifyAuth.signOut();
    // always undefined data
    if (!userData) {
      return thunkAPI.rejectWithValue(userData);
    }
    return userData;
  },
)
