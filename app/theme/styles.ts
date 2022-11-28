/**
 * CSS Styles
 * */
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";
import theme from "./theme";

/* Global Style starts */
export const HOME_BOTTOM_TAB: ViewStyle = {
  backgroundColor: "#FFFFFF",
  overflow: "hidden",
  borderTopEndRadius: 30,
  borderTopStartRadius: 30,
  marginTop: -40,
  // height: 80,
  shadowOpacity: 0.9,
  shadowRadius: 10,
  shadowColor: "#000",
  elevation: 24,
};

/* Global Style ends */

/* Get start Screen Start */
export const ONBOARDING_SCREEN: ViewStyle = {
  flex: 1,
  zIndex: 100,
};

export const ONBOARDING_SCREEN_TITLE_ROW: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  marginVertical: 60,
  position: "absolute",
  left: 0,
  right: 0,
};

export const ONBOARDING_SCREEN_BRAND_LOGO: ImageStyle = {
  height: 250,
  width: 250,
};

export const ONBOARDING_SCREEN_TITLE: ViewStyle = {
  paddingTop: 20,
  alignItems: "center",
  justifyContent: "center",
};

export const ONBOARDING_SCREEN_TITLE_TEXT: TextStyle = {
  fontWeight: "bold",
  fontSize: 20,
};

export const ONBOARDING_SCREEN_SUBTITLE: ViewStyle = {
  paddingTop: 20,
  alignItems: "center",
  justifyContent: "center",
  marginHorizontal: 20,
  height: 90,
};

export const ONBOARDING_SCREEN_SUBTITLE_TEXT: TextStyle = {
  fontSize: 16,
  color: "grey",
  textAlign: "center",
};

export const ONBOARDING_BOTTOM_BUTTON_ROW_WRAPPER: ViewStyle = {
  position: "absolute",
  bottom: 80,
  width: "100%",
  flexDirection: "column",
  alignItems: "center",
  // justifyContent: "center",
};

export const ONBOARDING_BOTTOM_BUTTON_TOUCHABLE: ViewStyle = {
  width: "75%",
  height: 60,
  display: "flex",
  justifyContent: "center",
  flexDirection: "row",
};

export const ONBOARDING_BOTTOM_BUTTON_WRAPPER: ViewStyle = {
  height: "100%",
  width: "100%",
  borderRadius: 25,
  backgroundColor: theme.colors.mint,
  // marginVertical: 70,
  justifyContent: "center",
  alignItems: "center",
};

export const ONBOARDING_BOTTOM_BUTTON_TEXT: TextStyle = {
  color: "white",
  fontSize: 20,
};

export const ONBOARDING_SKIP_BUTTON_TOUCHABLE: ViewStyle = {
  width: "75%",
  height: 60,
  marginTop: 20,
  // display: "flex",
  justifyContent: "center",
  flexDirection: "row",
};

export const ONBOARDING_SKIP_BUTTON_WRAPPER: ViewStyle = {
  height: "100%",
  width: "100%",
  borderRadius: 25,
  backgroundColor: "transparent",
  justifyContent: "center",
  alignItems: "center",
};

export const ONBOARDING_SKIP_BUTTON_TEXT: TextStyle = {
  color: theme.colors.black,
  fontSize: 16,
};

/* Onboarding Screen ends */

/* PreLogin Screen starts */
export const PRE_LOGIN_SCREEN_VIEW: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
};

export const PRE_LOGIN_SCREEN_UPPER_ROW: ViewStyle = {
  flexGrow: 1,
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
};

export const PRE_LOGIN_SCREEN_UPPER_ROW_BRAND_LOGO: ImageStyle = {
  height: 250,
  width: 250,
};

export const PRE_LOGIN_SCREEN_LOWER_ROW: ViewStyle = {
  flexGrow: 1,
  // height: "60%",
  width: "100%",
  alignItems: "center",
  justifyContent: "space-around",
};

export const PRE_LOGIN_SCREEN_LOWER_ROW_TOUCHABLE: ViewStyle = {
  width: "80%",
  height: 50,
  display: "flex",
  justifyContent: "center",
  flexDirection: "row",
};

