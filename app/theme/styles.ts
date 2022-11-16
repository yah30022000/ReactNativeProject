/**
 * CSS Styles
 * */
import {TextStyle, ViewStyle} from "react-native";
import theme from "./theme";

/* Global Style starts */
export const HOME_BOTTOM_TAB: ViewStyle = {
  backgroundColor: "#FFFFFF",
  overflow: "hidden",
  borderTopEndRadius: 30,
  borderTopStartRadius: 30,
  marginTop: -40,
  height: 80,
  shadowOpacity: 0.9,
  shadowRadius: 10,
  shadowColor: "#000",
  elevation: 24,
};

/* Global Style ends */

/* HomeScreen starts */
export const HOME_SCREEN_VIEW: ViewStyle = {
  flex: 1,
  paddingHorizontal: 20,
  backgroundColor: "#f2f2f2",
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
  width: "50%",
  paddingRight: 15,
};

export const HOME_SCREEN_IMAGE_ROW_RIGHT: ViewStyle = {
  width: "50%",
  paddingLeft: 15,
};

export const HOME_SCREEN_REGION_IMAGE: ViewStyle = {
  flex: 1,
  marginVertical: 10,
  height: 150,
  borderRadius: 25,
  overflow: "hidden",
  opacity: 0.9,
};

export const HOME_SCREEN_IMAGE_TEXT_CONTAINER: ViewStyle = {
  justifyContent: "flex-end",
  flexDirection: "column",
  flex: 1,
};

export const HOME_SCREEN_IMAGE_FIRST_WRAPPER: ViewStyle = {
  width: "60%",
};

export const HOME_SCREEN_IMAGE_RATING_WRAPPER: ViewStyle = {
  backgroundColor: "rgba(150, 150, 150, 0.7)",
  borderRadius: 25,
  margin: 10,
  width: "40%",
};

export const HOME_SCREEN_IMAGE_TEXT: TextStyle = {
  color: "white",
  marginVertical: 5,
  marginHorizontal: 10,
  fontSize: 18,
  fontWeight: "bold",
};

export const HOME_SCREEN_IMAGE_RATING_TEXT: TextStyle = {
  color: "white",
  marginVertical: 5,
  marginHorizontal: 10,
  fontSize: 14,
  fontWeight: "bold",
};
/* HomeScreen ends */

/* HotelSearchScreen start*/
export const HOTEL_SEARCH_SCREEN: ViewStyle = {
  flex: 1,
  paddingTop: 60,
};

export const HOTEL_BACK_BUTTON: ViewStyle = {
  paddingHorizontal: 20,
  justifyContent: "flex-start",
  width: 80,
};

export const HOTEL_LOCATION_BUTTON: ViewStyle = {
  paddingHorizontal: 30,
  display: "flex",
  justifyContent: "flex-start",
  flexDirection: "row",
};

export const LOCATION_TEXT: ViewStyle = {
  paddingLeft: 15,
};

export const DATE_TEXT: ViewStyle = {
  paddingLeft: 15,
};

export const USER_TEXT: ViewStyle = {
  paddingLeft: 15,
};

export const HOTEL_DATE_BUTTON: ViewStyle = {
  paddingHorizontal: 30,
  display: "flex",
  justifyContent: "flex-start",
  flexDirection: "row",
};
export const HOTEL_USER_BUTTON: ViewStyle = {
  paddingHorizontal: 30,
  display: "flex",
  justifyContent: "flex-start",
  flexDirection: "row",
};
export const HOTEL_SEARCH_SCREEN_LOCATION_TEXT: TextStyle = {
  fontSize: 18,
  fontWeight: "bold",
};
export const HOTEL_SEARCH_SCREEN_DESTINATION_TEXT: TextStyle = {
  fontSize: 16,
  color: "grey",
  marginTop: 10,
};

export const HOTEL_SEARCH_SCREEN_DATE_TEXT: TextStyle = {
  fontSize: 18,
  fontWeight: "bold",
};

export const HOTEL_SEARCH_SCREEN_SELECT_DATE_TEXT: TextStyle = {
  fontSize: 16,
  color: "grey",
  marginTop: 10,
};

export const HOTEL_SEARCH_SCREEN_USER_ROOMS_TEXT: TextStyle = {
  fontSize: 16,
  color: "grey",
  marginTop: 10,
};
export const HOTEL_SEARCH_SCREEN_USER_TEXT: TextStyle = {
  fontSize: 18,
  fontWeight: "bold",
};

export const HOTEL_SEARCH_SCREEN_TITLE_ROW: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  marginVertical: 40,
  height: "15%",
};
export const HOTEL_SEARCH_SCREEN_TITLE_TEXT: TextStyle = {
  fontWeight: "bold",
  lineHeight: 60,
  fontSize: 30,
  color: "white",
};

export const HOTEL_SEARCH_SCREEN_SUBTITLE_TEXT: TextStyle = {
  fontSize: 14,
  color: "white",
};

export const HOTEL_BOTTOM_SHEET: ViewStyle = {
  flex: 1,
  backgroundColor: "grey",
};

export const HOTEL_SEARCH_SCREEN_DIVIDER_LINE: ViewStyle = {
  backgroundColor: theme.colors.grey,
  marginVertical: 20,
  marginHorizontal: 13,
};

export const HOTEL_SEARCH_BUTTON: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
};

/* HotelSearchScreen ends */
