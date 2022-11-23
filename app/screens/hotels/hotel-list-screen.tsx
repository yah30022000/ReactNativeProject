import React, { FC } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { StackNavigatorParamList } from "../../navigators";
import { Rating } from "react-native-ratings";
import { Divider as PaperDivider, Text as PaperText, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, TouchableHighlight, View } from "react-native";
import ButtonWithColorBg from "../../components/ButtonWithColorBg";

import {
  HOTEL_LIST_BACK_BUTTON,
  HOTEL_LIST_FLAT_LIST_WRAPPER,
  HOTEL_LIST_HOTEL_ADDRESS,
  HOTEL_LIST_HOTEL_ADDRESS_TEXT,
  HOTEL_LIST_HOTEL_NAME,
  HOTEL_LIST_HOTEL_NAME_TEXT,
  HOTEL_LIST_SCREEN_HOTELS_LEFT_COLUMN,
  HOTEL_LIST_SCREEN_HOTELS_RIGHT_COLUMN,
  HOTEL_LIST_SCREEN_IMAGE,
  HOTEL_LIST_SCREEN_TITLE,
  HOTEL_LIST_SCREEN_TITLE_TEXT,
  HOTEL_SEARCH_SCREEN_DIVIDER_LINE,
} from "../../theme";
import { selectRating } from "../../redux/hotel/hotelSlice";
import { useAppDispatch } from "../../redux/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { HotelListResponse, HotelListResponseData } from "../../helper/amadeus";

export interface HotelSearchListProps {
}

export const HotelListScreen: FC<StackScreenProps<StackNavigatorParamList, "hotelList">> = ({ route, navigation }) => {
  /* props */
  // const {}: HotelSearchListProps = route.params;

  const { colors } = useTheme();

  const dispatch = useAppDispatch();
  let hotelListResponse = useSelector<RootState>(
    (state) => state.hotel.hotelListResponse,
  ) as HotelListResponse | undefined;


  const renderHotelList = ({ item, index }: {
    item: HotelListResponseData;
    index: number;
  }) => (
    <TouchableHighlight
      onPress={() => navigation.navigate("hotelSearchFilter" as any)}
      underlayColor={"transparent"}>
      <View style={{ flexDirection: "row" }}>
        <View style={HOTEL_LIST_SCREEN_HOTELS_LEFT_COLUMN}>
          <View style={HOTEL_LIST_SCREEN_IMAGE}>
            <Image
              style={{
                width: 100,
                height: 100,
                borderRadius: 20,
              }}
              source={require("@travelasset/images/crown-hotel.jpeg")}
            />
          </View>
        </View>
        <View style={HOTEL_LIST_SCREEN_HOTELS_RIGHT_COLUMN}>
          <View style={HOTEL_LIST_HOTEL_NAME}>
            <PaperText
              style={HOTEL_LIST_HOTEL_NAME_TEXT}
              numberOfLines={1}
              ellipsizeMode='tail'
            >
              {item.name}
            </PaperText>
          </View>
          <View style={HOTEL_LIST_HOTEL_ADDRESS}>
            <PaperText style={HOTEL_LIST_HOTEL_ADDRESS_TEXT}>
              {item.iataCode}
            </PaperText>
          </View>
            <Rating
              style={{alignItems: "flex-start" , marginTop: 10 }}
              showRating={false}
              type="custom"
              imageSize={20}
              ratingTextColor={colors.mint}
              readonly={true}
              startingValue={item.rating}
            />
        </View>
      </View>
    </TouchableHighlight>
  );

  return (
    <SafeAreaView>
      <TouchableHighlight
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
      <View
        style={HOTEL_LIST_FLAT_LIST_WRAPPER}>
        <FlatList
          data={hotelListResponse?.data ? hotelListResponse.data : []}
          keyExtractor={buttonItem => buttonItem.hotelId}
          renderItem={renderHotelList}
          contentContainerStyle={{ backgroundColor: "white" }}
          ItemSeparatorComponent={() => (
            <PaperDivider style={HOTEL_SEARCH_SCREEN_DIVIDER_LINE} />
          )}
          style={{ paddingTop: 25, flex: 1 }}
        />
      </View>

      {/* <TouchableHighlight
        onPress={() => navigation.navigate("hotelDetail" as any)}
        underlayColor={"transparent"}>
        <View
          style={{
            height: 50,
            width: 200,
            borderRadius: 25,
            backgroundColor: "orange",
            margin: 50,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <PaperText style={{color: "white"}}>To Hotel Detail Page</PaperText>
        </View>
      </TouchableHighlight>

      <TouchableHighlight
        onPress={() => navigation.popToTop()}
        underlayColor={"transparent"}>
        <View
          style={{
            height: 50,
            width: 200,
            borderRadius: 25,
            backgroundColor: "pink",
            margin: 50,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <PaperText style={{color: "white"}}>To Home Page</PaperText>
        </View>
      </TouchableHighlight> */}
    </SafeAreaView>
  );
};