export const PRE_LOGIN_SCREEN_LOWER_ROW_LOGIN_REGISTER: ViewStyle = {
  width: "100%",
  flexDirection: "row",
  justifyContent: "space-around",
};

export const PRE_LOGIN_SCREEN_LOGIN_REGISTER_BUTTON_CUSTOM: ViewStyle = {
  width: "50%",
};
/* PreLogin Screen ends */

/* Login Screen start*/

export const LOGIN_SCREEN_FORGOT_PASSWORD: ViewStyle = {
  width: "100%",
  alignItems: "flex-end",
  marginBottom: 24,
};

export const LOGIN_SCREEN_FORGOT_PASSWORD_TEXT: TextStyle = {
  flexDirection: "row",
  marginTop: 4,
  color: "grey",
};

export const LOGIN_SCREEN_LOGIN_TAB_VIEW: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
};

export const LOGIN_SCREEN_LOGIN_TAB_UPPER_ROW: ViewStyle = {
  width: "100%",
  height: "60%",
  paddingHorizontal: "10%",
};

export const LOGIN_SCREEN_LOGIN_TAB_FORGOT_PASSWORD_TEXT: TextStyle = {
  color: "#A0A0A0",
  textAlign: "center",
};

export const LOGIN_SCREEN_TEXT_INPUT_WRAPPER: ViewStyle = {
  marginVertical: 10,
};

export const LOGIN_SCREEN_BOTTOM_BUTTON_ROW_WRAPPER: ViewStyle = {
  position: "absolute",
  bottom: 80,
  width: "100%",
  flexDirection: "row",
  justifyContent: "center",
};

export const LOGIN_SCREEN_BOTTOM_BUTTON_TOUCHABLE: ViewStyle = {
  width: "75%",
  height: 60,
  display: "flex",
  justifyContent: "center",
  flexDirection: "row",
};

export const LOGIN_SCREEN_BOTTOM_BUTTON_WRAPPER: ViewStyle = {
  height: "100%",
  width: "100%",
  borderRadius: 25,
  backgroundColor: theme.colors.mint,
  // marginVertical: 70,
  justifyContent: "center",
  alignItems: "center",
};

export const LOGIN_SCREEN_BOTTOM_BUTTON: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
};
export const LOGIN_SCREEN_BOTTOM_BUTTON_TEXT: TextStyle = {
  color: "white",
  fontSize: 20,
};

/* Login Screen end */

/* Register Tab start*/
export const LOGIN_SCREEN_REGISTER_TAB_VIEW: ViewStyle = {
  flex: 1,
  paddingTop: "15%",
  justifyContent: "flex-start",
  alignItems: "center",
};

export const LOGIN_SCREEN_REGISTER_TAB_UPPER_ROW: ViewStyle = {
  width: "100%",
  height: "60%",
  paddingHorizontal: "10%",
};

export const LOGIN_SCREEN_REGISTER_TAB_TNC_TEXT: TextStyle = {
  color: "#A0A0A0",
  textAlign: "center",
};

/* Register Tab end*/

/* RegisterVerifyScreen start */
export const REGISTER_VERIFY_SCREEN_TITLE_ROW: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  height: "10%",
  marginTop: 50,
};

export const REGISTER_VERIFY_SCREEN_OTP_ROW: ViewStyle = {
  height: "20%",
  marginHorizontal: 20,
};

export const REGISTER_VERIFY_SCREEN_OTP_FOCUS: ViewStyle = {
  backgroundColor: theme.colors.mintLight,
  borderColor: theme.colors.mint,
  borderWidth: 1,
};

export const REGISTER_VERIFY_SCREEN_OTP_INPUT_CONTAINER: ViewStyle = {
  backgroundColor: theme.colors.greyLight,
  height: 70,
  width: "15%",
  borderRadius: 25,
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
};

export const REGISTER_VERIFY_SCREEN_OTP_INPUT: TextStyle = {
  fontSize: 40,
  color: theme.colors.black,
};

