import { createAsyncThunk } from "@reduxjs/toolkit";
import { API as AmplifyAPI } from "aws-amplify";
import { HotelBookingsRequest, HotelBookingsResponse } from "../../../helper";


export const amadeusHotelBookingThunk = createAsyncThunk<HotelBookingsResponse, HotelBookingsRequest>(
  "hotel/amadeusHotelBooking",
  async (requestBody: HotelBookingsRequest, thunkAPI) => {

    console.log("amadeusHotelBookingThunk request body offerId: ", requestBody.data.offerId);
    console.log("amadeusHotelBookingThunk request body guest: ", requestBody.data.guests);
    console.log("amadeusHotelBookingThunk request body payments: ", requestBody.data.payments);

    let apiName = "amadeusAPI";
    const path = "/amadeus/hotel-bookings";
    const option = {
      headers: {}, // OPTIONAL
      // response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
      body: requestBody,
    };

    let response: HotelBookingsResponse = await AmplifyAPI.post(apiName, path, option);

    if (response.status < 200 || response.status >= 300) {
      return thunkAPI.rejectWithValue(response);
    }

    console.log("amadeusHotelBookingThunk data length: ", response.data);

    return response;
  },
);
