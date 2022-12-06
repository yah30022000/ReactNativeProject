import { createAsyncThunk } from "@reduxjs/toolkit";
import { DataStore as AmplifyDatastore } from "aws-amplify";
import { HotelBooking } from "../../../../src/models";

export const getAllSavedHotelBookingByUsernameThunk = createAsyncThunk<Array<HotelBooking>, string>(
  "hotel/getAllSavedHotelBookingByUsername",
  async (
    username: string,
    thunkAPI,
  ) => {

    // Predicate: eq ==, ne !=, le <=, lt <, ge >=, gt >
    // contains where id in (...)
    let queryHotelBookingList = await AmplifyDatastore.query(HotelBooking,
      (condition) => condition.username.eq(username),
    );
    console.log("getAllSavedHotelBookingByUsernameThunk queryHotelBookingList: ", queryHotelBookingList);

    if (!queryHotelBookingList) {
      return thunkAPI.rejectWithValue(queryHotelBookingList);
    }

    return queryHotelBookingList;
  },
);
