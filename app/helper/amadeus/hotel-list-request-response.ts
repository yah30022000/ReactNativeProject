import { HotelAmenities } from "./hotel-amenities";
import { HotelCityCode } from "./hotel-city-codes";

// City Code refers to IATA code
// https://www.nationsonline.org/oneworld/IATA_Codes/airport_code_list.htm
export interface HotelListRequest {
  cityCode: HotelCityCode["cityCode"];
  radius?: number;
  radiusUnit?: string;
  chainCodes?: Array<string>;
  amenities?: Array<HotelAmenities>;
  ratings?: Array<string>;
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
  rating: number
  subtype?: string
  timeZoneName?: string
  googlePlaceId?: string
  openjetAirportId?: string
  uicCode?: string
  last_update?: string
}

export interface HotelListResponse {
  data: Array<HotelListResponseData>
}

