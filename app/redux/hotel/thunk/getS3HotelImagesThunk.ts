import { createAsyncThunk } from "@reduxjs/toolkit";
import { Storage as AmplifyS3Storage } from "aws-amplify";
import { S3ProviderListOutputItem } from "@aws-amplify/storage";


export const getS3HotelImagesThunk = createAsyncThunk<{
  images: Array<S3ProviderListOutputItem>,
  randomImages: Array<S3ProviderListOutputItem>
}, undefined>(
  "hotel/getS3HotelImages",
  async (_: undefined, thunkAPI) => {


    // load images list from S3 bucket
    let imageResponse = await AmplifyS3Storage.list("hotel-image/", {
      pageSize: "ALL",
    });

    if (!imageResponse) {
      return thunkAPI.rejectWithValue(imageResponse);
    }
    let images = imageResponse.results.filter((image) => {
      return image.key && !image.key.startsWith("hotel-image/hotel");
    });

    console.log("getS3HotelImagesThunk images: ", images);

    let randomImages = imageResponse.results.filter((image) => {
      return image.key && image.key.startsWith("hotel-image/hotel");
    });

    console.log("getS3HotelImagesThunk randomImages: ", randomImages);


    return {
      images: images,
      randomImages: randomImages
    };
  },
);