export const REGISTER_VERIFY_SCREEN_MISC_STYLE: ViewStyle = {
  flexDirection: "row",
  height: "100%",
  width: "100%",
  justifyContent: "space-around",
  alignItems: "center",
};

export const REGISTER_VERIFY_SCREEN_RESEND_BUTTON_ROW_WRAPPER: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  height: "10%",
};

export const REGISTER_VERIFY_SCREEN_RESEND_BUTTON_TOUCHABLE: ViewStyle = {
  width: "75%",
  height: 60,
  display: "flex",
  justifyContent: "center",
  flexDirection: "row",
};

export const REGISTER_VERIFY_SCREEN_RESEND_BUTTON_WRAPPER: ViewStyle = {
  height: "100%",
  width: "80%",
  borderRadius: 25,
  // marginVertical: 70,
  justifyContent: "center",
  alignItems: "center",
};

export const REGISTER_VERIFY_SCREEN_RESEND_BUTTON: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
};
export const REGISTER_VERIFY_SCREEN_RESEND_BUTTON_TEXT: TextStyle = {
  color: "white",
  fontSize: 20,
};

export const REGISTER_VERIFY_SCREEN_VERIFY_BUTTON_ROW_WRAPPER: ViewStyle = {
  position: "absolute",
  bottom: 80,
  width: "100%",
  flexDirection: "row",
  justifyContent: "center",
};

export const REGISTER_VERIFY_SCREEN_VERIFY_BUTTON_TOUCHABLE: ViewStyle = {
  width: "75%",
  height: 60,
  display: "flex",
  justifyContent: "center",
  flexDirection: "row",
};

export const REGISTER_VERIFY_SCREEN_VERIFY_BUTTON_WRAPPER: ViewStyle = {
  height: "100%",
  width: "100%",
  borderRadius: 25,
  backgroundColor: theme.colors.mint,
  // marginVertical: 70,
  justifyContent: "center",
  alignItems: "center",
};

export const REGISTER_VERIFY_SCREEN_VERIFY_BUTTON: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
};
export const REGISTER_VERIFY_SCREEN_VERIFY_BUTTON_TEXT: TextStyle = {
  color: "white",
  fontSize: 20,
};

/* RegisterVerifyScreen end */

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

export const HOME_SCREEN_IMAGE_SCROLL_VIEW: ViewStyle = {
  // height: 100
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
  marginVertical: 20,
  height: "15%",
};

export const HOTEL_SEARCH_CITYNAME: ViewStyle = {
  justifyContent: "flex-start",
  flexDirection: "row",
};

export const HOTEL_SEARCH_CITYNAME_TEXT: TextStyle = {
  fontSize: 20,
  color: "#767676",
  paddingTop: 5,
  paddingLeft: 5,
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

export const HOTEL_SEARCH_BAR_DIVIDER_LINE: ViewStyle = {
  backgroundColor: theme.colors.grey,
  marginVertical: 15,
  marginHorizontal: 40,
  flexDirection: "column",
};

export const HOTEL_SEARCH_SCREEN_DIVIDER_LINE: ViewStyle = {
  backgroundColor: theme.colors.grey,
  marginVertical: 16,
  marginHorizontal: 15,
  flexDirection: "column",
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

export const HOTEL_SEARCH_CALENDAR_WRAPPER: ViewStyle = {
  height: "100%",
  width: "100%"
}

export const HOTEL_SEARCH_BOOKING_DESTINATION_TEXT: TextStyle = {
  paddingLeft: 20,
  paddingBottom: 10,
};

export const HOTEL_SEARCH_BOOKING_ROOM_TEXT_ROW: ViewStyle = {
  marginBottom: 15
}

export const HOTEL_SEARCH_BOOKING_ROOM_TEXT: TextStyle = {
  fontWeight: "bold",
  fontSize: 20,
  marginTop: 20,
  paddingLeft: 20,
};

export const HOTEL_SEARCH_BOOKING_ADVANCED_ROW: TextStyle = {
  fontSize: 16,
  marginVertical: 5,
  paddingLeft: 20,
  height: "8%",
  justifyContent: "space-between",
  flexDirection: "row",
};

export const HOTEL_SEARCH_BOOKING_ADVANCED_LEFT_COLUMN: ViewStyle = {
  flexGrow: 1,
  flexDirection: "row",
  alignItems: "center",
};

export const HOTEL_SEARCH_BOOKING_ADVANCED_RIGHT_COLUMN: ViewStyle = {
  flexGrow: 1,
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  paddingHorizontal: 50,
};

export const HOTEL_ADVANCED_MINUS_BUTTON: ViewStyle = {
  marginBottom: -10,
};

export const HOTEL_ADVANCED_ADD_BUTTON: ViewStyle = {
  marginBottom: -10,
};

export const HOTEL_SEARCH_ADVANCED_TEXT: TextStyle = {
  fontSize: 20,
};

export const HOTEL_SEARCH_HOTEL_RATING: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
};

export const HOTEL_SEARCH_MULTI_SELECT = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.mint,
    height: 60,
  },
  modalWrapper: {
    paddingVertical: 40,
  },
  container: {
    borderRadius: 30,
  },
  item: {
    height: 60,
  },
  itemText: {
    fontSize: 18,
  },
  searchBar: {
    height: 60,
    backgroundColor: theme.colors.greyLight,
  },
  selectToggleText: {
    fontSize: 18,
  },
  selectedItemText: {
    color: theme.colors.green,
  },
  separator: {
    backgroundColor: theme.colors.grey,
  },
  chipContainer: {
    backgroundColor: theme.colors.mint,
  },
  chipText: {
    color: theme.colors.white,
  },
  listContainer: {
    padding: 100,
  },
})

