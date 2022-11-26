import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { chooseCityCodeAction } from "./action/chooseCityCode";
import { selectRatingAction } from "./action/selectRating";
import {
  getAmadeusHotelListAndOffersThunk,
  HotelListAndOffersRequest,
} from "./thunk/getAmadeusHotelListAndOffersThunk";
import {
  setHotelListAndOffersRequestAction,
} from "./action/setHotelListAndOffersRequest";

export interface HotelState {
  /* not in use anymore */
  // hotelListRequest?: HotelListRequest;
  // hotelListResponse?: HotelListResponse;

  hotelListAndOffersSearching: "loading" | "completed" | "failed" | "none";
  hotelListAndOffersRequest?: HotelListAndOffersRequest;
  hotelListAndOffersResponse?: any;
}

// Define the initial state using that type
const initialState: HotelState = {
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
        if(action.payload.length < 1){
          console.error("getAmadeusHotelListAndOffersThunk fulfilled, but no hotels");
          state.hotelListAndOffersSearching = "failed";
        }else{
          state.hotelListAndOffersSearching = action.payload;
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
