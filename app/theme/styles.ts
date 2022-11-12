/**
 * CSS Styles
 * */
import { TextStyle, ViewStyle } from "react-native";
import theme from "./theme";

/* Global Style starts */

/* Global Style ends */

/* HomeScreen starts */
export const HOME_SCREEN_VIEW: ViewStyle = {
  flex: 1,
  paddingHorizontal: 20,
};

export const HOME_SCREEN_UPPER_ROW: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  width: "100%",
  height: "12%",
  marginVertical: 20,
  justifyContent: "space-between",
};

export const HOME_SCREEN_TITLE: TextStyle = {
  fontSize: 32,
};

export const HOME_SCREEN_SUBTITLE: TextStyle = {
  fontSize: 16,
  marginTop: 10,
};

export const HOME_SCREEN_SUBTITLE_ARROW_LOGO: ViewStyle = {
  margin: 0,
  paddingTop: 5,
};

export const HOME_SCREEN_MIDDLE_ROW: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  width: "100%",
  height: "12%",
  marginVertical: 20,
  justifyContent: "space-around",
};

export const HOME_SCREEN_DIVIDER_LINE: ViewStyle = {
  marginVertical: 20,
  backgroundColor: theme.colors.grey,
};

export const HOME_SCREEN_SECOND_MIDDLE_ROW: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  width: "100%",
  height: "5%",
  marginVertical: 20,
  justifyContent: "space-between",
  alignItems: "center",
};

export const HOME_SCREEN_SECOND_MIDDLE_ROW_TITLE: TextStyle = {
  fontSize: 26,
};

export const HOME_SCREEN_IMAGE_ROW: ViewStyle = {
  flexDirection: "row",
  // flexWrap: "wrap",
  width: "100%",
  // height: "50%",
  // marginVertical: 20,
  justifyContent: "space-between",
  // flexGrow: 2
};

export const HOME_SCREEN_IMAGE_ROW_LEFT: ViewStyle = {
  width: "50%", paddingRight: 15,
};

export const HOME_SCREEN_IMAGE_ROW_RIGHT: ViewStyle = {
  width: "50%", paddingLeft: 15,
};

export const HOME_SCREEN_REGION_IMAGE: ViewStyle = {
  flex: 1,
  marginVertical: 10,
  height: 150,
  borderRadius: 25,
  overflow: "hidden",
  opacity: 0.9
};

export const HOME_SCREEN_IMAGE_TEXT_CONTAINER: ViewStyle = {
  justifyContent: "flex-end",
  flexDirection: "column",
  flex: 1
};

export const HOME_SCREEN_IMAGE_FIRST_WRAPPER: ViewStyle = {
  width: "60%",
};

export const HOME_SCREEN_IMAGE_RATING_WRAPPER: ViewStyle = {
  backgroundColor: 'rgba(150, 150, 150, 0.7)',
  borderRadius: 25,
  margin: 10,
  width: "36%",
};

export const HOME_SCREEN_IMAGE_TEXT: TextStyle = {
  color: 'white',
  marginVertical: 5,
  marginHorizontal: 10,
  fontSize: 18,
  fontWeight: "bold"
};

export const HOME_SCREEN_IMAGE_RATING_TEXT: TextStyle = {
  color: 'white',
  marginVertical: 5,
  marginHorizontal: 10,
  fontSize: 14,
  fontWeight: "bold"
};
/* HomeScreen ends */
