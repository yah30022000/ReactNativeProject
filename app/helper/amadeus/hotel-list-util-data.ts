
export type HotelList = {
  key: number;
  hotelName: string;
  address: string;
  rating: number;
  distance: number;
  onPress: () => void;
};

export type HotelListAndIndex = {
  item: HotelList;
  index: number;
};

export const initialHotelList: Array<HotelList> = [
  {
    key: 1,
    hotelName: "RgentSingapore",
    address: "Singapore",
    rating: 5,
    distance: 5.5,
    onPress: () => {},
  },
  {
    key: 2,
    hotelName: "marina V Lavender",
    address: "Singapore",
    rating: 5,
    distance: 6.5,
    onPress: () => {},
  },
  {
    key: 3,
    hotelName: "marina V Lavender",
    address: "Singapore",
    rating: 5,
    distance: 6.5,
    onPress: () => {},
  },
  {
    key: 4,
    hotelName: "marina V Lavender",
    address: "Singapore",
    rating: 5,
    distance: 6.5,
    onPress: () => {},
  },
];
