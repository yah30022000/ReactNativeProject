import { createAsyncThunk } from "@reduxjs/toolkit";
import { HotelListRequest, HotelListResponse } from "../../../helper";
import { API as AmplifyAPI } from "aws-amplify";


export const getAmadeusHotelListThunk = createAsyncThunk<HotelListResponse, HotelListRequest>(
  "hotel/getAmadeusHotelList",
  async (queryParams: HotelListRequest, thunkAPI) => {

    console.log("getAmadeusHotelListThunk request body: ", queryParams);

    let apiName = "amadeusAPI";
    const path = "/amadeus/hotel-list";
    const option = {
      headers: {}, // OPTIONAL
      // response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
      queryStringParameters: queryParams,
    };

    let response: HotelListResponse = await AmplifyAPI.get(apiName, path, option);

    if (response.status < 200 || response.status >= 300) {
      return thunkAPI.rejectWithValue(response);
    }
    console.log("getAmadeusHotelListThunk data length: ", response.data.length);
    return response;
  },
);
