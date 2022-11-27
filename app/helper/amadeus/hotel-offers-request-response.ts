import { HotelListResponseData } from "./hotel-list-request-response";
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
  hotelIds: Array<string>;
  adults: number;
  checkInDate?: string;
  checkOutDate?: string;
  countryOfResidence?: string;
  roomQuantity?: number;
  priceRange?: string;
  currency?: string;
  paymentPolicy?: string;
  boardType?: string;
  includeClosed?: boolean;
  bestRateOnly?: boolean;
  lang?: string;
}

export interface HotelOffersResponse {
  status: number | string
  data: Array<HotelOffersResponseData>
}

export interface HotelOffersResponseData {
  type?: string; // 'hotel-offers'
  available?: boolean;
  self?: string; // amadeus API URL
  hotel?: Hotel
  offers?: HotelOffer[];
}

export interface Hotel {
  type?: string
  hotelId?: string
  name?: string
  cityCode?: string
  chainCode?: string
  dupeId?: string
  latitude?: number
  longitude?: number
  brandCode?: string
  rating?: number
  amenities?: Array<HotelAmenities>
}

export interface HotelOffer {
  type?: string
  id: string
  checkInDate?: string
  checkOutDate?: string
  roomQuantity?: string
  rateCode: string
  self?: string
  rateFamilyEstimated?: HotelRateFamily
  category?: string
  description?: HotelDescription
  commission?: HotelCommission
  boardType?: string // enum
  room: HotelRoomDetail
  guests?: HotelGuest
  price: HotelPrice
  policies: {
    paymentType?: string
    cancellation?: HotelCancellationPolicy
    guarantee?: HotelGuaranteePolicy
    deposit?: HotelDepositPolicy
    prepay?: HotelDepositPolicy
    holdTime?: HotelHoldPolicy
    checkInOut?: HotelCheckInOutPolicy
  }
}

export interface HotelRateFamily {
  code?: string
  type?: string
}

export interface HotelDescription {
  text?: string
  lang?: string
}

export interface HotelCommission {
  percentage?: string
  amount?: string
  description?: HotelDescription
}

export interface HotelRoomDetail {
  type?: string
  typeEstimated?: HotelEstimatedRoomType
  description?: HotelDescription
}

export interface HotelEstimatedRoomType {
  category?: string
  beds?: number
  bedType?: string
}

export interface HotelGuest {
  adults?: number // 1-9
  childAges?: number[]
}

export interface HotelPrice {
  currency?: string
  base?: string
  total?: string
  sellingTotal?: string
  taxes?: HotelTax[]
  markups?: HotelMarkup[]
  variations?: HotelPriceVariations
}

export interface HotelTax {
  code?: string
  amount?: string
  currency?: string
  included?: boolean
  percentage?: string
  description?: string
  pricingFrequency?: string
  pricingMode?: string
}

export interface HotelMarkup {
  amount?: string
}

export interface HotelPriceVariations {
  average?: HotelPrice
  changes?: HotelPriceVariation[]
}

export interface HotelPriceVariation {
  startDate: string
  endDate: string
  currency?: string
  sellingTotal?: string
  total?: string
  base?: string
  markups?: HotelMarkup[]
}

export interface HotelCancellationPolicy {
  type?: string
  amount?: string
  numberOfNights?: number
  percentage?: string
  deadline?: string
  description?: HotelDescription
}

export interface HotelPaymentPolicy {
  creditCards?: string[]
  methods?: string[]
}

export interface HotelGuaranteePolicy {
  description?: HotelDescription
  acceptedPayments?: HotelPaymentPolicy
}

export interface HotelDepositPolicy {
  amount?: string
  deadline?: string
  description?: HotelDescription
  acceptedPayments?: HotelPaymentPolicy
}

export interface HotelHoldPolicy {
  deadline: string
}

export interface HotelCheckInOutPolicy {
  checkIn?: string
  checkInDescription?: HotelDescription
  checkOut?: string
  checkOutDescription?: HotelDescription
}
