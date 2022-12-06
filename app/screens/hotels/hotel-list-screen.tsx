import React, { FC, useEffect } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { StackNavigatorParamList } from "../../navigators";
import { Rating } from "react-native-ratings";
import { Divider as PaperDivider, Text as PaperText, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, StatusBar, TouchableHighlight, View } from "react-native";
import ButtonWithColorBg from "../../components/ButtonWithColorBg";

import {
  HOTEL_LIST_BACK_BUTTON,
  HOTEL_LIST_FLAT_LIST_WRAPPER,
  HOTEL_LIST_HOTEL_ADDRESS,
  HOTEL_LIST_HOTEL_ADDRESS_TEXT,
  HOTEL_LIST_HOTEL_NAME,
  HOTEL_LIST_HOTEL_NAME_TEXT,
  HOTEL_LIST_PRICE,
  HOTEL_LIST_PRICE_TEXT,
  HOTEL_LIST_PRICE_TEXT_HALF_WRAPPER,
  HOTEL_LIST_SCREEN_HOTELS_LEFT_COLUMN,
  HOTEL_LIST_SCREEN_HOTELS_RIGHT_COLUMN,
  HOTEL_LIST_SCREEN_IMAGE, HOTEL_LIST_SCREEN_IMAGE_WRAPPER,
  HOTEL_LIST_SCREEN_TITLE,
  HOTEL_LIST_SCREEN_TITLE_TEXT,
  HOTEL_SEARCH_SCREEN_DIVIDER_LINE,
} from "../../theme";
import { useAppDispatch } from "../../redux/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { hotelCityCodes, HotelOffersResponse, HotelOffersResponseData } from "../../helper";
import { Storage as AmplifyS3Storage } from "@aws-amplify/storage";

export interface HotelSearchListProps {
}

export const HotelListScreen: FC<StackScreenProps<StackNavigatorParamList, "hotelList">> = ({ route, navigation }) => {
  /* props */
  // const {}: HotelSearchListProps = route.params;

  const { colors } = useTheme();

  const dispatch = useAppDispatch();
  let hotelListAndOffersResponse = useSelector<RootState>(
    (state) => state.hotel.hotelListAndOffersResponse,
  ) as HotelOffersResponse | undefined;


  const renderHotelList = ({ item, index }: {
    item: HotelOffersResponseData;
    index: number;
  }) => (
    <TouchableHighlight
      onPress={() => {
        if(item.hotel?.hotelId){
          navigation.navigate("hotelDetail" as any, {hotelId: item.hotel?.hotelId})
        }
      }}
      underlayColor={"transparent"}>
      <View style={{ flexDirection: "row" }}>
        <View style={HOTEL_LIST_SCREEN_HOTELS_LEFT_COLUMN}>
          <View style={HOTEL_LIST_SCREEN_IMAGE_WRAPPER}>
            <Image
              style={HOTEL_LIST_SCREEN_IMAGE}
              source={
              item.hotel?.imageFilePath ? {uri: item.hotel?.imageFilePath} :
              require("@travelasset/images/crown-hotel.jpeg")
            }
            />
          </View>
        </View>
        <View style={HOTEL_LIST_SCREEN_HOTELS_RIGHT_COLUMN}>

          {/* Hotel Name */}
          <View style={HOTEL_LIST_HOTEL_NAME}>
            <PaperText
              style={HOTEL_LIST_HOTEL_NAME_TEXT}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.hotel?.name}
            </PaperText>
          </View>

          {/* Hotel City / Address */}
          <View style={HOTEL_LIST_HOTEL_ADDRESS}>
            <PaperText style={HOTEL_LIST_HOTEL_ADDRESS_TEXT}>
              {
                hotelCityCodes.find(city => {
                  return city.cityCode === item.hotel?.cityCode;
                })!.cityName
              }
            </PaperText>
          </View>

          {/* Stars */}
          <Rating
            style={{ alignItems: "flex-start", marginTop: 10 }}
            showRating={false}
            type="custom"
            imageSize={20}
            ratingTextColor={colors.mint}
            readonly={true}
            startingValue={item.hotel?.rating ?? 3}
          />

          {/* Price */}
          <View style={HOTEL_LIST_PRICE}>

            {/* Average Price */}
            <View style={HOTEL_LIST_PRICE_TEXT_HALF_WRAPPER}>
              <PaperText style={HOTEL_LIST_PRICE_TEXT}>
                {
                  item.offers![0]?.price.variations?.average?.total ?
                    `${item.offers![0]?.price.currency}  ${item.offers![0]?.price.variations.average.total}`
                    : item.offers![0]?.price.variations?.average?.base ?
                      `${item.offers![0]?.price.currency}  ${item.offers![0]?.price.variations.average.base}`
                      :
                      "-"
                }/night
              </PaperText>
            </View>

            {/* Total Price */}
            <View style={HOTEL_LIST_PRICE_TEXT_HALF_WRAPPER}>
              <PaperText style={{...HOTEL_LIST_PRICE_TEXT, fontWeight: "bold"}}>
                {
                  item.offers![0]?.price.total ?
                    `${item.offers![0]?.price.currency}  ${item.offers![0]?.price.total}`
                    : item.offers![0]?.price.base ?
                      `${item.offers![0]?.price.currency}  ${item.offers![0]?.price.base}`
                      : "-"
                }/total
              </PaperText>
            </View>
          </View>

        </View>
      </View>
    </TouchableHighlight>
  );

  return (
    <SafeAreaView>
      <StatusBar
        animated={true}
        barStyle={"dark-content"}
        // hidden={true}
      />
      <View style={{flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20}}>
        <TouchableHighlight
          style={{flexGrow: 0.4}}
          onPress={() => navigation.goBack()}
          underlayColor={"transparent"}>
          <View style={HOTEL_LIST_BACK_BUTTON}>
            <ButtonWithColorBg
              size={25}
              color={colors.white}
              iconName={"chevron-back"}
              iconProvider={"Ionicons"}
              backgroundColor={colors.black}
              onPress={() => navigation.goBack()}
            />
          </View>
        </TouchableHighlight>
        <View style={HOTEL_LIST_SCREEN_TITLE}>
          <PaperText style={HOTEL_LIST_SCREEN_TITLE_TEXT}>HOTELS</PaperText>
        </View>
      </View>

      <View
        style={HOTEL_LIST_FLAT_LIST_WRAPPER}>
        {
          hotelListAndOffersResponse?.data ? (
            <FlatList
              data={hotelListAndOffersResponse?.data ? hotelListAndOffersResponse.data : []}
              keyExtractor={buttonItem => buttonItem.hotel!.hotelId as any}
              renderItem={renderHotelList}
              contentContainerStyle={{ backgroundColor: "white" }}
              ItemSeparatorComponent={() => (
                <PaperDivider style={HOTEL_SEARCH_SCREEN_DIVIDER_LINE} />
              )}
              style={{ paddingTop: 25, flex: 1 }}
            />
          ) : (
              <></>
          )

        }

      </View>
    </SafeAreaView>
  );
};
