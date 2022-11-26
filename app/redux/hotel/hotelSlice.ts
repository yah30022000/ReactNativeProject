import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getAmadeusHotelListAndOffersThunk,
  HotelListAndOffersRequest,
} from "./thunk/getAmadeusHotelListAndOffersThunk";
import {
  setHotelListAndOffersRequestAction,
} from "./action/setHotelListAndOffersRequest";
import { HotelOffersResponse } from "../../helper/amadeus";

export interface HotelState {
  /* not in use anymore */
  // hotelListRequest?: HotelListRequest;
  // hotelListResponse?: HotelListResponse;
  // hotelListSearching: "loading" | "completed" | "failed" | "none";

  addPaymentResult?: {
    cardholdername: string,
    cardnumber: number,
    exp_date: number,
    cvv: number,
  };
  addPaymentError?: {
    cardholdername?: string,
    cardnumber?: number,
    exp_date?: number,
    cvv: number,
  }
  addPayment: "loading" | "completed" | "failed" | "none";

  hotelListAndOffersSearching: "loading" | "completed" | "failed" | "none";
  hotelListAndOffersRequest?: HotelListAndOffersRequest;
  hotelListAndOffersResponse?: HotelOffersResponse;
}

// Define the initial state using that type
const initialState: HotelState = {
  // hotelListSearching: "none",
  addPayment: "none",
  hotelListAndOffersSearching: "none",
};



export const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    setHotelListAndOffersRequest: setHotelListAndOffersRequestAction,
    // chooseCityCode: chooseCityCodeAction,
    // selectRating: selectRatingAction,
    changeHotelSearching: (state, action: PayloadAction<HotelState["hotelListAndOffersSearching"]>) => {
      state.hotelListAndOffersSearching = action.payload
    },
  },
    extraReducers: (builder) => {

      // getAmadeusHotelListAndOffersThunk
      builder.addCase(getAmadeusHotelListAndOffersThunk.pending, (state, action) => {
        state.hotelListAndOffersSearching = "loading";
      });
      builder.addCase(getAmadeusHotelListAndOffersThunk.fulfilled, (state, action) => {
        if(action.payload.data.length < 1){
          console.error("getAmadeusHotelListAndOffersThunk fulfilled, but no hotels");
          state.hotelListAndOffersSearching = "failed";
        }else{
          state.hotelListAndOffersResponse = action.payload;
          state.hotelListAndOffersSearching = "completed";
        }
      });
      builder.addCase(getAmadeusHotelListAndOffersThunk.rejected, (state, action) => {
        console.error("getAmadeusHotelListAndOffersThunk error, no data input");
        state.hotelListAndOffersSearching = "failed";
      });
    },
  })
;

export const { setHotelListAndOffersRequest, changeHotelSearching } = hotelSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default hotelSlice.reducer;
