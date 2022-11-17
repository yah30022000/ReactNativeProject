export interface HotelCityCode {
  cityCode: string;
  cityName: string;
  country: string
}

export const hotelCityCodes: Array<HotelCityCode> = [
  { cityCode: "BCN", cityName: "Barcelona", country: "Spain"},
  { cityCode: "BKK", cityName: "Bangkok", country: "Thailand"},
  { cityCode: "CPT", cityName: "Cape Town" ,country: "South Africa"},
  { cityCode: "FCO", cityName: "Rome", country: "Italy"},
  { cityCode: "HKG", cityName: "Hong Kong", country: "China"},
  { cityCode: "JKF", cityName: "New York", country: "United States"},
  { cityCode: "KUL", cityName: "Kuala Lumpur", country: "Malaysia"},
  { cityCode: "LON", cityName: "London", country: "United Kingdom"},
  { cityCode: "PAR", cityName: "Paris", country: "France"},
  { cityCode: "PEK", cityName: "Beijing", country: "China"},
  { cityCode: "SEL", cityName: "Seoul", country: "South Korea"},
  { cityCode: "SFO", cityName: "San Francisco", country: "United States"},
  { cityCode: "SHA", cityName: "Shanghai", country: "China"},
  { cityCode: "SIN", cityName: "Singapore", country: "Singapore"},
  { cityCode: "TPE", cityName: "Taipei", country: "Taiwan"},
  { cityCode: "TYO", cityName: "Tokyo", country: "Japan"},
  { cityCode: "YTO", cityName: "Toronto", country: "Canada"},
  { cityCode: "YVR", cityName: "Vancouver", country: "Canada"},
];
