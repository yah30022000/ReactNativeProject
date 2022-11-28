import { HotelAmenities } from "./hotel-amenities";
import { HotelCityCode } from "./hotel-city-codes";

// City Code refers to IATA code
// https://www.nationsonline.org/oneworld/IATA_Codes/airport_code_list.htm

/** https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city
 *
 *  >> GET Request QueryString:
 *    cityCode: string
 *    radius?: integer (default: 5)
 *    radiusUnit?: string (default: KM)
 *    chainCodes?: string[]
 *    amenities?: string[] (SPA, FITNESS_CENTER...)
 *    ratings?: string[] (default: 1, 2, 3, 4, 5)
 *    hotelSource?: string[] (default: ALL)
 *
 *  >> Response JSON:
 *    name: string
 *    iataCode: string
 *    hotelId: string
 *    chainCode: string
 *    dupeId: number
 *    address: {
 *      countryCode: string
 *    }
 *   geoCode: {
 *      latitude: decimal
 *      longitude: decimal
 *    }
 *   subtype?: string (e.g. airport, restaurant)
 *   timeZoneName?: string (e.g. Europe/Paris)
 *   googlePlaceId?: string (for Google Places and Google Map)
 *   openjetAirportId?: string  (for OpenJet)
 *   uicCode?: string (for UIC rail station code)
 *   distance?: {
 *     unit: string
 *     value: number
 *     displayValue: number
 *   }
 *   last_update?: string
 */
export interface HotelListRequest {
  cityCode: HotelCityCode["cityCode"];
  radius?: number;
  radiusUnit?: string;
  chainCodes?: Array<string>;

  // JSON.stringify Array<HotelAmenities>
  amenities?: string;
  ratings?: Array<number>;
  hotelSource?: string;
}

export interface HotelListResponseData {
  chainCode: string
  iataCode: string
  dupeId: number
  name: string
  hotelId: string
  geoCode: {
    latitude: number,
    longitude: number
  },
  address: {
    countryCode: string
  },
  distance?: {
    value: number
    unit: string
    displayValue?: string
    isUnlimited?: string
  },
  rating?: number
  subtype?: string
  timeZoneName?: string
  googlePlaceId?: string
  openjetAirportId?: string
  uicCode?: string
  last_update?: string
}

export interface HotelListResponse {
  status: number | string
  data: Array<HotelListResponseData>
}

let arr: Array<HotelListResponseData> = [
  {
    "chainCode": "AC",
    "iataCode": "LON",
    "dupeId": 700095490,
    "name": "LA GAFFE LONDON",
    "hotelId": "ACLONGAF",
    "geoCode": {
      "latitude": 51.55936,
      "longitude": -0.17844
    },
    "address": {
      "countryCode": "GB"
    }
  },

]
