import { HotelCityCode } from "./hotel-city-codes";
import { HotelAmenities } from "./hotel-amenities";

/**
 *  https://test.api.amadeus.com/v3/shopping/hotel-offers
 *  >> GET Request QueryString:
 *    hotelIds: string[]
 *    adults: integer
 *    checkInDate?: string (default: today, '2022-11-22')
 *    checkOutDate?: string (default: today + 1, '2022-11-23')
 *    countryOfResidence?: string
 *    roomQuantity?: integer (default: 1)
 *    priceRange?: string (e.g. 200-300)
 *    currency?: string (required when priceRange is filled)
 *    paymentPolicy?: string (default: NONE)
 *    boardType?: string (e.g. ROOM_ONLY)
 *    includeClosed?: boolean
 *    bestRateOnly?: boolean
 *    lang?: string
 *
 *  >> Response JSON:
 *    data: [
 *      type: string ('hotel-offers')
 *      available: boolean
 *      self: string (amadeus API URL)
 *      hotel: {
 *        type: string
 *        hotelId: string
 *        name: string
 *        cityCode: string
 *        chainCode: string
 *        dupeId: string
 *        latitude: decimal
 * 				longitude: decimal
 *        brandCode?: string
 *       }
 *      offers: [
 *        {
 *            type?: string
 *            id: string
 *            checkInDate: string
 *            checkOutDate: string
 *            roomQuantity?: string
 *            rateCode:	string
 *            self: string
 *            rateFamilyEstimated: {
 *              code: string
 *              type: string
 *            }
 *            category?: string
 *            description?: {
 *              text: string
 *              lang: string
 *            }
 *           commission?: {
 *             percentage: string
 *             amount?: string
 *           }
 *           boardType: string (enum)
 *           room: {
 *             type: string
 *             typeEstimated: {
 *               category: string
 *               beds: integer
 *               bedType: string
 *              }
 *             description: {
 *               text: string
 *               lang: string
 *              }
 *            }
 *           guests: {
 *              adults: integer (1-9)
 *              childAges?: integer
 *            }
 *           price: {
 * 						 currency: string
 * 						 base: string
 * 						 total: string
 * 						 sellingTotal?: string
 * 						 taxes: [
 * 							 {
 * 								 code: string
 * 								 amount: string
 * 								 currency: string
 * 								 included: false
 * 							 }
 * 						 ]
 * 						 markups?: [
 * 						   {
 * 						     amount: string
 * 						   }
 * 						 ]
 * 					}
 * 					policies: {
 * 						 paymentType: string
 * 						 cancellation: {
 * 							  deadline: string
 * 						}
 * 					  guarantee?: {
 * 					      description: {
 * 					        text: string
 * 					        lang: string
 * 					      }
 * 					      acceptedPayments: {
 * 					        creditCards: string[]
 * 					        methods: string[]
 * 					      }
 * 					  }
 * 					  deposit?: {
 * 					    amount: string
 * 					    deadline: string
 * 					    description: {
 * 					        text: string
 * 					        lang: string
 * 					      }
 * 					    acceptedPayments: {
 * 					   			creditCards: string[]
 * 					        methods: string[]
 * 					    }
 * 					  }
 * 					  prepay?: {
 * 					    amount: string
 * 					    deadline: string
 * 					    description: {
 * 					        text: string
 * 					        lang: string
 * 					      }
 * 					    acceptedPayments: {
 * 					   			creditCards: string[]
 * 					        methods: string[]
 * 					    }
 * 					  }
 * 					  holdTime?: {
 * 					    deadline: string
 * 					  }
 * 					  checkInOut?: {
 * 					    checkIn: string
 * 					    checkInDescription {
 * 					        text: string
 * 					        lang: string
 * 					     }
 * 					    checkOut: string
 * 					    checkOutDescription {
 * 					        text: string
 * 					        lang: string
 * 					     }
 * 					  }
 * 					}
 *        }
 *      ]
 *    ]:
 */

export interface HotelOffersRequest {
  hotelIds: Array<string>
  adults: number
  checkInDate?: string
  checkOutDate?: string
  countryOfResidence?: string
  roomQuantity?: number
  priceRange?: string
  currency?: string
  paymentPolicy?: string
  boardType?: string
  includeClosed?: boolean
  bestRateOnly?: boolean
  lang?: string
}

