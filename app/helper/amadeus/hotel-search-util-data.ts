import { TextStyle, ViewStyle } from "react-native";
import { ButtonProp } from "../../components/ButtonWithColorBg";
import React from "react";

export type ButtonItem = {
  key: number;
  buttonStyle: ViewStyle;
  color: string;
  backgroundColor: string;
  iconName: string;
  iconProvider: ButtonProp["iconProvider"];
  textStyle: TextStyle;
  textTitleStyle: TextStyle;
  textSubtitleStyle: TextStyle;
  textTitle: string | number;
  textSubtitle: string | number;
  onPress: () => void;
  customComponent?: React.ReactNode
};
export type ButtonItemAndIndex = {
  item: ButtonItem;
  index: number;
};
