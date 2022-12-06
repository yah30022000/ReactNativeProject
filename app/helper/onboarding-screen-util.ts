import { ImageSourcePropType } from "react-native";

export type BoardingItem = {
  key: number;
  title: string;
  subtitle: string;
  backgroundPath: ImageSourcePropType;
  // onPress: () => void;
};

export const boardingList: Array<BoardingItem> = [
  {
    key: 1,
    title: "Discover New Destination",
    subtitle:
      "Where to go in 2023? Discover new destination around you! Top travel destinations with Trip go in 2023",
    backgroundPath: require("@travelasset/images/nature.jpeg"),
  },
  {
    key: 2,
    title: "Best Flight Booking Service",
    subtitle:
      "Where to go in 2023? Discover best fight deal around you! Top airlines airbus is ready for you.",
    backgroundPath: require("@travelasset/images/flight.jpeg"),
  },
  {
    key: 3,
    title: "Explore Best Restaurants",
    subtitle:
      "Where to go in 2023? Discover Restaurants around you! Top restaurants is waiting for you.",
    backgroundPath: require("@travelasset/images/restaurant.jpeg"),
  },
  {
    key: 4,
    title: "Discover World Best Events",
    subtitle:
      "Where to go in 2023? Discover World Best Events around you! Lets book your seat.",
    backgroundPath: require("@travelasset/images/event.jpeg"),
  },
];
