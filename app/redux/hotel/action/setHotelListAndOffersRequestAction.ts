import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { HotelState } from "../hotelSlice";
import {
  getAmadeusHotelListAndOffersThunk,
  HotelListAndOffersRequest,
} from "../thunk/getAmadeusHotelListAndOffersThunk";


export const setHotelListAndOffersRequestAction: CaseReducer<HotelState, PayloadAction<HotelListAndOffersRequest>> = (state, action) => {
  state.hotelListAndOffersRequest = action.payload
  state.hotelListAndOffersSearchStatus = "loading"
  console.log('setHotelListAndOffersRequest: ', state.hotelListAndOffersRequest)
}
