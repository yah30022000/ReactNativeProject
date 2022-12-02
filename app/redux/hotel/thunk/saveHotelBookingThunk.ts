import { createAsyncThunk } from "@reduxjs/toolkit";
import { DataStore as AmplifyDatastore } from "aws-amplify";
import { HotelBooking, LazyHotelBooking, User } from "../../../../src/models";
import { HotelBookingDataModelBefore } from "../../../helper";


export const saveHotelBookingThunk = createAsyncThunk<LazyHotelBooking, HotelBookingDataModelBefore>(
  "hotel/saveHotelBooking",
  async (
    {
      username, hotelListAndOffersResponse, hotelBookingsRequest, hotelBookingsResponse,
    }: HotelBookingDataModelBefore,
    thunkAPI,
  ) => {

    let queryUser = await AmplifyDatastore.query(User, username);
    console.log("saveHotelBookingThunk queryUser: ", queryUser);

    if (!queryUser) {
      return thunkAPI.rejectWithValue(queryUser);
    }

    if (!hotelListAndOffersResponse.hotel) {
      return thunkAPI.rejectWithValue("hotelListAndOffersResponse hotel array is undefined");
    }

    if (!hotelListAndOffersResponse.offers || hotelListAndOffersResponse.offers.length < 1) {
      return thunkAPI.rejectWithValue("hotelListAndOffersResponse offers array is either undefined or empty");
    }

    let hotelBookingGuests = hotelBookingsRequest.data.guests.map((guest) => {
      return {
        title: guest.name.title,
        firstName: guest.name.firstName,
        lastName: guest.name.lastName,
        phone: guest.contact.phone,
        email: guest.contact.email,
      };
    });

    let hotelBookingsPayment = hotelBookingsRequest.data.payments.map((guest) => {
      return {
        method: guest.method,
        cardVendorCode: guest.card?.vendorCode ?? "",
        cardNumber: guest.card?.cardNumber ?? "",
        expiryDate: guest.card?.expiryDate ?? "",
      };
    });

    let hotelOfferTax = hotelListAndOffersResponse.offers[0].price.taxes?.map((tax) => {
      return {
        code: tax.code,
        amount: tax.amount ? parseFloat(tax.amount) : 0,
        currency: tax.currency,
        included: tax.included,
        percentage: tax.percentage ? parseFloat(tax.percentage) : 0,
        description: tax.description,
        pricingFrequency: tax.pricingFrequency,
        pricingMode: tax.pricingMode,
      };
    }) ?? undefined;

    let savedHotelBooking = await AmplifyDatastore.save(
      new HotelBooking({
        user: queryUser,
        username: username,

        bookingId: hotelBookingsResponse.id,
        providerConfirmationId: hotelBookingsResponse.providerConfirmationId,
        associatedRecordReference:
          hotelBookingsResponse.associatedRecords && hotelBookingsResponse.associatedRecords.length > 0 ?
            hotelBookingsResponse.associatedRecords[0].reference : "",
        guests: hotelBookingGuests,
        payments: hotelBookingsPayment,
        hotel: {
          hotelId: hotelListAndOffersResponse.hotel.hotelId,
          name: hotelListAndOffersResponse.hotel.name,
          cityCode: hotelListAndOffersResponse.hotel.cityCode,
          chainCode: hotelListAndOffersResponse.hotel.chainCode,
          dupeId: hotelListAndOffersResponse.hotel.dupeId,
          latitude: hotelListAndOffersResponse.hotel.latitude,
          longitude: hotelListAndOffersResponse.hotel.longitude,
          brandCode: hotelListAndOffersResponse.hotel.brandCode,
          rating: hotelListAndOffersResponse.hotel.rating,
        },
        offer: {
          offerId: hotelBookingsRequest.data.offerId,
          checkInDate: hotelListAndOffersResponse.offers[0].checkInDate,
          checkOutDate: hotelListAndOffersResponse.offers[0].checkOutDate,
          rateCode: hotelListAndOffersResponse.offers[0].rateCode,
          roomCategory: hotelListAndOffersResponse.offers[0].room.typeEstimated?.category,
          roomQuantity: hotelListAndOffersResponse.offers[0].roomQuantity,
          roomBeds: hotelListAndOffersResponse.offers[0].room.typeEstimated?.beds,
          roomBedType: hotelListAndOffersResponse.offers[0].room.typeEstimated?.bedType,
          roomDescription: hotelListAndOffersResponse.offers[0].room.description?.text,
          adults: hotelListAndOffersResponse.offers[0].guests?.adults,
          commissionPercentage:
            hotelListAndOffersResponse.offers[0].commission?.percentage ?
              parseFloat(hotelListAndOffersResponse.offers[0].commission?.percentage) : undefined,
          commissionAmount:
            hotelListAndOffersResponse.offers[0].commission?.amount ?
              parseFloat(hotelListAndOffersResponse.offers[0].commission?.amount) : undefined,
          boardType: hotelListAndOffersResponse.offers[0].boardType,
          priceCurrency: hotelListAndOffersResponse.offers[0].price.currency,
          priceBase:
            hotelListAndOffersResponse.offers[0].price.base ?
              parseFloat(hotelListAndOffersResponse.offers[0].price.base) : undefined,
          priceTotal:
            hotelListAndOffersResponse.offers[0].price.total ?
              parseFloat(hotelListAndOffersResponse.offers[0].price.total) : undefined,
          priceSellingTotal:
            hotelListAndOffersResponse.offers[0].price.sellingTotal ?
              parseFloat(hotelListAndOffersResponse.offers[0].price.sellingTotal) : undefined,
          priceTaxes: hotelOfferTax,
          priceMarkup:
            hotelListAndOffersResponse.offers[0].price.markups &&
            hotelListAndOffersResponse.offers[0].price.markups.length > 0 &&
            hotelListAndOffersResponse.offers[0].price.markups[0].amount
              ?
              parseFloat(hotelListAndOffersResponse.offers[0].price.markups[0].amount) : undefined,
          priceVariationAverageBase:
            hotelListAndOffersResponse.offers[0].price.variations &&
            hotelListAndOffersResponse.offers[0].price.variations.average &&
            hotelListAndOffersResponse.offers[0].price.variations.average.base ?
              parseFloat(hotelListAndOffersResponse.offers[0].price.variations.average.base) : undefined,
          priceVariationAverageTotal:
            hotelListAndOffersResponse.offers[0].price.variations &&
            hotelListAndOffersResponse.offers[0].price.variations.average &&
            hotelListAndOffersResponse.offers[0].price.variations.average.total ?
              parseFloat(hotelListAndOffersResponse.offers[0].price.variations.average.total) : undefined,
        },

      }),
    );

    console.log("saveHotelBookingThunk savedHotelBooking: ", savedHotelBooking);

    if (!savedHotelBooking) {
      return thunkAPI.rejectWithValue(savedHotelBooking);
    }

    return savedHotelBooking;
  },
);
