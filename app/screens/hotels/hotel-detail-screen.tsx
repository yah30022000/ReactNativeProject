import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { StackNavigatorParamList } from "../../navigators";
import { Divider as PaperDivider, Text as PaperText, useTheme } from "react-native-paper";
import { FlatList, ImageBackground, StatusBar, TouchableHighlight, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  HOTEL_DETAIL_SCREEN,
  HOTEL_DETAIL_SCREEN_BACK_BUTTON_ROW,
  HOTEL_DETAIL_SCREEN_BOTTOM_SHEET_FIRST_VIEW,
  HOTEL_DETAIL_SCREEN_DIVIDER_LINE,
  HOTEL_DETAIL_SCREEN_HOTEL_INFO_FLAT_LIST,
  HOTEL_DETAIL_SCREEN_HOTEL_INFO_FLAT_LIST_CONTAINER,
  HOTEL_DETAIL_SCREEN_HOTEL_INFO_LOGO_ROW,
  HOTEL_DETAIL_SCREEN_HOTEL_INFO_TEXT,
  HOTEL_DETAIL_SCREEN_PRICE_AMOUNT_TEXT,
  HOTEL_DETAIL_SCREEN_PRICE_ROW,
  HOTEL_DETAIL_SCREEN_PRICE_TEXT,
  HOTEL_DETAIL_SCREEN_TITLE_ROW,
  HOTEL_DETAIL_SCREEN_TITLE_TEXT,
  HOTEL_DETAIL_SCREEN_TITLE_WRAPPER,
  HOTEL_SEARCH_BOTTOM_BUTTON,
  HOTEL_SEARCH_BOTTOM_BUTTON_ROW_WRAPPER,
  HOTEL_SEARCH_BOTTOM_BUTTON_TOUCHABLE,
  HOTEL_SEARCH_BOTTOM_BUTTON_WRAPPER,
} from "../../theme";
import ButtonWithColorBg from "../../components/ButtonWithColorBg";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import BottomSheet from "@gorhom/bottom-sheet";
import { HotelInfoIconItem, HotelInfoIconItemAndIndex } from "../../helper/amadeus/hotel-detail-util-data";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { HotelOffersResponse, HotelOffersResponseData } from "../../helper/amadeus";

export interface HotelDetailScreenProps {
  hotelId?: string;
}

