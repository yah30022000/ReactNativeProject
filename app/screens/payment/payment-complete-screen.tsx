import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { StackNavigatorParamList } from "../../navigators";
import { Divider as PaperDivider, Text as PaperText, useTheme } from "react-native-paper";
import { Image, SafeAreaView, ScrollView, TouchableHighlight, View } from "react-native";
import { HotelState, RootState, useAppDispatch } from "../../redux";
import { getSavedHotelBookingThunk } from "../../redux/hotel/thunk/getSavedHotelBookingThunk";
import {
  HOTEL_ROOM_SELECT_SCREEN_DIVIDER_LINE,
  HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_CONTAINER,
  HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_FIRST_ROW,
  HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_FIRST_ROW_LEFT_COLUMN,
  HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_SUBTEXT,
  HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_TEXT,
  HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_THIRD_ROW,
  HOTEL_ROOM_SELECT_SCREEN_IMAGE,
  HOTEL_ROOM_SELECT_SCREEN_PRICE_TEXT,
  PAYMENT_COMPLETE_SCREEN,
  PAYMENT_COMPLETE_SCREEN_BACK_BUTTON_TOUCHABLE,
  PAYMENT_COMPLETE_SCREEN_BACK_BUTTON_TOUCHABLE_WRAPPER,
  PAYMENT_COMPLETE_SCREEN_BOTTOM_BUTTON_TEXT,
  PAYMENT_COMPLETE_SCREEN_BOTTOM_SHEET,
  PAYMENT_COMPLETE_SCREEN_HEADER_ROW,
  PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER,
  PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_ROW,
  PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_ROW_LEFT_COLUMN,
  PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_TEXT,
  PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_TEXT_VIEW,
  PAYMENT_SCREEN_PAYMENT_METHOD_DIVIDER_LINE,
  PAYMENT_SCREEN_TITLE,
  PAYMENT_SCREEN_TITLE_TEXT,
} from "../../theme";
import { useSelector } from "react-redux";
import BottomSheet from "@gorhom/bottom-sheet";
import FontistoIcon from "react-native-vector-icons/Fontisto";
import { capitalizeString } from "../../helper";
import { Storage as AmplifyS3Storage } from "@aws-amplify/storage";

export interface PaymentCompleteScreenProps {
  bookingId?: string;
}

