import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getAmadeusHotelListAndOffersThunk,
  HotelListAndOffersRequest,
} from "./thunk/getAmadeusHotelListAndOffersThunk";
import { setHotelListAndOffersRequestAction } from "./action/setHotelListAndOffersRequestAction";
import { HotelBookingsRequest, HotelBookingsResponse, HotelOffersResponse } from "../../helper";
import { amadeusHotelBookingThunk } from "./thunk/amadeusHotelBookingThunk";
import { setHotelBookingsRequestAction } from "./action/setHotelBookingsRequestAction";

export interface HotelState {
  hotelListAndOffersSearchStatus: "loading" | "completed" | "failed" | "none";
  hotelListAndOffersRequest?: HotelListAndOffersRequest;
  hotelListAndOffersResponse?: HotelOffersResponse;

  hotelBookingStatus: "loading" | "completed" | "failed" | "none";
  hotelBookingRequest?: HotelBookingsRequest;
  hotelBookingResponse?: HotelBookingsResponse;
}

// Define the initial state using that type
const initialState: HotelState = {
  hotelListAndOffersSearchStatus: "none",
  hotelBookingStatus: "none",
};



export const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    setHotelListAndOffersRequest: setHotelListAndOffersRequestAction,
    setHotelBookingsRequest: setHotelBookingsRequestAction,
    // chooseCityCode: chooseCityCodeAction,
    // selectRating: selectRatingAction,
    changeHotelSearchStatus: (state, action: PayloadAction<HotelState["hotelListAndOffersSearchStatus"]>) => {
      state.hotelListAndOffersSearchStatus = action.payload;
    },
    changeHotelBookingStatus: (state, action: PayloadAction<HotelState["hotelBookingStatus"]>) => {
      state.hotelBookingStatus = action.payload;
    },
  },
    extraReducers: (builder) => {

      // getAmadeusHotelListAndOffersThunk
      builder.addCase(getAmadeusHotelListAndOffersThunk.pending, (state, action) => {
        state.hotelListAndOffersSearchStatus = "loading";
      });
      builder.addCase(getAmadeusHotelListAndOffersThunk.fulfilled, (state, action) => {
        if(action.payload.data.length < 1){
          console.error("getAmadeusHotelListAndOffersThunk fulfilled, but no hotels");
          state.hotelListAndOffersSearchStatus = "failed";
        } else {
          state.hotelListAndOffersResponse = action.payload;
          state.hotelListAndOffersSearchStatus = "completed";
        }
      });
      builder.addCase(getAmadeusHotelListAndOffersThunk.rejected, (state, action) => {
        console.error("getAmadeusHotelListAndOffersThunk error, no data input");
        state.hotelListAndOffersSearchStatus = "failed";
      });

      // amadeusHotelBookingThunk
      builder.addCase(amadeusHotelBookingThunk.pending, (state, action) => {
        state.hotelBookingStatus = "loading";
      });
      builder.addCase(amadeusHotelBookingThunk.fulfilled, (state, action) => {
        if (action.payload.data.length < 1) {
          console.error("amadeusHotelBookingThunk fulfilled, but no data length");
          state.hotelBookingStatus = "failed";
        } else {
          state.hotelBookingResponse = action.payload;
          state.hotelBookingStatus = "completed";
        }
      });
      builder.addCase(amadeusHotelBookingThunk.rejected, (state, action) => {
        console.error("amadeusHotelBookingThunk error: ", action.error.message);
        state.hotelBookingStatus = "failed";
      });
    },
  })
;

export const {
  setHotelListAndOffersRequest,
  setHotelBookingsRequest,
  changeHotelSearchStatus,
  changeHotelBookingStatus,
} = hotelSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default hotelSlice.reducer;
