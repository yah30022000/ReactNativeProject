import React, {FC, useState} from "react";
import {StackScreenProps} from "@react-navigation/stack";
import {StackNavigatorParamList} from "../../navigators";
import {Rating, AirbnbRating} from "react-native-ratings";
import {useDispatch} from "react-redux";
import {
  Text as PaperText,
  Divider as PaperDivider,
  useTheme,
} from "react-native-paper";
import {SafeAreaView} from "react-native-safe-area-context";
import {
  TextStyle,
  TouchableHighlight,
  View,
  ViewStyle,
  FlatList,
  ImageBackground,
  Image,
} from "react-native";
import ButtonWithColorBg, {
  ButtonProp,
} from "../../components/ButtonWithColorBg";

import {
  HOTEL_LIST_SCREEN_TITLE_TEXT,
  HOTEL_LIST_SCREEN_TITLE,
  HOTEL_LIST_BACK_BUTTON,
  HOTEL_LIST_SCREEN_HOTELS_RIGHT_COLUMN,
  HOTEL_LIST_SCREEN_HOTELS_LEFT_COLUMN,
  HOTEL_LIST_SCREEN_IMAGE,
  HOTEL_LIST_HOTEL_NAME,
  HOTEL_LIST_HOTEL_NAME_TEXT,
  HOTEL_LIST_HOTEL_ADDRESS,
  HOTEL_LIST_HOTEL_ADDRESS_TEXT,
  HOTEL_SEARCH_SCREEN_DIVIDER_LINE,
} from "../../theme/styles";
import {color} from "react-native-reanimated";
import {selectRating} from "../../redux/hotel/hotelSlice";
export interface HotelSearchListProps {}

export const HotelListScreen: FC<
  StackScreenProps<StackNavigatorParamList, "hotelList">
> = ({route, navigation}) => {
  const {colors} = useTheme();
  const [hotels, setHotels] = useState(initialHotelList);
  const dispatch = useDispatch();
  /* props */
  // const {}: HotelSearchListProps = route.params;

  type HotelList = {
    key: number;
    hotelName: string;
    address: string;
    rating: number;
    distance: number;
    onPress: () => void;
  };

  type HotelListAndIndex = {
    item: HotelList;
    index: number;
  };

  const initialHotelList: Array<HotelList> = [
    {
      key: 1,
      hotelName: "RgentSingapore",
      address: "Singapore",
      rating: 5,
      distance: 5.5,
      onPress: () => {},
    },
    {
      key: 2,
      hotelName: "marina V Lavender",
      address: "Singapore",
      rating: 5,
      distance: 6.5,
      onPress: () => {},
    },
    {
      key: 3,
      hotelName: "marina V Lavender",
      address: "Singapore",
      rating: 5,
      distance: 6.5,
      onPress: () => {},
    },
    {
      key: 4,
      hotelName: "marina V Lavender",
      address: "Singapore",
      rating: 5,
      distance: 6.5,
      onPress: () => {},
    },
  ];

  // const renderItem = ({item, index}: ButtonItemAndIndex) => (
  //   <TouchableHighlight onPress={item.onPress} underlayColor={colors.white}>
  //     <View style={item.buttonStyle}>
  //       <ButtonWithColorBg
  //         size={20}
  //         color={item.color}
  //         iconName={item.iconName}
  //         iconProvider={item.iconProvider}
  //         backgroundColor={item.backgroundColor}
  //       />
  //       <View style={item.textStyle}>
  //         <PaperText style={item.textTitleStyle}>{item.textTitle}</PaperText>
  //         <PaperText style={item.textSubtitleStyle}>
  //           {item.textSubtitle}
  //         </PaperText>
  //       </View>
  //     </View>
  //   </TouchableHighlight>
  // );

  return (
    <SafeAreaView>
      <TouchableHighlight
        onPress={() => navigation.goBack()}
        underlayColor={"white"}>
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
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: colors.white,
        }}>
        <FlatList
          data={initialHotelList}
          keyExtractor={buttonItem => buttonItem.key.toString()}
          renderItem={({item, index}: HotelListAndIndex) => (
            <TouchableHighlight
              onPress={item.onPress}
              underlayColor={colors.white}>
              <View style={{flexDirection: "row"}}>
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
                    <PaperText style={HOTEL_LIST_HOTEL_NAME_TEXT}>
                      Regent Singapore
                    </PaperText>
                  </View>
                  <View style={HOTEL_LIST_HOTEL_ADDRESS}>
                    <PaperText style={HOTEL_LIST_HOTEL_ADDRESS_TEXT}>
                      Singapore
                    </PaperText>
                  </View>
                  <View style={{height: "10%", width: "70%", marginTop: 10}}>
                    <Rating
                      showRating={false}
                      onFinishRating={(rating: number) =>
                        dispatch(selectRating(rating))
                      }
                      type="custom"
                      imageSize={20}
                      ratingTextColor={colors.mint}
                      readonly={true}
                    />
                  </View>
                </View>
              </View>
            </TouchableHighlight>
          )}
          contentContainerStyle={{backgroundColor: "white"}}
          ItemSeparatorComponent={() => (
            <PaperDivider style={HOTEL_SEARCH_SCREEN_DIVIDER_LINE} />
          )}
          style={{paddingTop: 25, flex: 1}}
        />
      </View>

      {/* <TouchableHighlight
        onPress={() => navigation.navigate("hotelDetail" as any)}
        underlayColor={"azure"}>
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
        underlayColor={"azure"}>
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
