// Define a type for the slice state
import { HotelListRequest, HotelListResponse } from "../../helper/amadeus/hotel-list-request-response";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import QueryString from "qs";
import { GetAccessTokenRequest, GetAccessTokenResponse } from "../../helper/amadeus";

let amadeusTestApiUrl = "https://test.api.amadeus.com";

export interface HotelState {
  accessToken?: string;
  hotelListRequest?: HotelListRequest;
  hotelListResponse?: HotelListResponse;
}


// Define the initial state using that type
const initialState: HotelState = {};

export const getAmadeusAccessToken = createAsyncThunk<GetAccessTokenResponse, GetAccessTokenRequest>(
  "hotel/getAmadeusAccessToken",
  async (requestBody: GetAccessTokenRequest, thunkAPI) => {

    console.log("getAccessToken before: ", requestBody);

    const response = await fetch(`${amadeusTestApiUrl}/v1/security/oauth2/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: QueryString.stringify(requestBody)
      })
    if (response.status < 200 || response.status >= 300) {
      return thunkAPI.rejectWithValue((await response.json()));
    }

    let data: GetAccessTokenResponse = await response.json()

    console.log("getAccessToken after: ", data);
    return data;
  },
);


export const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    chooseCityCode: (state,action: PayloadAction<string>) => {
      if(!state.hotelListRequest){
        state.hotelListRequest = {cityCode: action.payload}
      }else{
        state.hotelListRequest.cityCode = action.payload
      }
      console.log('chooseCityCode: ', state.hotelListRequest);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAmadeusAccessToken.fulfilled, (state, action) => {
      state.accessToken = action.payload.access_token;
    });
    builder.addCase(getAmadeusAccessToken.rejected, (state, action) => {
      state.accessToken = "";
    });
  },
});

export const { chooseCityCode } = hotelSlice.actions;


// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default hotelSlice.reducer;


