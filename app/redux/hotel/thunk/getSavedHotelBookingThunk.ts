import { HotelBookingsPaymentCard } from './../../../helper/amadeus/hotel-booking-request-response';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { DataStore as AmplifyDatastore } from "aws-amplify";

import { HotelBookingDataModelBefore } from "../../../helper";
import { LazyHotelBooking, HotelBooking } from '../../../../src/models';

export const getSavedHotelBookingThunk = createAsyncThunk<LazyHotelBooking, string>(
    "hotel/getSavedHotelBooking",
    async (
      bookingId: string,
      thunkAPI,
    ) => {
  
        // Predicate: eq ==, ne !=, le <=, lt <, ge >=, gt >
        // contains where id in (...)
      let queryHotelBooking = await AmplifyDatastore.query(HotelBooking, bookingId);
      console.log("getSavedHotelBooking queryHotelBooking: ", queryHotelBooking);
  
      if (!queryHotelBooking) {
        return thunkAPI.rejectWithValue(queryHotelBooking);
      }


      return queryHotelBooking;
    },
  );
  