export const HOTEL_SEARCH_FLAT_LIST_WRAPPER: ViewStyle = {
  height: "100%",
};

export const HOTEL_SEARCH_FLAT_LIST: ViewStyle = {paddingTop: 25, flex: 1};


export const HOTEL_SEARCH_BOTTOM_BUTTON_ROW_WRAPPER: ViewStyle = {
  position: "absolute",
  bottom: 80,
  width: "100%",
  flexDirection: "row",
  justifyContent: "center",
};

export const HOTEL_SEARCH_BOTTOM_BUTTON_TOUCHABLE: ViewStyle = {
  width: "80%",
  height: 60,
  display: "flex",
  justifyContent: "center",
  flexDirection: "row",
};

export const HOTEL_SEARCH_BOTTOM_BUTTON_WRAPPER: ViewStyle = {
  height: "100%",
  width: "100%",
  borderRadius: 25,
  backgroundColor: theme.colors.mint,
  // marginVertical: 70,
  justifyContent: "center",
  alignItems: "center",
};

export const HOTEL_SEARCH_BOTTOM_BUTTON: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
};

export const HOTEL_SCREEN_MODAL_CONTENT_CONTAINER: ViewStyle = {
  backgroundColor: "white",
  padding: 20,
  height: "60%",
  width: "90%",
  alignSelf: "center",
  borderRadius: 35,
}

export const HOTEL_SCREEN_MODAL_CONTENT_VIEW: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-around",
}

/* HotelSearchScreen ends */

/*HotelListScreen start */

export const HOTEL_LIST_BACK_BUTTON: ViewStyle = {
  justifyContent: "space-between",
  flexDirection: "row",
};

export const HOTEL_LIST_SCREEN_TITLE: ViewStyle = {
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  // marginBottom: 20,
  flexGrow: 0.6,
};

export const HOTEL_LIST_SCREEN_TITLE_TEXT: TextStyle = {
  fontWeight: "bold",
  fontSize: 20,
  color: "black",
};

export const HOTEL_LIST_FLAT_LIST_WRAPPER: ViewStyle = {
  height: "100%",
  width: "100%",
  backgroundColor: "#FFFFFF",
  paddingHorizontal: "5%",
};

export const HOTEL_LIST_SCREEN_HOTELS_LEFT_COLUMN: ViewStyle = {
  flexDirection: "row",
};

export const HOTEL_LIST_SCREEN_HOTELS_RIGHT_COLUMN: ViewStyle = {
  flexDirection: "column",
  marginLeft: 20,
  width: "100%",
  justifyContent: "flex-start",
};

