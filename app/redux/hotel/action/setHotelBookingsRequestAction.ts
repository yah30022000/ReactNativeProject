import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { HotelState } from "../hotelSlice";
import { HotelBookingsRequest } from "../../../helper";


export const setHotelBookingsRequestAction: CaseReducer<HotelState, PayloadAction<HotelBookingsRequest>> = (state, action) => {
  state.hotelBookingRequest = action.payload;
  state.hotelBookingStatus = "loading";
  console.log("setHotelBookingsRequest: ", state.hotelBookingRequest);
};