export const HotelDetailScreen: FC<StackScreenProps<StackNavigatorParamList, "hotelDetail">> =
  ({ route, navigation }) => {

    /* props */
    const hotelId = route.params?.hotelId ?? "HOTEL_ID";
    const { colors } = useTheme();

    const [hotelOfferResponseData, setHotelOfferResponseData] = useState<HotelOffersResponseData>();

    // global variables
    let hotelListAndOffersResponse = useSelector<RootState>(
      (state) => state.hotel.hotelListAndOffersResponse,
    ) as HotelOffersResponse | undefined;

    /* bottom sheet start */
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo<Array<string>>(() => ["65%"], []);

    const handleSheetChanges = useCallback((index: number) => {
      // console.log("handleSheetChanges", index);
    }, []);
    /* bottom sheet end */

    useEffect(() => {
      console.log("hotelId: ", hotelId);

      if (hotelListAndOffersResponse) {
        let hotelOfferResponseData = hotelListAndOffersResponse.data.find((hotelOfferResponse) => {
          return hotelOfferResponse.hotel?.hotelId === hotelId;
        });
        setHotelOfferResponseData(hotelOfferResponseData);
      }
    }, [hotelListAndOffersResponse]);

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
      {
        key: 4,
        text: "Wifi",
        iconName: "wifi",
      },
      {
        key: 5,
        text: "Swimming Pool",
        iconName: "swimmer",
      },
      {
        key: 6,
        text: "Shuttle Bus",
        iconName: "bus",
      },
    ];

    const renderItem = ({ item, index }: HotelInfoIconItemAndIndex) => (
      <View style={{ flexDirection: "row", width: 130, height: 40 }} key={item.key}>
        <View style={{ width: "30%" }}>
          <FontAwesome5Icon name={item.iconName} size={item.iconSize ?? 16} />
        </View>
        <View style={{ width: "70%" }}>
          <PaperText style={{ fontSize: 16, ...item.textStyle }}>{item.text}</PaperText>
        </View>
      </View>
    );

    return (
      <ImageBackground
        source={require("@travelasset/images/merlion.jpeg")}
        style={{ flex: 1 }}
        resizeMode="cover">
        <SafeAreaView style={HOTEL_DETAIL_SCREEN}>
          <StatusBar
            animated={true}
            barStyle={"light-content"}
            // hidden={true}
          />

          {/* Header Row Back Button */}
          <View style={HOTEL_DETAIL_SCREEN_BACK_BUTTON_ROW}>
            <ButtonWithColorBg
              size={25}
              color={colors.mint}
              iconName={"chevron-back"}
              iconProvider={"Ionicons"}
              backgroundColor={colors.mintLight}
              onPress={() => navigation.goBack()}
            />
          </View>

          {/* Hotel Name Row */}
          <View style={HOTEL_DETAIL_SCREEN_TITLE_WRAPPER}>
            <View style={HOTEL_DETAIL_SCREEN_TITLE_ROW}>
              <PaperText
                numberOfLines={2}
                style={HOTEL_DETAIL_SCREEN_TITLE_TEXT}
              >
                {hotelOfferResponseData?.hotel?.name}
              </PaperText>
            </View>

            <View style={HOTEL_DETAIL_SCREEN_TITLE_ROW}>
              {/* Stars */}
              <FlatList
                horizontal={true}
                data={Array(hotelOfferResponseData?.hotel?.rating ?? 0)}
                style={{ marginTop: 10 }}
                renderItem={({ item, index }) => {
                  return (
                    <FontAwesomeIcon name={"star"} size={16} color={colors.yellow}
                                     style={{ marginHorizontal: 1 }}
                    />
                  );
                }} />
            </View>
          </View>

          {/* Bottom Sheet */}
          <BottomSheet
            ref={bottomSheetRef}
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            style={{ borderRadius: 30, overflow: "hidden" }}
            handleComponent={null}
          >
            {/* Per Night */}
            <View style={HOTEL_DETAIL_SCREEN_BOTTOM_SHEET_FIRST_VIEW}>
              <View style={HOTEL_DETAIL_SCREEN_PRICE_ROW}>
                <PaperText style={HOTEL_DETAIL_SCREEN_PRICE_TEXT}>
                  Per Night
                </PaperText>
                <PaperText style={HOTEL_DETAIL_SCREEN_PRICE_AMOUNT_TEXT}>
                  {
                    hotelOfferResponseData?.offers![0]?.price.variations?.average?.total ?
                      `${hotelOfferResponseData.offers![0]?.price.currency} ${hotelOfferResponseData.offers![0]?.price.variations.average.total}`
                      : hotelOfferResponseData?.offers![0]?.price.variations?.average?.base ?
                        `${hotelOfferResponseData.offers![0]?.price.currency}  ${hotelOfferResponseData.offers![0]?.price.variations.average.base}`
                        :
                        "-"
                  }
                </PaperText>
              </View>

              {/* Total */}
              <View style={HOTEL_DETAIL_SCREEN_PRICE_ROW}>
                <PaperText style={HOTEL_DETAIL_SCREEN_PRICE_TEXT}>
                  Total
                </PaperText>
                <PaperText style={HOTEL_DETAIL_SCREEN_PRICE_AMOUNT_TEXT}>
                  {
                    hotelOfferResponseData?.offers![0]?.price.total ?
                      `${hotelOfferResponseData.offers![0]?.price.currency} ${hotelOfferResponseData.offers![0]?.price.total}`
                      : hotelOfferResponseData?.offers![0]?.price.base ?
                        `${hotelOfferResponseData.offers![0]?.price.currency}  ${hotelOfferResponseData.offers![0]?.price.base}`
                        :
                        "-"
                  }
                </PaperText>
              </View>

              <PaperDivider style={HOTEL_DETAIL_SCREEN_DIVIDER_LINE} />

              {/* Hotel Information */}
              <View>
                <PaperText style={HOTEL_DETAIL_SCREEN_HOTEL_INFO_TEXT}>
                  Hotel Information
                </PaperText>

                <View style={HOTEL_DETAIL_SCREEN_HOTEL_INFO_LOGO_ROW}>
                  <FlatList
                    horizontal={true}
                    data={buttonList.slice(0, 3)}
                    renderItem={renderItem}
                    style={HOTEL_DETAIL_SCREEN_HOTEL_INFO_FLAT_LIST}
                    contentContainerStyle={HOTEL_DETAIL_SCREEN_HOTEL_INFO_FLAT_LIST_CONTAINER}
                  />
                  <FlatList
                    horizontal={true}
                    data={buttonList.slice(3, 6)}
                    renderItem={renderItem} />
                </View>
              </View>

              <PaperDivider style={HOTEL_DETAIL_SCREEN_DIVIDER_LINE} />

              <PaperText
                style={{ fontSize: 16 }}
                numberOfLines={3}
                ellipsizeMode="tail"
              >
                {
                  hotelOfferResponseData?.offers![0].room?.description?.text ?
                    hotelOfferResponseData?.offers![0].room?.description?.text :
                    "Description"
                }
              </PaperText>

            </View>
          </BottomSheet>

          {/* Bottom Button Row */}
          <View style={HOTEL_SEARCH_BOTTOM_BUTTON_ROW_WRAPPER}>
            <TouchableHighlight
              style={HOTEL_SEARCH_BOTTOM_BUTTON_TOUCHABLE}
              onPress={() => {
                navigation.navigate("hotelRoomSelect" as any, {hotelId: hotelOfferResponseData?.hotel?.hotelId})
              }}
              underlayColor={"transparent"}>
              <View style={HOTEL_SEARCH_BOTTOM_BUTTON_WRAPPER}>
                <View style={HOTEL_SEARCH_BOTTOM_BUTTON}>
                  <PaperText style={{ color: "white" }}>SELECT ROOMS</PaperText>
                </View>
              </View>
            </TouchableHighlight>
          </View>

        </SafeAreaView>
      </ImageBackground>
    );
  };
