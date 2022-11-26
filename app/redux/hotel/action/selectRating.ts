import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { HotelState } from "../hotelSlice";


export const selectRatingAction: CaseReducer<HotelState, PayloadAction<number>> = (state, action) => {
  if (!state.hotelListAndOffersRequest) {
    state.hotelListAndOffersRequest = {
      cityCode: "HKG",
      ratings: Array.from([action.payload]),
      adults: 2
    };
  } else {
    state.hotelListAndOffersRequest.ratings = Array.from([action.payload]);
  }
  console.log("selectedRatingAction: ", state.hotelListAndOffersRequest);
}
