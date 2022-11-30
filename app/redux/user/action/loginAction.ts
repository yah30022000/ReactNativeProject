import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { HotelState } from "../../hotel/hotelSlice";
import { HotelListAndOffersRequest } from "../../hotel/thunk/getAmadeusHotelListAndOffersThunk";
import { UserState } from "../userSlice";


export const loginAction: CaseReducer<UserState> = (state) => {
  state.isLoggedIn = true;
}
