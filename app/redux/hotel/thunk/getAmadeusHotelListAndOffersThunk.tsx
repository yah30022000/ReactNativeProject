import { createAsyncThunk } from "@reduxjs/toolkit";
import { HotelListRequest, HotelListResponse, HotelOffersResponse } from "../../../helper/amadeus";
import { API as AmplifyAPI } from "@aws-amplify/api/lib-esm/API";
import { HotelOffersRequest } from "../../../helper/amadeus";

export interface HotelListAndOffersRequest extends HotelListRequest, Omit<HotelOffersRequest, 'hotelIds'> {
  hotelIds?: Array<string>
}

export const getAmadeusHotelListAndOffersThunk = createAsyncThunk<HotelOffersResponse, HotelListAndOffersRequest>(
  "hotel/getAmadeusHotelListAndOffers",
  async (queryParams: HotelListAndOffersRequest, thunkAPI) => {

    console.log("getAmadeusHotelListAndOffersThunk query params: ", queryParams);

    let apiName = "amadeusAPI";
    const path = "/amadeus/hotel-list-and-offers";
    const option = {
      headers: {}, // OPTIONAL
      // response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
      queryStringParameters: queryParams,
    };

    let response: HotelOffersResponse = await AmplifyAPI.get(apiName, path, option);



    if (response.status < 200 || response.status >= 300) {
      return thunkAPI.rejectWithValue(response);
    }

    console.log("getAmadeusHotelListAndOffersThunk data: ", response.data);

    return response;
  },
);
