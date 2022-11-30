import { createAsyncThunk } from "@reduxjs/toolkit";
import { Auth as AmplifyAuth } from "@aws-amplify/auth/lib-esm/Auth";
import { UserState } from "../userSlice";


export const getCurrentAuthenticatedUserThunk = createAsyncThunk<UserState["signInResult"], undefined>(
  "user/getCurrentAuthenticatedUser",
  async (_: undefined, thunkAPI) => {
    let userData = await AmplifyAuth.currentAuthenticatedUser();
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
  },
);