export const HOTEL_LIST_SCREEN_IMAGE_WRAPPER: ViewStyle = {
  // paddingLeft: 20,
};

export const HOTEL_LIST_SCREEN_IMAGE: ImageStyle = {
  width: 100,
  height: 130,
  borderRadius: 20,
}

export const HOTEL_LIST_HOTEL_NAME: ViewStyle = {
  width: "60%",
};
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

export const HOTEL_LIST_PRICE: ViewStyle = {
  flexDirection: "column",
  justifyContent: "space-between",
  width: "70%"
}

export const HOTEL_LIST_PRICE_TEXT_HALF_WRAPPER: ViewStyle = {
  flexGrow: 1
}

export const HOTEL_LIST_PRICE_TEXT: TextStyle = {
  fontSize: 14,
  color: "grey",
  marginTop: 10,
};


/*HotelListScreen end */

/*HotelFilterScreen start*/

export const HOTEL_SEARCH_FILTER_CROSS_BUTTON: ViewStyle = {
  justifyContent: "space-between",
  flexDirection: "row",
  // marginLeft: 20,
  paddingTop: 20,
};

export const HOTEL_FILTER_PRICE_RANGE_TEXT: TextStyle = {
  fontSize: 14,
  fontWeight: "bold",
};

export const HOTEL_SEARCH_FILTER_SCREEN_TITLE_TEXT: TextStyle = {
  fontWeight: "bold",
  fontSize: 20,
  color: "black",
};

export const HOTEL_SEARCH_FILTER_PRICE_RANGE: ViewStyle = {
  justifyContent: "flex-start",
  flexDirection: "row",
  marginLeft: 20,
  paddingTop: 20,
};

export const HOTEL_SEARCH_FILTER_PRICE_RANGE_TEXT: TextStyle = {
  fontSize: 20,
  fontWeight: "bold",
};

export const HOTEL_SEARCH_FILTER_PRICE: ViewStyle = {
  justifyContent: "flex-end",
  flexDirection: "row",
  paddingTop: 20,
  marginRight: 20,
};

export const HOTEL_SEARCH_FILTER_PRICE_TEXT: TextStyle = {
  fontSize: 18,
};

export const HOTEL_FILTER_BOTTOM_BUTTON_TOUCHABLE: ViewStyle = {
  width: 200,
  height: 50,
  display: "flex",
  justifyContent: "center",
  flexDirection: "row",
};

export const HOTEL_FILTER_BOTTOM_BUTTON_WRAPPER: ViewStyle = {
  height: "100%",
  width: "100%",
  borderRadius: 25,
  backgroundColor: theme.colors.mint,
  marginVertical: 150,
  justifyContent: "center",
  alignItems: "center",
};

export const HOTEL_FILTER_BOTTOM_BUTTON: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
};

export const HOTEL_FILTER_DIVIDER_LINE: ViewStyle = {
  backgroundColor: theme.colors.grey,
  marginVertical: 18,
  marginHorizontal: 40,
  flexDirection: "column",
};

export const HOTEL_SEARCH_FILTER_SCREEN__DATE: ViewStyle = {
  justifyContent: "flex-start",
  flexDirection: "row",
  marginRight: 20,
};

export const HOTEL_SEARCH_FILTER_SCREEN_DATE_TEXT: TextStyle = {
  fontSize: 16,
  fontWeight: "bold",
};

export const HOTEL_SEARCH_FILTER_RIGHT_BUTTON: ViewStyle = {
  // justifyContent: "flex-end",
  // flexDirection: "row",
  // paddingBottom: 10,
};

export const HOTEL_SEARCH_FILTER_SCREEN_ROOM_TYPE: ViewStyle = {
  justifyContent: "flex-start",
  flexDirection: "row",
  marginRight: 20,
};

export const HOTEL_SEARCH_FILTER_SCREEN_ROOM_TYPE_TEXT: TextStyle = {
  fontSize: 16,
  fontWeight: "bold",
};

export const HOTEL_SEARCH_FILTER_DATE_COLUMN: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
};

