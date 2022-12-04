import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { TabNavigatorParamList } from "../../navigators/home-bottom-tab";
import { MaterialBottomTabScreenProps } from "@react-navigation/material-bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { Divider as PaperDivider, Text as PaperText, useTheme } from "react-native-paper";

import {
  BOOKING_HISTORY_SCREEN,
  HOTEL_DETAIL_SCREEN_HOTEL_INFO_FLAT_LIST_CONTAINER,
  HOTEL_ROOM_SELECT_SCREEN_BACK_BUTTON_ROW,
  HOTEL_ROOM_SELECT_SCREEN_BOTTOM_BUTTON_TEXT,
  HOTEL_ROOM_SELECT_SCREEN_BOTTOM_BUTTON_TOUCHABLE,
  HOTEL_ROOM_SELECT_SCREEN_BOTTOM_BUTTON_WRAPPER,
  HOTEL_ROOM_SELECT_SCREEN_DIVIDER_LINE,
  HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST,
  HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_BUTTON_ROW,
  HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_CONTAINER,
  HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_FIRST_ROW,
  HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_FIRST_ROW_LEFT_COLUMN,
  HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_SECOND_ROW,
  HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_SUBTEXT,
  HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_TEXT,
  HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_THIRD_ROW,
  HOTEL_ROOM_SELECT_SCREEN_IMAGE,
  HOTEL_ROOM_SELECT_SCREEN_PRICE_TEXT,
  HOTEL_ROOM_SELECT_SCREEN_TITLE_TEXT,
} from "../../theme";
import { FlatList, Image, ImageBackground, StatusBar, TouchableHighlight, View } from "react-native";
import { useAppDispatch } from "../../redux/hooks";
import BottomSheet from "@gorhom/bottom-sheet";
import { capitalizeString, HotelInfoIconItem, HotelInfoIconItemAndIndex } from "../../helper";
import { useSelector } from "react-redux";
import { HotelState, RootState, UserState } from "../../redux";
import { Storage as AmplifyS3Storage } from "@aws-amplify/storage";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { getAllSavedHotelBookingByUsernameThunk } from "../../redux/hotel/thunk/getAllSavedHotelBookingByUsernameThunk";
import { LazyHotelBooking } from "../../../src/models";

export interface HistoryScreenProps {

}