export const PaymentCompleteScreen: FC<StackScreenProps<StackNavigatorParamList, "paymentComplete">> = ({
                                                                                                          route,
                                                                                                          navigation,
                                                                                                        }) => {
  /* props */
  const bookingId = route.params?.bookingId ?? "BOOKING_ID";

  // local variables
  const snapPoints = useMemo<Array<string>>(() => ["85%"], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [roomImagePath, setRoomImagePath] = useState<string>();

  // global variables
  let currentQueryHotelBooking = useSelector<RootState>(
    (state) => state.hotel.currentQueryHotelBooking,
  ) as HotelState["currentQueryHotelBooking"] | undefined;

  const { colors } = useTheme();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSavedHotelBookingThunk(bookingId));
  }, []);

  useEffect(() => {
    if (currentQueryHotelBooking && currentQueryHotelBooking.offer.roomImageFileName) {
      AmplifyS3Storage.get(currentQueryHotelBooking.offer.roomImageFileName)
        .then((image) => {
          setRoomImagePath(image);
        });
    }
  }, [currentQueryHotelBooking]);

  return (
    <SafeAreaView style={PAYMENT_COMPLETE_SCREEN}>

      {/* Header Row */}
      <View style={PAYMENT_COMPLETE_SCREEN_HEADER_ROW}>

        {/* Back Button - Home */}
        <View style={PAYMENT_COMPLETE_SCREEN_BACK_BUTTON_TOUCHABLE_WRAPPER}>
          <TouchableHighlight
            style={PAYMENT_COMPLETE_SCREEN_BACK_BUTTON_TOUCHABLE}
            onPress={() => {
              navigation.popToTop();
            }}
            underlayColor={"transparent"}>
            <PaperText
              style={PAYMENT_COMPLETE_SCREEN_BOTTOM_BUTTON_TEXT}
              numberOfLines={1}>
              Home
            </PaperText>
          </TouchableHighlight>
        </View>

        <View style={{ ...PAYMENT_SCREEN_TITLE, width: "40%", marginHorizontal: 0 }}>
          <PaperText style={PAYMENT_SCREEN_TITLE_TEXT}>
            BOOKING RECORD
          </PaperText>
        </View>
        <View style={{ width: "30%" }} />
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        // onChange={handleSheetChanges}
        style={PAYMENT_COMPLETE_SCREEN_BOTTOM_SHEET}
        handleComponent={null}>
        <ScrollView style={{ height: "100%" }}>
          <View style={HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_CONTAINER}>
            {/* Room Title and Image Row */}
            <View
              style={HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_FIRST_ROW}>
              <View
                style={
                  HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_FIRST_ROW_LEFT_COLUMN
                }>

                {/* Hotel Name */}
                <View>
                  <PaperText
                    style={HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_TEXT}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {capitalizeString(currentQueryHotelBooking?.hotel.name ?? "Hotel")}
                  </PaperText>
                </View>

                {/* Room Name */}
                <View>
                  <PaperText
                    style={{
                      ...HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_TEXT,
                      fontWeight: "normal",
                      fontSize: 16,
                      marginTop: 8,
                    }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {capitalizeString(currentQueryHotelBooking?.offer.roomCategory ?? "Room")}
                  </PaperText>
                </View>

                {/* Room Attribute 1 */}
                <View>
                  <PaperText
                    style={HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_SUBTEXT}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    Adults: {currentQueryHotelBooking?.offer.adults}
                  </PaperText>
                </View>
                {/* Room Attribute 2 */}
                <View>
                  <PaperText
                    style={HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_SUBTEXT}
                    numberOfLines={3}
                    ellipsizeMode="tail"
                  >
                    {capitalizeString(currentQueryHotelBooking?.offer.roomDescription ?? "")}
                  </PaperText>
                </View>
              </View>

              <View>
                <Image
                  style={{
                    ...HOTEL_ROOM_SELECT_SCREEN_IMAGE,
                    height: 140, width: 110,
                  }}
                  source={
                    roomImagePath ?
                      { uri: roomImagePath } :
                      require("@travelasset/images/crown-hotel.jpeg")
                  }
                />
              </View>
            </View>

            <PaperDivider
              style={HOTEL_ROOM_SELECT_SCREEN_DIVIDER_LINE}
            />

            {/* Check in Row */}
            <View style={HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_THIRD_ROW}>
              {/* Check in text */}
              <View style={{ flexGrow: 1 }}>
                <PaperText style={HOTEL_ROOM_SELECT_SCREEN_PRICE_TEXT}>
                  Check - in:
                </PaperText>
              </View>

              {/* Check in date */}
              <View style={{ flexGrow: 1 }}>
                <PaperText style={{
                  ...HOTEL_ROOM_SELECT_SCREEN_PRICE_TEXT,
                  fontWeight: "bold",
                  textAlign: "right",
                }}>
                  {currentQueryHotelBooking?.offer.checkInDate}
                </PaperText>
              </View>
            </View>

            {/* Check out Row */}
            <View style={{ ...HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_THIRD_ROW, paddingTop: 0 }}>
              {/* Check out text */}
              <View style={{ flexGrow: 1 }}>
                <PaperText style={HOTEL_ROOM_SELECT_SCREEN_PRICE_TEXT}>
                  Check - out:
                </PaperText>
              </View>

              {/* Check in date */}
              <View style={{ flexGrow: 1 }}>
                <PaperText style={{
                  ...HOTEL_ROOM_SELECT_SCREEN_PRICE_TEXT,
                  fontWeight: "bold",
                  textAlign: "right",
                }}>
                  {currentQueryHotelBooking?.offer.checkOutDate}
                </PaperText>
              </View>
            </View>
          </View>

          <View style={HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_CONTAINER}>

            {/* Nights and Room Fee Row */}
            <View style={HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_THIRD_ROW}>
              {/* Nights text */}
              <View style={{ flexGrow: 1 }}>
                <PaperText style={HOTEL_ROOM_SELECT_SCREEN_PRICE_TEXT}>
                  Base
                </PaperText>
              </View>

              {/* Nights base */}
              <View style={{ flexGrow: 1 }}>
                <PaperText style={{
                  ...HOTEL_ROOM_SELECT_SCREEN_PRICE_TEXT,
                  fontWeight: "bold",
                  textAlign: "right",
                }}>
                  {currentQueryHotelBooking?.offer.priceCurrency}
                  {" "}
                  {currentQueryHotelBooking?.offer.priceBase}
                </PaperText>
              </View>
            </View>

            {/* Service and Tax Row */}
            <View style={{ ...HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_THIRD_ROW, paddingTop: 0 }}>
              {/* Service and Tax text */}
              <View style={{ flexGrow: 1 }}>
                <PaperText style={HOTEL_ROOM_SELECT_SCREEN_PRICE_TEXT}>
                  Service(Taxes & fees):
                </PaperText>
              </View>

              {/* Service and Tax */}
              <View style={{ flexGrow: 1 }}>
                <PaperText style={{
                  ...HOTEL_ROOM_SELECT_SCREEN_PRICE_TEXT,
                  fontWeight: "bold",
                  textAlign: "right",
                }}>
                  {currentQueryHotelBooking?.offer.priceCurrency}
                  {" "}
                  {
                    currentQueryHotelBooking?.offer.priceTaxes &&
                    currentQueryHotelBooking?.offer.priceTaxes.length > 0 ?
                      currentQueryHotelBooking?.offer.priceTaxes[0]?.amount :
                      0
                  }
                </PaperText>
              </View>
            </View>

            <PaperDivider style={PAYMENT_SCREEN_PAYMENT_METHOD_DIVIDER_LINE} />

            {/* Total Row */}
            <View style={HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_THIRD_ROW}>
              {/* Total text */}
              <View style={{ flexGrow: 1 }}>
                <PaperText style={{ ...HOTEL_ROOM_SELECT_SCREEN_PRICE_TEXT, fontSize: 16 }}>
                  Total
                </PaperText>
              </View>

              {/* Total price */}
              <View style={{ flexGrow: 1 }}>
                <PaperText style={{
                  ...HOTEL_ROOM_SELECT_SCREEN_PRICE_TEXT,
                  fontWeight: "bold",
                  textAlign: "right",
                  fontSize: 16,
                }}>
                  {currentQueryHotelBooking?.offer.priceCurrency}
                  {" "}
                  {currentQueryHotelBooking?.offer.priceTotal}
                </PaperText>
              </View>
            </View>

          </View>

          <View style={HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_CONTAINER}>

            {/* First Namet Row */}
            <View style={HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_THIRD_ROW}>
              {/* First Name text */}
              <View style={{ flexGrow: 1 }}>
                <PaperText style={HOTEL_ROOM_SELECT_SCREEN_PRICE_TEXT}>
                  First Name:
                </PaperText>
              </View>

              {/* First Name */}
              <View style={{ flexGrow: 1 }}>
                <PaperText style={{
                  ...HOTEL_ROOM_SELECT_SCREEN_PRICE_TEXT,
                  fontWeight: "bold",
                  textAlign: "right",
                }}>
                  {
                    currentQueryHotelBooking &&
                    currentQueryHotelBooking.guests &&
                    currentQueryHotelBooking.guests.length > 0 ?
                      currentQueryHotelBooking.guests[0]?.firstName : ""
                  }
                </PaperText>
              </View>
            </View>

            {/* Last Name Row */}
            <View style={{ ...HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_THIRD_ROW, paddingTop: 0 }}>
              {/* Last Name text */}
              <View style={{ flexGrow: 1 }}>
                <PaperText style={HOTEL_ROOM_SELECT_SCREEN_PRICE_TEXT}>
                  Last Name:
                </PaperText>
              </View>

              {/* Last Name */}
              <View style={{ flexGrow: 1 }}>
                <PaperText style={{
                  ...HOTEL_ROOM_SELECT_SCREEN_PRICE_TEXT,
                  fontWeight: "bold",
                  textAlign: "right",
                }}>
                  {
                    currentQueryHotelBooking &&
                    currentQueryHotelBooking.guests &&
                    currentQueryHotelBooking.guests.length > 0 ?
                      currentQueryHotelBooking.guests[0]?.lastName : ""
                  }
                </PaperText>
              </View>
            </View>

            <PaperDivider style={PAYMENT_SCREEN_PAYMENT_METHOD_DIVIDER_LINE} />

            {/* Emaill Row */}
            <View style={HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_THIRD_ROW}>
              {/* Email text */}
              <View style={{ flexGrow: 1 }}>
                <PaperText style={{ ...HOTEL_ROOM_SELECT_SCREEN_PRICE_TEXT }}>
                  Email
                </PaperText>
              </View>

              {/* Email */}
              <View style={{ flexGrow: 1 }}>
                <PaperText style={{
                  ...HOTEL_ROOM_SELECT_SCREEN_PRICE_TEXT,
                  fontWeight: "bold",
                  textAlign: "right",
                }}>
                  {
                    currentQueryHotelBooking &&
                    currentQueryHotelBooking.guests &&
                    currentQueryHotelBooking.guests.length > 0 ?
                      currentQueryHotelBooking.guests[0]?.email : ""
                  }
                </PaperText>
              </View>
            </View>

            {/* Phone Number Row */}
            <View style={HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_THIRD_ROW}>
              {/* Phone Number text */}
              <View style={{ flexGrow: 1 }}>
                <PaperText style={{ ...HOTEL_ROOM_SELECT_SCREEN_PRICE_TEXT }}>
                  Phone Number
                </PaperText>
              </View>

              {/* Phone number */}
              <View style={{ flexGrow: 1 }}>
                <PaperText style={{
                  ...HOTEL_ROOM_SELECT_SCREEN_PRICE_TEXT,
                  fontWeight: "bold",
                  textAlign: "right",
                }}>
                  {
                    currentQueryHotelBooking &&
                    currentQueryHotelBooking.guests &&
                    currentQueryHotelBooking.guests.length > 0 ?
                      currentQueryHotelBooking.guests[0]?.phone : ""
                  }
                </PaperText>
              </View>
            </View>

          </View>

          <View style={PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER}>
            {/* Added Payment Method Container */}
            <View style={PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_ROW}>
              <View style={PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_ROW_LEFT_COLUMN}>
                <View style={PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_TEXT_VIEW}>
                  <FontistoIcon name={"visa"} size={18} />
                  <PaperText
                    style={PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_TEXT}
                    numberOfLines={3}
                    ellipsizeMode="tail"
                  >
                    {
                      currentQueryHotelBooking &&
                      currentQueryHotelBooking.payments &&
                      currentQueryHotelBooking.payments.length > 0 ?
                        currentQueryHotelBooking.payments[0]?.cardVendorCode == "VI" ? "Visa" :
                          currentQueryHotelBooking.payments[0]?.cardVendorCode == "CA" ? "MasterCard" :
                            "" : ""
                    }
                  </PaperText>
                </View>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <PaperText style={{ color: colors.mint, fontWeight: "bold" }}>CREDIT CARD</PaperText>
              </View>
            </View>
          </View>

        </ScrollView>
      </BottomSheet>


    </SafeAreaView>
  );
};