export const HOTEL_SEARCH_FILTER_ROOM_TYPE_COLUMN: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
};

export const HOTEL_SEARCH_FILTER_PAYMENT_COLUMN: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
};

export const HOTEL_SEARCH_FILTER_PAYMENT_TYPE: ViewStyle = {
  justifyContent: "flex-start",
  flexDirection: "row",
  marginRight: 20,
};

export const HOTEL_SEARCH_FILTER_SCREEN_PAYMENT_TEXT: TextStyle = {
  fontSize: 16,
  fontWeight: "bold",
};

export const HOTEL_SEARCH_FILTER_BED_TYPE_COLUMN: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
};

export const HOTEL_SEARCH_FILTER_SCREEN_BED_TYPE: ViewStyle = {
  justifyContent: "flex-start",
  flexDirection: "row",
  marginRight: 20,
};

export const HOTEL_SEARCH_FILTER_SCREEN_BED_TYPE_TEXT: TextStyle = {
  fontSize: 16,
  fontWeight: "bold",
};
export const HOTEL_FILTER_BUTTON_ICON: ViewStyle = {
  justifyContent: "center",
  flexDirection: "row",
};

/* HotelFilterScreen end */

/* HotelDetailScreen start */

export const HOTEL_DETAIL_SCREEN: ViewStyle = {
  flex: 1,
  paddingTop: 60,
};

export const HOTEL_DETAIL_SCREEN_BACK_BUTTON_ROW: ViewStyle = {
  paddingHorizontal: 20,
  justifyContent: "flex-start",
  width: 80,
};

export const HOTEL_DETAIL_SCREEN_TITLE_WRAPPER: ViewStyle = {
  marginVertical: 20,
  marginHorizontal: 20,
  height: "15%",
  flexDirection: "column",
  justifyContent: "flex-end"
};

export const HOTEL_DETAIL_SCREEN_TITLE_ROW: ViewStyle = {
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
}

export const HOTEL_DETAIL_SCREEN_TITLE_TEXT: TextStyle = {
  fontWeight: "bold",
  // lineHeight: 60,
  maxHeight: 80,
  fontSize: 30,
  color: "white",
};

export const HOTEL_DETAIL_SCREEN_SUBTITLE_TEXT: TextStyle = {
  fontSize: 16,
  marginRight: 10,
  fontWeight: "bold",
  color: "white",
};

export const HOTEL_DETAIL_SCREEN_BOTTOM_SHEET_FIRST_VIEW: ViewStyle = {
  marginTop: 20,
  marginHorizontal: 20
}

export const HOTEL_DETAIL_SCREEN_PRICE_ROW: ViewStyle = {
  flexDirection: "row",
  justifyContent:"space-between",
  marginVertical: 10
}

export const HOTEL_DETAIL_SCREEN_PRICE_TEXT: TextStyle = {
  fontSize: 18,
};

export const HOTEL_DETAIL_SCREEN_PRICE_AMOUNT_TEXT: TextStyle = {
  fontSize: 18,
  fontWeight: "bold"
};

export const HOTEL_DETAIL_SCREEN_DIVIDER_LINE: ViewStyle = {
  backgroundColor: theme.colors.grey,
  marginVertical: 15,
  // marginHorizontal: 15,
  flexDirection: "column",
};

export const HOTEL_DETAIL_SCREEN_HOTEL_INFO_TEXT: TextStyle = {
  fontWeight: "bold",
  fontSize: 20,
  marginTop: 10,
  paddingBottom: 10,
};

export const HOTEL_DETAIL_SCREEN_HOTEL_INFO_LOGO_ROW: ViewStyle = {
  flexDirection: "column",
}

export const HOTEL_DETAIL_SCREEN_HOTEL_INFO_FLAT_LIST:ViewStyle = {
  marginVertical: 15,
}

export const HOTEL_DETAIL_SCREEN_HOTEL_INFO_FLAT_LIST_CONTAINER: ViewStyle = {
  justifyContent: "space-between",
  flexDirection: "row"
}

/* HotelDetailScreen end*/