export const HistoryScreen: FC<MaterialBottomTabScreenProps<TabNavigatorParamList, "history">> = ({
                                                                                                    route,
                                                                                                    navigation,
                                                                                                  }) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();

  // local variables
  const snapPoints = useMemo<Array<string>>(() => ["85%"], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [roomImagePathList, setRoomImagePathList] = useState<Array<string | undefined>>([]);

  /* props */
  // const {}: HistoryScreenProps = route.params;

  const buttonList: Array<HotelInfoIconItem> = [
    {
      key: 1,
      text: "Breakfast",
      iconName: "coffee",
    },
    {
      key: 2,
      text: "Parking",
      iconName: "parking",
    },
    {
      key: 3,
      text: "Dining",
      iconName: "utensils",
    },
  ];

  const renderIcon = ({ item, index }: HotelInfoIconItemAndIndex) => (
    <View style={{ flexDirection: "row", width: 120, height: 20 }} key={item.key}>
      <View style={{ width: "30%" }}>
        <FontAwesome5Icon name={item.iconName} size={item.iconSize ?? 16} />
      </View>
      <View style={{ width: "70%" }}>
        <PaperText style={{ fontSize: 16, ...item.textStyle }}>{item.text}</PaperText>
      </View>
    </View>
  );

  // global variables
  let signInResult = useSelector<RootState>(
    (state) => state.user.signInResult,
  ) as UserState["signInResult"] | undefined;

  let allQueryHotelBooking = useSelector<RootState>(
    (state) => state.hotel.allQueryHotelBooking,
  ) as HotelState["allQueryHotelBooking"] | undefined;

  useEffect(() => {
    if (signInResult) {
      dispatch(getAllSavedHotelBookingByUsernameThunk(signInResult.username));
    }
  }, [signInResult]);


  useEffect(() => {
    if (allQueryHotelBooking &&
      allQueryHotelBooking.length > 0) {
      Promise.all(allQueryHotelBooking.map(async (queryHotelBooking) => {
        let roomImagePath = undefined;
        if (queryHotelBooking && queryHotelBooking.offer.roomImageFileName) {
          roomImagePath = await AmplifyS3Storage.get(queryHotelBooking.offer.roomImageFileName);
        }
        return roomImagePath;
      })).then((roomImagePathList) => {
        setRoomImagePathList(roomImagePathList);
      });
    }
  }, [allQueryHotelBooking]);

  return (
    <ImageBackground
      source={require("@travelasset/images/night1.jpeg")}
      style={{ flex: 1 }}
      resizeMode="cover">
      <SafeAreaView style={BOOKING_HISTORY_SCREEN}>
        <StatusBar
          animated={true}
          barStyle={"light-content"}
          // hidden={true}
        />

        {/* Header Row Back Button */}
        <View style={{ ...HOTEL_ROOM_SELECT_SCREEN_BACK_BUTTON_ROW, justifyContent: "center" }}>

          <View>
            <PaperText
              numberOfLines={1}
              style={HOTEL_ROOM_SELECT_SCREEN_TITLE_TEXT}
            >
              BOOKING HISTORY
            </PaperText>
          </View>

        </View>

        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          // onChange={handleSheetChanges}
          style={{ borderRadius: 30, overflow: "hidden" }}
          // disable top line button to control height snapping
          handleComponent={null}
        >
          <FlatList
            data={allQueryHotelBooking}
            ListEmptyComponent={
            (<View style={{
              flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center"
            }}>
              <PaperText style={{fontSize: 24}}>No Existing Booking Yet</PaperText>
            </View>)
          }
            style={HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST}
            renderItem={({ item, index }: { item: LazyHotelBooking, index: number }) => (
              <View style={HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_CONTAINER}>
                {/* Room Title and Image Row */}
                <View style={HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_FIRST_ROW}>
                  <View style={HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_FIRST_ROW_LEFT_COLUMN}>

                    {/* Room Name */}
                    <View>
                      <PaperText
                        style={HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_TEXT}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {capitalizeString(item.offer.roomCategory ?? "Room")}
                      </PaperText>
                    </View>

                    {/* Room Attribute 1 */}
                    <View>
                      <PaperText
                        style={HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_SUBTEXT}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                      >
                        Adults: {item.offer.adults ?? 0}
                      </PaperText>
                    </View>
                    {/* Room Attribute 2 */}
                    <View>
                      <PaperText
                        style={HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_SUBTEXT}
                        numberOfLines={3}
                        ellipsizeMode="tail"
                      >
                        {capitalizeString(item.offer.roomDescription ?? "")}
                      </PaperText>
                    </View>
                  </View>

                  <View>
                    <Image
                      style={HOTEL_ROOM_SELECT_SCREEN_IMAGE}
                      source={
                        roomImagePathList[index] ? { uri: roomImagePathList[index] } :
                          require("@travelasset/images/crown-hotel.jpeg")
                      }
                    />
                  </View>

                </View>

                <PaperDivider style={HOTEL_ROOM_SELECT_SCREEN_DIVIDER_LINE} />

                {/* Icon Row */}
                <View style={HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_SECOND_ROW}>
                  <FlatList
                    horizontal={true}
                    data={buttonList.slice(0, 3)}
                    renderItem={renderIcon}
                    // style={HOTEL_DETAIL_SCREEN_HOTEL_INFO_FLAT_LIST}
                    contentContainerStyle={HOTEL_DETAIL_SCREEN_HOTEL_INFO_FLAT_LIST_CONTAINER}
                  />
                </View>

                <PaperDivider style={HOTEL_ROOM_SELECT_SCREEN_DIVIDER_LINE} />

                {/* Price Row */}
                <View style={HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_THIRD_ROW}>
                  {/* Average Price */}
                  <View style={{ flexGrow: 1 }}>
                    <PaperText style={HOTEL_ROOM_SELECT_SCREEN_PRICE_TEXT}>
                      {item.offer.priceCurrency}
                      {" "}
                      {item.offer.priceBase}
                      /night
                    </PaperText>
                  </View>

                  {/* Total Price */}
                  <View style={{ flexGrow: 1 }}>
                    <PaperText style={{
                      ...HOTEL_ROOM_SELECT_SCREEN_PRICE_TEXT,
                      fontWeight: "bold",
                    }}>
                      {item.offer.priceCurrency}
                      {" "}
                      {item.offer.priceTotal}
                      /total
                    </PaperText>
                  </View>

                </View>

                {/* Button Row */}
                <View style={HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_BUTTON_ROW}>
                  <TouchableHighlight
                    style={HOTEL_ROOM_SELECT_SCREEN_BOTTOM_BUTTON_TOUCHABLE}
                    onPress={() => {
                      navigation.navigate("paymentComplete" as any, { bookingId: item.bookingId });
                    }}
                    underlayColor={"transparent"}>
                    <View style={HOTEL_ROOM_SELECT_SCREEN_BOTTOM_BUTTON_WRAPPER}>
                      <PaperText
                        style={HOTEL_ROOM_SELECT_SCREEN_BOTTOM_BUTTON_TEXT}
                        numberOfLines={1}>
                        VIEW RECORD
                      </PaperText>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
            )}
          />
        </BottomSheet>
      </SafeAreaView>
    </ImageBackground>
  );
};
