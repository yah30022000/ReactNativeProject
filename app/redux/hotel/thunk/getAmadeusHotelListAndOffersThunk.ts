import { createAsyncThunk } from "@reduxjs/toolkit";
import { API as AmplifyAPI, Storage as AmplifyS3Storage } from "aws-amplify";
import { HotelListRequest, HotelOffersRequest, HotelOffersResponse } from "../../../helper";

export interface HotelListAndOffersRequest extends HotelListRequest, Omit<HotelOffersRequest, 'hotelIds'> {
  hotelIds?: Array<string>
}

export const getAmadeusHotelListAndOffersThunk = createAsyncThunk<HotelOffersResponse, HotelListAndOffersRequest>(
  "hotel/getAmadeusHotelListAndOffers",
  async (queryParams: HotelListAndOffersRequest, thunkAPI) => {

    if(!queryParams.amenities){
      delete queryParams.amenities
    }else{
      queryParams.amenities = JSON.stringify(queryParams.amenities)
    }

    if(!queryParams.ratings){
      delete queryParams.ratings
    }else{
      queryParams.ratings = JSON.stringify(queryParams.ratings)
    }

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


    // fill in online image filename (key) from S3 Bucket
    response.data = await Promise.all(response.data.map(async (res) => {
      if (res.hotel && res.hotel.hotelId) {

        // load images list from S3 bucket
        let images = await AmplifyS3Storage.list("hotel-image/".concat(res.hotel.hotelId), {
          pageSize: "ALL",
        });
        if (images.results.length > 1) {

          // sort hotel image and room image file name
          let sortedResult = images.results.sort((first, second)=> {
            let firstKeyLength = first.key?.length ?? 0
            let secondKeyLength = second.key?.length?? 0
            return firstKeyLength - secondKeyLength
          });

          // add imageFileName (as a key)
          res.hotel["imageFileName"] = sortedResult[0].key;

          // add roomImageFileName (as a key)
          if(res.offers && res.offers.length > 0){
            res.offers[0]["roomImageFileName"] = sortedResult[1].key;
          }
        } else {
          let randomImages = await AmplifyS3Storage.list("hotel-image/hotel", {
            pageSize: "ALL",
          });
          // add random hotel imageFileName (as a key)
          res.hotel["imageFileName"] = randomImages.results[Math.floor(Math.random() * 10)].key;

          // add random hotel roomImageFileName (as a key)
          if(res.offers && res.offers.length > 0){
            res.offers[0]["roomImageFileName"] = randomImages.results[Math.floor(Math.random() * 10)].key;
          }
        }

        // use the filename as a key, get 15 minutes valid image path and fill it in
        if (res.hotel.imageFileName) {
          res.hotel["imageFilePath"] = await AmplifyS3Storage.get(res.hotel.imageFileName);
        }
        if (res.offers && res.offers.length > 0 && res.offers[0].roomImageFileName) {
          res.offers[0]["roomImageFilePath"] = await AmplifyS3Storage.get(res.offers[0].roomImageFileName);
        }
      }
      return res;
    }));

    console.log("getAmadeusHotelListAndOffersThunk data length: ", response.data.length);

    return response;
  },
);
