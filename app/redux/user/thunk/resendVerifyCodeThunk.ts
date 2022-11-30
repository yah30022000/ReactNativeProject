import { createAsyncThunk } from "@reduxjs/toolkit";
import { Auth as AmplifyAuth } from "@aws-amplify/auth/lib-esm/Auth";


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
