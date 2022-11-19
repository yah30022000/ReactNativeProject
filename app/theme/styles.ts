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

export const HOTEL_CROSS_BUTTON: ViewStyle = {
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

export const FILTER_TEXT: ViewStyle = {
  paddingLeft: 15,
};

export const USER_TEXT: ViewStyle = {
  paddingLeft: 15,
};

export const HOTEL_FILTER_BUTTON: ViewStyle = {
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

export const HOTEL_SEARCH_SCREEN_FILTER_TEXT: TextStyle = {
  fontSize: 18,
  fontWeight: "bold",
};

export const HOTEL_SEARCH_SCREEN_SELECT_RATING_TEXT: TextStyle = {
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
  marginVertical: 18,
  marginHorizontal: 40,
  flexDirection: "column",
};

export const HOTEL_SEARCH_BUTTON: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
};

export const HOTEL_SEARCH_BOOKING_HOTELS_TEXT: TextStyle = {
  fontWeight: "bold",
  fontSize: 20,
  marginTop: 20,
  paddingBottom: 20,
  paddingLeft: 35,
};

export const HOTEL_SEARCH_BAR: ViewStyle = {
  borderRadius: 20,
};

// export const HOTEL_SEARCH_BOOKING_DATE_TEXT: TextStyle = {
//   fontWeight: "bold",
//   fontSize: 20,
//   marginTop: 20,
//   paddingBottom: 20,
//   paddingLeft: 20,
// };

export const HOTEL_SEARCH_ROOM_TEXT: TextStyle = {
  fontSize: 16,
  fontWeight: "bold",
  textAlign: "center",
};

export const HOTEL_SEARCH_DESTINATION_BUTTON: ViewStyle = {
  paddingHorizontal: 30,
  display: "flex",
  justifyContent: "flex-start",
  flexDirection: "column",
};

export const HOTEL_SEARCH_YOUR_BOOKING_HOTELS_DESTINATION: ViewStyle = {
  marginTop: 20,
  paddingLeft: 30,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  paddingTop: 10,
};

export const HOTEL_SEARCH_BOOKING_ROOM_TEXT: TextStyle = {
  fontWeight: "bold",
  fontSize: 20,
  marginTop: 20,
  paddingLeft: 20,
};

export const HOTEL_SEARCH_BOOKING_ADULTS_ROW: TextStyle = {
  fontSize: 16,
  marginTop: 10,
  marginBottom: 10,
  paddingLeft: 20,
  height: "12%",
  justifyContent: "space-between",
  flexDirection: "row",
};

export const HOTEL_SEARCH_BOOKING_ADULTS_LEFT_COLUMN: ViewStyle = {
  flexGrow: 1,
  flexDirection: "row",
  alignItems: "center",
};

export const HOTEL_SEARCH_BOOKING_ADULTS_RIGHT_COLUMN: ViewStyle = {
  flexGrow: 1,
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  paddingHorizontal: 50,
};

export const HOTEL_ADULTS_MINUS_BUTTON: ViewStyle = {
  marginBottom: -10,
};

export const HOTEL_ADULTS_ADD_BUTTON: ViewStyle = {
  marginBottom: -10,
};

export const HOTEL_SEARCH_ADULTS_TEXT: TextStyle = {
  fontSize: 18,
};

export const HOTEL_SEARCH_HOTEL_RATING: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
};

export const HOTEL_SEARCH_HOTEL_CLASS_TEXT: TextStyle = {
  fontWeight: "bold",
  fontSize: 20,
};

/* HotelSearchScreen ends */

/*HotelListScreen start */

export const HOTEL_LIST_BACK_BUTTON: ViewStyle = {
  justifyContent: "space-between",
  flexDirection: "row",
  marginLeft: 20,
  paddingTop: 20,
};

export const HOTEL_LIST_SCREEN_TITLE: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 20,
};

export const HOTEL_LIST_SCREEN_TITLE_TEXT: TextStyle = {
  fontWeight: "bold",
  fontSize: 20,
  color: "black",
};

export const HOTEL_LIST_SCREEN_HOTELS_LEFT_COLUMN: ViewStyle = {
  flexDirection: "row",
};

export const HOTEL_LIST_SCREEN_HOTELS_RIGHT_COLUMN: ViewStyle = {
  flexDirection: "column",
  marginLeft: 20,
};

export const HOTEL_LIST_SCREEN_IMAGE: ViewStyle = {
  paddingLeft: 20,
};

export const HOTEL_LIST_HOTEL_NAME: ViewStyle = {};
export const HOTEL_LIST_HOTEL_NAME_TEXT: TextStyle = {
  fontSize: 16,
  fontWeight: "bold",
};

export const HOTEL_LIST_HOTEL_ADDRESS: ViewStyle = {};

export const HOTEL_LIST_HOTEL_ADDRESS_TEXT: TextStyle = {
  fontSize: 14,
  color: "grey",
  marginTop: 10,
};
