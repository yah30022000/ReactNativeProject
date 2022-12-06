import { createAsyncThunk } from "@reduxjs/toolkit";
import { ConfirmRegisterRequest } from "../../../helper";
import { Auth as AmplifyAuth } from "@aws-amplify/auth/lib-esm/Auth";


export const confirmRegisterThunk = createAsyncThunk<any, ConfirmRegisterRequest>(
  "user/confirmRegister",
  async (requestBody: ConfirmRegisterRequest, thunkAPI) => {
    console.log("confirmRegisterThunk request body: ", requestBody);
    const response: any = await AmplifyAuth.confirmSignUp(requestBody.username, requestBody.code);
    if (!response) {
      return thunkAPI.rejectWithValue(response);
    }
    return response;
  },
);
