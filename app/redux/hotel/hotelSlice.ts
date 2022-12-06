import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getAmadeusHotelListAndOffersThunk,
  HotelListAndOffersRequest,
} from "./thunk/getAmadeusHotelListAndOffersThunk";
import { setHotelListAndOffersRequestAction } from "./action/setHotelListAndOffersRequestAction";
import { HotelBookingsRequest, HotelBookingsResponse, HotelOffersResponse } from "../../helper";
import { amadeusHotelBookingThunk } from "./thunk/amadeusHotelBookingThunk";
import { setHotelBookingsRequestAction } from "./action/setHotelBookingsRequestAction";
import { saveHotelBookingThunk } from "./thunk/saveHotelBookingThunk";
import { LazyHotelBooking } from "../../../src/models";
import { getSavedHotelBookingThunk } from "./thunk/getSavedHotelBookingThunk";
import { getAllSavedHotelBookingByUsernameThunk } from "./thunk/getAllSavedHotelBookingByUsernameThunk";
import { getS3HotelImagesThunk } from "./thunk/getS3HotelImagesThunk";
import { S3ProviderListOutputItem } from "@aws-amplify/storage";

export interface HotelState {
  hotelListAndOffersSearchStatus: "loading" | "completed" | "failed" | "none";
  hotelListAndOffersRequest?: HotelListAndOffersRequest;
  hotelListAndOffersResponse?: HotelOffersResponse;

  hotelBookingStatus: "loading" | "completed" | "failed" | "none";
  hotelBookingRequest?: HotelBookingsRequest;
  hotelBookingResponse?: HotelBookingsResponse;

  currentQueryHotelBooking?: LazyHotelBooking
  allQueryHotelBooking?: Array<LazyHotelBooking>

  images?: Array<S3ProviderListOutputItem>,
  randomImages?: Array<S3ProviderListOutputItem>
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

      // saveHotelBookingThunk
      builder.addCase(saveHotelBookingThunk.pending, (state, action) => {
        // state.hotelBookingStatus = "loading";
      });
      builder.addCase(saveHotelBookingThunk.fulfilled, (state, action) => {
        console.log("saveHotelBookingThunk fulfilled")
      });
      builder.addCase(saveHotelBookingThunk.rejected, (state, action) => {
        console.error("saveHotelBookingThunk error: ", action.error.message);
        // state.hotelBookingStatus = "failed";
      });

      // getSavedHotelBookingThunk
      builder.addCase(getSavedHotelBookingThunk.fulfilled, (state, action) => {
        console.log("getSavedHotelBookingThunk fulfilled")
        state.currentQueryHotelBooking = action.payload;
      });
      builder.addCase(getSavedHotelBookingThunk.rejected, (state, action) => {
        console.error("getSavedHotelBookingThunk error: ", action.error.message);
      });

      // getSavedHotelBookingThunk
      builder.addCase(getAllSavedHotelBookingByUsernameThunk.fulfilled, (state, action) => {
        console.log("getAllSavedHotelBookingByUsernameThunk fulfilled")
        state.allQueryHotelBooking = action.payload;
      });
      builder.addCase(getAllSavedHotelBookingByUsernameThunk.rejected, (state, action) => {
        console.error("getAllSavedHotelBookingByUsernameThunk error: ", action.error.message);
      });

      // getS3HotelImagesThunk
      builder.addCase(getS3HotelImagesThunk.fulfilled, (state, action) => {
        console.log("getS3HotelImagesThunk fulfilled")
        state.images = action.payload.images;
        state.randomImages = action.payload.randomImages;
      });
      builder.addCase(getS3HotelImagesThunk.rejected, (state, action) => {
        console.error("getS3HotelImagesThunk error: ", action.error.message);
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
