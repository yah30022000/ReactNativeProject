import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { StackNavigatorParamList } from "../../navigators";
import { Divider as PaperDivider, Text as PaperText, useTheme } from "react-native-paper";
import { FlatList, Image, StatusBar, TouchableHighlight, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { HotelOffer, HotelOffersResponse, HotelOffersResponseData } from "../../helper";
import BottomSheet from "@gorhom/bottom-sheet";
import {
  HOTEL_DETAIL_SCREEN_HOTEL_INFO_FLAT_LIST_CONTAINER,
  HOTEL_ROOM_SELECT_SCREEN,
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
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonWithColorBg from "../../components/ButtonWithColorBg";
import { HotelInfoIconItem, HotelInfoIconItemAndIndex,capitalizeString } from "../../helper";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";


export interface HotelRoomSelectScreenProps {
  hotelId?: string;
}

export const HotelRoomSelectScreen: FC<StackScreenProps<StackNavigatorParamList, "hotelRoomSelect">> = ({
                                                                                                          route,
                                                                                                          navigation,
                                                                                                        }) => {

  /* props */
  const hotelId = route.params?.hotelId ?? "HOTEL_ID";
  const { colors } = useTheme();

  const [hotelOfferResponseData, setHotelOfferResponseData] = useState<HotelOffersResponseData>();

  let hotelListAndOffersResponse = useSelector<RootState>(
    (state) => state.hotel.hotelListAndOffersResponse,
  ) as HotelOffersResponse | undefined;

  /* bottom sheet start */
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo<Array<string>>(() => ["80%"], []);

  const handleSheetChanges = useCallback((index: number) => {
    // console.log("handleSheetChanges", index);
  }, []);
  /* bottom sheet end */

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

  useEffect(() => {
    console.log("hotelId: ", hotelId);

    if (hotelListAndOffersResponse) {
      let hotelOfferResponseData = hotelListAndOffersResponse.data.find((hotelOfferResponse) => {
        return hotelOfferResponse.hotel?.hotelId === hotelId;
      });
      setHotelOfferResponseData(hotelOfferResponseData);
    }
  }, [hotelListAndOffersResponse]);

  return (
    <SafeAreaView style={HOTEL_ROOM_SELECT_SCREEN}>
      <StatusBar
        animated={true}
        barStyle={"light-content"}
        // hidden={true}
      />

      {/* Header Row Back Button */}
      <View style={HOTEL_ROOM_SELECT_SCREEN_BACK_BUTTON_ROW}>
        <View style={{ width: "30%" }}>
          <ButtonWithColorBg
            size={25}
            color={colors.black}
            iconName={"chevron-back"}
            iconProvider={"Ionicons"}
            backgroundColor={colors.mintLight}
            onPress={() => navigation.goBack()}
          />
        </View>

        <View style={{ width: "40%" }}>
          <PaperText
            numberOfLines={1}
            style={HOTEL_ROOM_SELECT_SCREEN_TITLE_TEXT}
          >
            SELECT ROOMS
          </PaperText>
        </View>

        <View style={{ width: "30%" }} />
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        style={{ borderRadius: 30, overflow: "hidden" }}
        // disable top line button to control height snapping
        handleComponent={null}
      >
        <FlatList
          data={hotelOfferResponseData?.offers}
          // data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          style={HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST}
          renderItem={({ item, index }: { item: HotelOffer, index: number }) => (
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
                      {capitalizeString(item.room.typeEstimated?.category ?? "Room")}
                    </PaperText>
                  </View>

                  {/* Room Attribute 1 */}
                  <View>
                    <PaperText
                      style={HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_SUBTEXT}
                      numberOfLines={2}
                      ellipsizeMode="tail"
                    >
                      Adults: {item.guests?.adults ?? 0}
                    </PaperText>
                  </View>
                  {/* Room Attribute 2 */}
                  <View>
                    <PaperText
                      style={HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_SUBTEXT}
                      numberOfLines={3}
                      ellipsizeMode="tail"
                    >
                      {capitalizeString(item.room.description?.text ?? "")}
                    </PaperText>
                  </View>
                </View>

                <View>
                  <Image
                    style={HOTEL_ROOM_SELECT_SCREEN_IMAGE}
                    source={
                      item.roomImageFilePath ? {uri: item.roomImageFilePath} :
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
                    {
                      item?.price.variations?.average?.total ?
                        `${item?.price.currency} ${item?.price.variations.average.total}`
                        : item?.price.variations?.average?.base ?
                          `${item?.price.currency}  ${item?.price.variations.average.base}`
                          :
                          "-"
                    }
                    /night
                  </PaperText>
                </View>

                {/* Total Price */}
                <View style={{ flexGrow: 1 }}>
                  <PaperText style={{
                    ...HOTEL_ROOM_SELECT_SCREEN_PRICE_TEXT,
                    fontWeight: "bold",
                  }}>
                    {
                      item?.price.total ?
                        `${item?.price.currency} ${item?.price.total}`
                        : item?.price.base ?
                          `${item?.price.currency}  ${item?.price.base}`
                          :
                          "-"
                    }
                    /total
                  </PaperText>
                </View>

              </View>

              {/* Button Row */}
              <View style={HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_BUTTON_ROW}>
                <TouchableHighlight
                  style={HOTEL_ROOM_SELECT_SCREEN_BOTTOM_BUTTON_TOUCHABLE}
                  onPress={() => {
                    navigation.navigate("payment" as any, { offerId: item.id });
                  }}
                  underlayColor={"transparent"}>
                  <View style={HOTEL_ROOM_SELECT_SCREEN_BOTTOM_BUTTON_WRAPPER}>
                    <PaperText
                      style={HOTEL_ROOM_SELECT_SCREEN_BOTTOM_BUTTON_TEXT}
                      numberOfLines={1}>
                      PROCEED TO PAYMENT
                    </PaperText>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          )}
        />
      </BottomSheet>

    </SafeAreaView>
  );
};
