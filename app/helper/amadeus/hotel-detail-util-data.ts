import { TextStyle } from "react-native";

export interface HotelInfoIconItem{
  key: number
  text: string
  iconName: string
  iconSize?: number
  iconColor?: string
  textStyle?: TextStyle
}

export interface HotelInfoIconItemAndIndex {
  item: HotelInfoIconItem
  index: number
}
