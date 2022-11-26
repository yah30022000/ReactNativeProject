import { HotelListRequest, HotelListResponse } from "../../helper/amadeus";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { API as AmplifyAPI } from "aws-amplify";

export interface HotelState {
  // accessToken?: string;
  hotelListRequest?: HotelListRequest;
  hotelListResponse?: HotelListResponse;
  hotelListSearching: "loading" | "completed" | "failed" | "none"
  addPaymentResult?: {
    cardholdername: string,
    cardnumber: number,
    exp_date: number,
    cvv: number,
  };
  addPaymentError?: {
    cardholdername?: string,
    cardnumber?: number,
    exp_date?: number,
    cvv: number, 
  }
  addPayment: "loading" | "completed" | "failed" | "none";
}


// Define the initial state using that type
const initialState: HotelState = {
  hotelListSearching: "none",
  addPayment: "none"
};

// let amadeusTestApiUrl = "https://test.api.amadeus.com";

// export const getAmadeusAccessToken = createAsyncThunk<GetAccessTokenResponse, GetAccessTokenRequest>(
//   "hotel/getAmadeusAccessToken",
//   async (requestBody: GetAccessTokenRequest, thunkAPI) => {
//
//     console.log("getAccessToken before: ", requestBody);
//
//     const response = await fetch(`${amadeusTestApiUrl}/v1/security/oauth2/token`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded"
//         },
//         body: QueryString.stringify(requestBody)
//       })
//     if (response.status < 200 || response.status >= 300) {
//       return thunkAPI.rejectWithValue((await response.json()));
//     }
//
//     let data: GetAccessTokenResponse = await response.json();
//
//     console.log("getAccessToken after: ", data);
//     return data;
//   },
// );

export const getAmadeusHotelListThunk = createAsyncThunk<HotelListResponse, HotelListRequest>(
  "hotel/getAmadeusHotelList",
  async (requestBody: HotelListRequest, thunkAPI) => {

    console.log("getAmadeusHotelList request body: ", requestBody);

    let apiName = "amadeusAPI";
    const path = "/amadeus/hotel-list";
    const option = {
      headers: {}, // OPTIONAL
      // response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
      queryStringParameters: requestBody,
    };

    let response: HotelListResponse = await AmplifyAPI.get(apiName, path, option);

    if (response.status < 200 || response.status >= 300) {
      return thunkAPI.rejectWithValue(response);
    }
    console.log("getAmadeusHotelList after: ", response.data.length);
    return response;
  },
);

export const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    chooseCityCode: (state, action: PayloadAction<string>) => {
      if (!state.hotelListRequest) {
        state.hotelListRequest = { cityCode: action.payload };
      } else {
        state.hotelListRequest.cityCode = action.payload;
      }
      console.log("chooseCityCode: ", state.hotelListRequest);
    },
    selectRating: (state, action: PayloadAction<number>) => {
      if (!state.hotelListRequest) {
        state.hotelListRequest = {
          cityCode: "HKG",
          ratings: Array.from([action.payload]),
        };
      } else {
        state.hotelListRequest.ratings = Array.from([action.payload]);
      }
      console.log("selectedRating: ", state.hotelListRequest);
    },
    changeHotelSearching: (state, action: PayloadAction<HotelState["hotelListSearching"]>) => {
      state.hotelListSearching = action.payload
    },
  },
    extraReducers: (builder) => {
      // builder.addCase(getAmadeusAccessToken.fulfilled, (state, action) => {
      //   state.accessToken = action.payload.access_token;
      // });
      // builder.addCase(getAmadeusAccessToken.rejected, (state, action) => {
      //   state.accessToken = "";
      // });
      builder.addCase(getAmadeusHotelListThunk.pending, (state, action) => {
        state.hotelListSearching = "loading";
      });
      builder.addCase(getAmadeusHotelListThunk.fulfilled, (state, action) => {
        state.hotelListResponse = action.payload;
        state.hotelListSearching = "completed";
      });
      builder.addCase(getAmadeusHotelListThunk.rejected, (state, action) => {
        console.error("getAmadeusHotelList redux error, no data input");
        state.hotelListSearching = "failed";
      });
    },
  })
;

export const { chooseCityCode, selectRating, changeHotelSearching } = hotelSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default hotelSlice.reducer;
