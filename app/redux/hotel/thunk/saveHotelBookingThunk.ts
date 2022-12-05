import { createAsyncThunk } from "@reduxjs/toolkit";
import { DataStore as AmplifyDatastore } from "aws-amplify";
import { HotelBooking, LazyHotelBooking, User } from "../../../../src/models";
import { HotelBookingDataModelBefore } from "../../../helper";
import moment from "moment";


export const saveHotelBookingThunk = createAsyncThunk<LazyHotelBooking, HotelBookingDataModelBefore>(
  "hotel/saveHotelBooking",
  async (
    {
      username, hotelOffersResponseData, hotelBookingsRequest, hotelBookingsResponse,
    }: HotelBookingDataModelBefore,
    thunkAPI,
  ) => {

    let queryUser = await AmplifyDatastore.query(User, username);
    console.log("saveHotelBookingThunk queryUser: ", queryUser);

    if (!queryUser) {
      return thunkAPI.rejectWithValue(queryUser);
    }

    if (!hotelOffersResponseData.hotel) {
      return thunkAPI.rejectWithValue("hotelListAndOffersResponse hotel array is undefined");
    }

    if (!hotelOffersResponseData.offers || hotelOffersResponseData.offers.length < 1) {
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

    let checkInDate =
      hotelOffersResponseData.offers[0].checkInDate ?
        moment(hotelOffersResponseData.offers[0].checkInDate, "YYYY-MM-DD") :
        moment();
    let checkOutDate =
      hotelOffersResponseData.offers[0].checkOutDate ?
        moment(hotelOffersResponseData.offers[0].checkOutDate, "YYYY-MM-DD") :
        moment();
    let duration = moment.duration(checkOutDate.diff(checkInDate));
    let night = duration.asDays();

    let newBasePrice = hotelOffersResponseData.offers[0].price.base ?
      parseFloat(hotelOffersResponseData.offers[0].price.base)
      : hotelOffersResponseData.offers[0].price.variations?.average?.base ?
        parseFloat(hotelOffersResponseData.offers[0].price.variations?.average?.base) * night
        : hotelOffersResponseData.offers[0].price.total &&
        hotelOffersResponseData.offers[0].price.taxes![0]?.percentage ?
          (parseFloat(hotelOffersResponseData.offers[0].price.total) -
            (parseFloat(hotelOffersResponseData.offers[0].price.total)
              * parseFloat(hotelOffersResponseData.offers[0].price.taxes![0].percentage) / 100)
          ) / night
          : 0;

    let hotelOfferTax = hotelOffersResponseData.offers[0].price.taxes?.map((tax) => {
      return {
        code: tax.code,
        amount: tax.amount ? parseFloat(tax.amount) : tax.percentage ?
          (parseFloat(tax.percentage) / 100) *
          newBasePrice :
          hotelOffersResponseData.offers &&
          hotelOffersResponseData.offers[0].price.total &&
          hotelOffersResponseData.offers[0].price.base ?
            parseFloat(hotelOffersResponseData.offers[0].price.total) -
            parseFloat(hotelOffersResponseData.offers[0].price.base) :
            0,
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
          hotelId: hotelOffersResponseData.hotel.hotelId,
          name: hotelOffersResponseData.hotel.name,
          cityCode: hotelOffersResponseData.hotel.cityCode,
          chainCode: hotelOffersResponseData.hotel.chainCode,
          dupeId: hotelOffersResponseData.hotel.dupeId,
          latitude: hotelOffersResponseData.hotel.latitude,
          longitude: hotelOffersResponseData.hotel.longitude,
          brandCode: hotelOffersResponseData.hotel.brandCode,
          rating: hotelOffersResponseData.hotel.rating,
          imageFileName: hotelOffersResponseData.hotel.imageFileName,

        },
        offer: {
          offerId: hotelBookingsRequest.data.offerId,
          roomImageFileName: hotelOffersResponseData.offers[0].roomImageFileName,
          checkInDate: hotelOffersResponseData.offers[0].checkInDate,
          checkOutDate: hotelOffersResponseData.offers[0].checkOutDate,
          rateCode: hotelOffersResponseData.offers[0].rateCode,
          roomCategory: hotelOffersResponseData.offers[0].room.typeEstimated?.category,
          roomQuantity: hotelOffersResponseData.offers[0].roomQuantity,
          roomBeds: hotelOffersResponseData.offers[0].room.typeEstimated?.beds,
          roomBedType: hotelOffersResponseData.offers[0].room.typeEstimated?.bedType,
          roomDescription: hotelOffersResponseData.offers[0].room.description?.text,
          adults: hotelOffersResponseData.offers[0].guests?.adults,
          night: night,
          commissionPercentage:
            hotelOffersResponseData.offers[0].commission?.percentage ?
              parseFloat(hotelOffersResponseData.offers[0].commission?.percentage) : undefined,
          commissionAmount:
            hotelOffersResponseData.offers[0].commission?.amount ?
              parseFloat(hotelOffersResponseData.offers[0].commission?.amount) : undefined,
          boardType: hotelOffersResponseData.offers[0].boardType,
          priceCurrency: hotelOffersResponseData.offers[0].price.currency,
          priceBase: newBasePrice,
          priceTotal:
            hotelOffersResponseData.offers[0].price.total ?
              parseFloat(hotelOffersResponseData.offers[0].price.total) : undefined,
          priceSellingTotal:
            hotelOffersResponseData.offers[0].price.sellingTotal ?
              parseFloat(hotelOffersResponseData.offers[0].price.sellingTotal) : undefined,
          priceTaxes: hotelOfferTax,
          priceMarkup:
            hotelOffersResponseData.offers[0].price.markups &&
            hotelOffersResponseData.offers[0].price.markups.length > 0 &&
            hotelOffersResponseData.offers[0].price.markups[0].amount
              ?
              parseFloat(hotelOffersResponseData.offers[0].price.markups[0].amount) : undefined,
          priceVariationAverageBase:
            hotelOffersResponseData.offers[0].price.variations &&
            hotelOffersResponseData.offers[0].price.variations.average &&
            hotelOffersResponseData.offers[0].price.variations.average.base ?
              parseFloat(hotelOffersResponseData.offers[0].price.variations.average.base) : undefined,
          priceVariationAverageTotal:
            hotelOffersResponseData.offers[0].price.variations &&
            hotelOffersResponseData.offers[0].price.variations.average &&
            hotelOffersResponseData.offers[0].price.variations.average.total ?
              parseFloat(hotelOffersResponseData.offers[0].price.variations.average.total) : undefined,
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
