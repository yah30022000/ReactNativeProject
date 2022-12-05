import { createAsyncThunk } from "@reduxjs/toolkit";
import { Auth as AmplifyAuth, DataStore as AmplifyDatastore, Predicates } from "aws-amplify";
import { UserState } from "../userSlice";
import { HotelBooking, User } from "../../../../src/models";


export const getCurrentAuthenticatedUserThunk = createAsyncThunk<UserState["signInResult"], undefined>(
  "user/getCurrentAuthenticatedUser",
  async (_: undefined, thunkAPI) => {
    let userData = await AmplifyAuth.currentAuthenticatedUser();
    if (!userData) {
      return thunkAPI.rejectWithValue(userData);
    }
    let authProvider = null;
    if (userData.attributes.identities) {
      authProvider = JSON.parse(userData.attributes.identities)[0]["providerName"];
    }

    //
    await AmplifyDatastore.delete(HotelBooking, Predicates.ALL);
    await AmplifyDatastore.delete(User, Predicates.ALL);

    // find existing user by email with same auth provider
    // let savedUser = await AmplifyDatastore.save(
    //   new User({
    //     email: userData.attributes.email,
    //     emailVerified: userData.attributes.email_verified,
    //     username: userData.username,
    //     name: userData.attributes.name,
    //     authProvider: authProvider,
    //     // phoneNumber: null,
    //     // image: null
    //   }));

    // console.log("getCurrentAuthenticatedUserThunk datastore savedUser: ", savedUser);

    // let queryUser = await AmplifyDatastore.query(User, userData.username);
    // console.log("getCurrentAuthenticatedUserThunk queryUser: ", queryUser);
    //
    // let queryHotelBooking = await AmplifyDatastore.query(
    //   HotelBooking, field => field.username.eq(userData.username)
    // );
    // console.log("getCurrentAuthenticatedUserThunk queryHotelBooking: ", queryHotelBooking);

    return {
      email: userData.attributes.email,
      emailVerified: userData.attributes.email_verified,
      authProvider: authProvider,
      username: userData.username,
      name: userData.attributes.name,
    };
  },
);