/* PaymentScreen start */
export const PAYMENT_SCREEN_BACK_BUTTON: ViewStyle = {
  justifyContent: "space-between",
  flexDirection: "row",
  marginLeft: 20,
  paddingTop: 20,
};

export const PAYMENT_SCREEN_TITLE_TEXT: TextStyle = {
  fontWeight: "bold",
  color: "white",
  fontSize: 18,
};

export const PAYMENT_SCREEN_TITLE: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  marginHorizontal: 60,
};

export const PAYMENT_SCREEN_BOTTOM_SHEET: ViewStyle = {
  borderRadius: 30,
  paddingHorizontal: 25,
  overflow: "hidden",
};

export const PAYMENT_SCREEN_BOTTOM_BUTTON_ROW_WRAPPER: ViewStyle = {
  position: "absolute",
  bottom: 80,
  width: "100%",
  flexDirection: "row",
  justifyContent: "center",
};

export const PAYMENT_SCREEN_BOTTOM_BUTTON_TOUCHABLE: ViewStyle = {
  width: "80%",
  height: 60,
  display: "flex",
  justifyContent: "center",
  flexDirection: "row",
};

export const CARD_HOLDER_NAME: ViewStyle = {
  paddingTop: 10,
  paddingBottom: 10,
};

export const INPUT_CARD_NUMBER_ROW: ViewStyle = {
  borderRadius: 10,
  overflow: "hidden",
  marginBottom: 20,
};

export const INPUT_CARD_NAME_ROW: ViewStyle = {
  borderRadius: 10,
  overflow: "hidden",
  marginBottom: 20,
};

export const CARD_HOLDER_NAME_TEXT: TextStyle = {
  fontSize: 16,
};

export const CARD_NUMBER: TextStyle = {
  paddingTop: 10,
  paddingBottom: 10,
};

export const CARD_NUMBER_TEXT: TextStyle = {
  fontSize: 16,
};
export const EXP_DATE_CVV: ViewStyle = {
  width: "100%",
  flexDirection: "row",
  justifyContent: "space-between",
};

export const CARD_EXP_DATE_ROW: ViewStyle = {
  paddingBottom: 10,
};

export const CARD_EXP_DATE: ViewStyle = {
  // flexGrow: 1,
  width: "45%",
  marginRight: 10,
};

export const CARD_EXP_DATE_TEXT: TextStyle = {
  fontSize: 16,
};

export const EXP_DATE_INPUT_TEXT: ViewStyle = {
  borderRadius: 10,
  overflow: "hidden",
};

export const CARD_EXP_DATE_TEXT_COLUMN: ViewStyle = {
  paddingBottom: 10,
  paddingTop: 10,
};

export const CARD_CVV: ViewStyle = {
  marginLeft: 10,
  width: "45%",
  // flexGrow: 1,
};

export const CARD_CVV_TEXT: TextStyle = {
  fontSize: 16,
};

export const PAYMENT_SCREEN_BOTTOM_BUTTON_WRAPPER: ViewStyle = {
  height: "100%",
  width: "100%",
  borderRadius: 25,
  backgroundColor: theme.colors.mint,
  // marginVertical: 70,
  justifyContent: "center",
  alignItems: "center",
};

export const PAYMENT_SCREEN_BOTTOM_BUTTON: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
};

export const PAYMENT_SCREEN_BOTTOM_BUTTON_TEXT: TextStyle = {
  color: "white",
  fontSize: 18,
};

/* PaymentScreen end */

/* profile Screen start */

export const PROFILE_SCREEN:ViewStyle = {
  flex: 1,
  paddingHorizontal: 20
}

export const PROFILE_SCREEN_TITLE: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  marginVertical: 30,
};

export const PROFILE_SCREEN_TITLE_TEXT: TextStyle = {
  fontSize: 20,
  fontWeight: "bold",
};

export const PROFILE_SCREEN_USER_IMAGE_ROW: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  marginVertical: 10,
}

export const PROFILE_SCREEN_USER_IMAGE: ImageStyle = {
  borderRadius: 100,
  height: 150,
  width: 150,
}

export const PROFILE_SCREEN_EDIT_BUTTON: ViewStyle = {
  position: "absolute",
  alignSelf: "flex-end",
  bottom: 0
};

