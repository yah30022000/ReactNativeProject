import { createAsyncThunk } from "@reduxjs/toolkit";
import { API as AmplifyAPI, Storage as AmplifyS3Storage } from "aws-amplify";
import { S3ProviderListOutputItem } from "@aws-amplify/storage";
import { HotelListRequest, HotelOffersRequest, HotelOffersResponse } from "../../../helper";

export interface HotelListAndOffersRequest extends HotelListRequest, Omit<HotelOffersRequest, 'hotelIds'> {
  hotelIds?: Array<string>
}

export const getAmadeusHotelListAndOffersThunk = createAsyncThunk<HotelOffersResponse,
  {
    queryParams: HotelListAndOffersRequest,
    images?: Array<S3ProviderListOutputItem>,
    randomImages?: Array<S3ProviderListOutputItem>
  }>(
  "hotel/getAmadeusHotelListAndOffers",
  async ({ queryParams, images, randomImages }: {
    queryParams: HotelListAndOffersRequest,
    images?: Array<S3ProviderListOutputItem>,
    randomImages?: Array<S3ProviderListOutputItem>
  }, thunkAPI) => {

    if (!queryParams.amenities) {
      delete queryParams.amenities;
    } else {
      queryParams.amenities = JSON.stringify(queryParams.amenities);
    }

    if (!queryParams.ratings) {
      delete queryParams.ratings;
    } else {
      queryParams.ratings = JSON.stringify(queryParams.ratings);
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

    console.log("getAmadeusHotelListAndOffersThunk data length: ", response.data.length);

    // fill in online image filename (key) from S3 Bucket
    if(images && randomImages){

      response.data = await Promise.all(response.data.map(async (res) => {
        if (res.hotel && res.hotel.hotelId) {

          console.log('hotelId filtering for images key: ', res.hotel.hotelId)

          let filteredHotelImages = images.filter((image)=>{
            return image.key && image.key.includes(res.hotel?.hotelId ?? "")
          });

          // allocate images that got from S3 buckets by filename
          if (filteredHotelImages.length > 1) {

            // sort hotel image and room image file name
            let sortedResult = filteredHotelImages.sort((first, second) => {
              let firstKeyLength = first.key?.length ?? 0;
              let secondKeyLength = second.key?.length ?? 0;
              return firstKeyLength - secondKeyLength;
            });

            // add imageFileName (as a key)
            res.hotel["imageFileName"] = sortedResult[0].key;

            // add roomImageFileName (as a key)
            if (res.offers && res.offers.length > 0) {
              res.offers[0]["roomImageFileName"] = sortedResult[1].key;
            }
          } else {
            let filteredRandomHotelImages = randomImages.filter((image)=>{
              return image.key && image.key.includes(res.hotel?.hotelId ?? "")
            });

            res.hotel["imageFileName"] = filteredRandomHotelImages[Math.floor(Math.random() * 10)].key;

            // add random hotel roomImageFileName (as a key)
            if (res.offers && res.offers.length > 0) {
              res.offers[0]["roomImageFileName"] = filteredRandomHotelImages[Math.floor(Math.random() * 10)].key;
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

        // console.log('allocated image for hotel res.hotel.hotelId ', res.hotel?.hotelId, ' - res.hotel["imageFilePath"]: ', res.hotel?.imageFilePath)

        return res;
      }));

    }

    console.log("getAmadeusHotelListAndOffersThunk allocated images");


    return response;
  },
);
