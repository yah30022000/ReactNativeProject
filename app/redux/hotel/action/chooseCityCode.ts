import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { HotelState } from "../hotelSlice";

export const chooseCityCodeAction: CaseReducer<HotelState, PayloadAction<string>> = (state, action) => {
  if (!state.hotelListAndOffersRequest) {
    state.hotelListAndOffersRequest = { cityCode: action.payload, adults: 2 };
  } else {
    state.hotelListAndOffersRequest.cityCode = action.payload;
  }
  console.log("chooseCityCodeAction: ", state.hotelListAndOffersRequest);
};
