// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, HotelBooking, HotelBookingsStakeholder, HotelBookingsPayment, Hotel, HotelOffer, HotelOfferTax } = initSchema(schema);

export {
  User,
  HotelBooking,
  HotelBookingsStakeholder,
  HotelBookingsPayment,
  Hotel,
  HotelOffer,
  HotelOfferTax
};