export const PROFILE_SCREEN_PROFILE_USER_NAME: ViewStyle ={
  justifyContent: "center",
  flexDirection: "row",
  marginVertical: 10,
};

export const PROFILE_SCREEN_PROFILE_USER_NAME_TEXT: TextStyle = {
  fontSize: 20,
  fontWeight: "bold"
};

export const PROFILE_SCREEN_PROFILE_EMAIL: ViewStyle = {
  justifyContent: "center",
  flexDirection: "row",
  paddingBottom: 10, 
};

export const PROFILE_SCREEN_PROFILE_EMAIL_TEXT: TextStyle = {
  fontSize: 16,
};

export const PROFILE_SCREEN_DIVIDER_LINE: TextStyle ={
  backgroundColor: theme.colors.grey,
  marginVertical: 18,
  flexDirection: "column",
};

export const PROFILE_SCREEN_USER_ICON: ViewStyle = {
  marginLeft: 20,
  justifyContent: "flex-start",
  flexDirection: "row",
};

export const PROFILE_SCREEN_EDIT_PROFILE: ViewStyle ={
  height: 50,
  width: 200,
  marginLeft: 10,
  justifyContent: "flex-start",
  flexDirection: "row",
};

export const PROFILE_SCREEN_PAYMENT: ViewStyle = {
  marginLeft: 10,
  justifyContent: "flex-start",
  flexDirection: "row",
};

export const PROFILE_SCREEN_PAYMENT_TEXT: TextStyle = {
  color: "#555555",
  fontSize: 16,
};

export const PROFILE_SCREEN_EDIT_PROFILE_TEXT: TextStyle = {
  color: "#555555",
  fontSize: 16,
};

export const PROFILE_SCREEN_OPTION_ITEM: ViewStyle = {
  justifyContent: "flex-start",
  flexDirection: "row",
  alignItems: "center",
  marginVertical: 5
};

export const PROFILE_SCREEN_OPTION_ITEM_TEXT: TextStyle = {
  color: theme.colors.black,
  marginLeft: 15
};

export const PROFILE_SCREEN_PAYMENT_ICON: ViewStyle = {
  marginLeft: 20,
  justifyContent: "flex-start",
  flexDirection: "row",
  alignItems: "center"
};

export const PROFILE_SCREEN_NOTIFICATION_ICON: ViewStyle = {
  marginLeft: 20,
  justifyContent: "flex-start",
  flexDirection: "row",
};

export const PROFILE_SCREEN_NOTIFICATION: ViewStyle = {
  height: 50,
  width: 200,
  marginLeft: 10,
  justifyContent: "flex-start",
  flexDirection: "row",
};

export const PROFILE_SCREEN_NOTIFICATION_TEXT: TextStyle = {
  color: "#555555",
  fontSize: 16,
};

export const PROFILE_SCREEN_HELP_ICON: ViewStyle = {
  marginLeft: 20,
  justifyContent: "flex-start",
  flexDirection: "row",
};

export const PROFILE_SCREEN_HELP: ViewStyle = {
  height: 50,
  width: 200,
  marginLeft: 10,
  justifyContent: "flex-start",
  flexDirection: "row",
};

export const PROFILE_SCREEN_HELP_TEXT: TextStyle = {
  color: "#555555",
  fontSize: 16,
};

export const PROFILE_SCREEN_LOG_OUT_BUTTON: ViewStyle = {
  height: 50,
  width: 200,
  marginLeft: 20,
  justifyContent: "flex-start",
  flexDirection: "row",
};

export const PROFILE_SCREEN_LOG_OUT_BUTTON_TEXT: TextStyle = {
  color: "#F75554",
  fontSize: 16,
};

export const PROFILE_SCREEN_LOG_OUT_BUTTON_TEXT_ROW: ViewStyle = {
  justifyContent: "flex-start",
  flexDirection: "row",
  marginLeft: 10,
};
/* profile Screen end */

/*edit profile Screen start*/
export const EDIT_PROFILE_TITLE: ViewStyle = {

};