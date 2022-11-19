import {
  Divider as PaperDivider,
  Searchbar as PaperSearchbar,
  Text as PaperText,
  useTheme,
} from "react-native-paper";
import React, {FC, useCallback, useMemo, useRef, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import BottomSheet from "@gorhom/bottom-sheet";
import {Rating, AirbnbRating} from "react-native-ratings";
import ButtonWithColorBg, {
  ButtonProp,
} from "../../components/ButtonWithColorBg";
import {
  FILTER_TEXT,
  HOTEL_FILTER_BUTTON,
  HOTEL_BACK_BUTTON,
  HOTEL_CROSS_BUTTON,
  HOTEL_LOCATION_BUTTON,
  HOTEL_SEARCH_BAR,
  HOTEL_SEARCH_BOOKING_HOTELS_TEXT,
  HOTEL_SEARCH_BUTTON,
  HOTEL_SEARCH_DESTINATION_BUTTON,
  HOTEL_SEARCH_SCREEN,
  HOTEL_SEARCH_SCREEN_FILTER_TEXT,
  HOTEL_SEARCH_SCREEN_DESTINATION_TEXT,
  HOTEL_SEARCH_SCREEN_DIVIDER_LINE,
  HOTEL_SEARCH_HOTEL_RATING,
  HOTEL_SEARCH_HOTEL_CLASS_TEXT,
  HOTEL_SEARCH_SCREEN_LOCATION_TEXT,
  HOTEL_SEARCH_SCREEN_SELECT_RATING_TEXT,
  HOTEL_SEARCH_SCREEN_SUBTITLE_TEXT,
  HOTEL_SEARCH_SCREEN_TITLE_ROW,
  HOTEL_SEARCH_SCREEN_TITLE_TEXT,
  HOTEL_SEARCH_YOUR_BOOKING_HOTELS_DESTINATION,
  LOCATION_TEXT,
} from "../../theme/styles";
import {
  FlatList,
  ImageBackground,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextStyle,
  TouchableHighlight,
  View,
  ViewStyle,
} from "react-native";
import {StackNavigatorParamList} from "../../navigators";
import {StackScreenProps} from "@react-navigation/stack";
// import {MarkedDates} from "react-native-calendars/src/types";
import {
  HotelCityCode,
  hotelCityCodes,
  HotelListRequest,
} from "../../helper/amadeus";
import {useDispatch, useSelector} from "react-redux";
import {chooseCityCode, selectRating} from "../../redux/hotel/hotelSlice";
import {RootState} from "../../redux/store";

export interface HotelSearchScreenProps {}

export const HotelSearchScreen: FC<
  StackScreenProps<StackNavigatorParamList, "hotelSearch">
> = ({route, navigation}) => {
  const {colors} = useTheme();

  const dispatch = useDispatch();

  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo<Array<string>>(() => ["60%", "80%"], []);

  // current snapPoints
  const [snapState, setSnapState] = useState<number>(0);
  const [destinationViewOn, setDestinationViewOn] = useState<boolean>(false);
  // const [dateViewOn, setDateViewOn] = useState<boolean>(false);
  // const [userViewOn, setUserViewOn] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  // const [adults, setAdults] = useState<number>(1);
  // const [ratingViewOn, setRatingViewOn] = useState<boolean>(false);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const [hotelCityCodesLocalState, setHotelCityCodesLocalState] = useState<
    Array<HotelCityCode>
  >([]);

  const hotelListRequest = useSelector<RootState>(
    state => state.hotel.hotelListRequest,
  ) as HotelListRequest | null;

  const findHotelCityCodes = (searchInput?: string) => {
    if (searchInput) {
      let newhotelCityCodesLocalState = hotelCityCodes.filter(cityObject => {
        return cityObject.cityName.includes(searchInput);
      });
      setHotelCityCodesLocalState(newhotelCityCodesLocalState);
      console.log("newhotelCityCodesLocalState: ", newhotelCityCodesLocalState);
      setInputValue(searchInput);
    } else {
      setInputValue("");
    }
  };

  // render
  const renderItem = ({item, index}: ButtonItemAndIndex) => (
    <TouchableHighlight onPress={item.onPress} underlayColor={colors.white}>
      <View style={item.buttonStyle}>
        <ButtonWithColorBg
          size={20}
          color={item.color}
          iconName={item.iconName}
          iconProvider={item.iconProvider}
          backgroundColor={item.backgroundColor}
        />
        <View style={item.textStyle}>
          <PaperText style={item.textTitleStyle}>{item.textTitle}</PaperText>
          <PaperText style={item.textSubtitleStyle}>
            {item.textSubtitle}
          </PaperText>
        </View>
      </View>
    </TouchableHighlight>
  );

  // const minusAdults = () => {
  //   if (adults <= 1) {
  //     return;
  //   } else {
  //     setAdults(adults - 1);
  //   }
  // };
  // const addAdults = () => {
  //   if (adults >= 9) {
  //     return;
  //   } else {
  //     setAdults(adults + 1);
  //   }
  // };

  type ButtonItem = {
    key: number;
    buttonStyle: ViewStyle;
    color: string;
    backgroundColor: string;
    iconName: string;
    iconProvider: ButtonProp["iconProvider"];
    textStyle: TextStyle;
    textTitleStyle: TextStyle;
    textSubtitleStyle: TextStyle;
    textTitle: string | number;
    textSubtitle: string | number;
    onPress: () => void;
  };
  type ButtonItemAndIndex = {
    item: ButtonItem;
    index: number;
  };

  const buttonList: Array<ButtonItem> = [
    {
      key: 1,
      buttonStyle: HOTEL_LOCATION_BUTTON,
      color: colors.mint,
      backgroundColor: colors.mintLight,
      iconName: "location-sharp",
      iconProvider: "Ionicons",
      textStyle: LOCATION_TEXT,
      textTitleStyle: HOTEL_SEARCH_SCREEN_LOCATION_TEXT,
      textSubtitleStyle: HOTEL_SEARCH_SCREEN_DESTINATION_TEXT,
      textTitle: "DESTINATION",
      textSubtitle:
        hotelListRequest !== undefined
          ? hotelCityCodes.find(city => {
              return city.cityCode === hotelListRequest!.cityCode;
            })!.cityName
          : "Enter your destination",
      onPress: () => {
        if (snapState == 0) {
          setSnapState(1);
          bottomSheetRef.current?.snapTo(1);
          setDestinationViewOn(true);
          // setRatingViewOn(false);
        }
      },
    },
    // {
    //   key: 2,
    //   buttonStyle: HOTEL_FILTER_BUTTON,
    //   color: colors.mint,
    //   backgroundColor: colors.mintLight,
    //   iconName: "filter",
    //   iconProvider: "FontAwesome",
    //   textStyle: FILTER_TEXT,
    //   textTitleStyle: HOTEL_SEARCH_SCREEN_FILTER_TEXT,
    //   textSubtitleStyle: HOTEL_SEARCH_SCREEN_SELECT_RATING_TEXT,
    //   textTitle: "RATING SELECT",
    //   textSubtitle: "state",
    //   onPress: () => {},
    // },
    // {
    //   key: 3,
    //   buttonStyle: HOTEL_USER_BUTTON,
    //   color: colors.mint,
    //   backgroundColor: colors.mintLight,
    //   iconName: "user",
    //   iconProvider: "FontAwesome",
    //   textStyle: USER_TEXT,
    //   textTitleStyle: HOTEL_SEARCH_SCREEN_USER_TEXT,
    //   textSubtitleStyle: HOTEL_SEARCH_SCREEN_USER_ROOMS_TEXT,
    //   textTitle: "ROOMS AND GUESTS",
    //   textSubtitle: "1 room, 1 guest",
    //   onPress: () => {
    //     if (snapState == 0) {
    //       setSnapState(1);
    //       bottomSheetRef.current?.snapTo(1);
    //       setDestinationViewOn(false);
    //       setRatingViewOn(false);
    //       setUserViewOn(true);
    //     }
    //   },
    // },
  ];

  // calendar items

  // const [markedDates, setMarkedDates] = useState<MarkedDates>({});

  // const changeMarkedDatesCallBack = (day: DateData) => {
  //   const updateMarkedDates = {...markedDates};
  //   if (
  //     !(day.dateString in updateMarkedDates) &&
  //     Object.keys(updateMarkedDates).length < 3
  //   ) {
  //     updateMarkedDates[day.dateString] = {
  //       color: colors.mint,
  //       startingDay: true,
  //     };

  //     for (const [index, [key, value]] of Object.entries(
  //       Object.entries(updateMarkedDates),
  //     )) {
  //       let parsedIndex = parseInt(index);

  //       if (parsedIndex === 0) {
  //         updateMarkedDates[key] = {color: colors.mint, startingDay: true};
  //       } else if (
  //         parsedIndex + 1 ===
  //         Object.entries(updateMarkedDates).length
  //       ) {
  //         updateMarkedDates[key] = {color: colors.mint, endingDay: true};
  //       } else if (
  //         parsedIndex !== 0 &&
  //         parseInt(index) !== Object.entries(updateMarkedDates).length
  //       ) {
  //         updateMarkedDates[key] = {
  //           color: colors.mintLight,
  //           startingDay: false,
  //           endingDay: false,
  //         };
  //       }
  //     }
  //     setMarkedDates(updateMarkedDates);

  //     // console.log("markedDates: ", markedDates);
  //   }
  // };

  return (
    <ImageBackground
      source={require("@travelasset/images/crown-hotel.jpeg")}
      style={{flex: 1}}
      resizeMode="cover">
      <SafeAreaView style={HOTEL_SEARCH_SCREEN}>
        <View style={HOTEL_BACK_BUTTON}>
          <ButtonWithColorBg
            size={20}
            color={colors.mint}
            iconName={"chevron-back"}
            iconProvider={"Ionicons"}
            backgroundColor={colors.mintLight}
            onPress={() => navigation.goBack()}
          />
        </View>

        <View style={HOTEL_SEARCH_SCREEN_TITLE_ROW}>
          <PaperText style={HOTEL_SEARCH_SCREEN_TITLE_TEXT}>
            Hotel Booking
          </PaperText>
          <PaperText style={HOTEL_SEARCH_SCREEN_SUBTITLE_TEXT}>
            2,133 World Class Hotel For You and Your Family
          </PaperText>
        </View>
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          style={{borderRadius: 25, overflow: "hidden"}}>
          {destinationViewOn ? (
            <View>
              <PaperText style={HOTEL_SEARCH_BOOKING_HOTELS_TEXT}>
                Search Your Destination
              </PaperText>
              <View style={HOTEL_SEARCH_DESTINATION_BUTTON}>
                <PaperSearchbar
                  style={HOTEL_SEARCH_BAR}
                  onChangeText={findHotelCityCodes}
                  onBlur={(
                    event: NativeSyntheticEvent<TextInputFocusEventData>,
                  ) => {
                    event.target;
                  }}
                  // onFocus={(
                  //   event: NativeSyntheticEvent<TextInputFocusEventData>,
                  // ) => {
                  //   event.target;
                  // }}

                  value={inputValue}
                />
              </View>
              <View style={HOTEL_SEARCH_YOUR_BOOKING_HOTELS_DESTINATION}>
                {hotelCityCodesLocalState.length > 0 ? (
                  <FlatList
                    data={hotelCityCodesLocalState}
                    renderItem={({item, index, separators}) => (
                      <TouchableHighlight
                        key={item.cityCode}
                        onPress={() => {
                          dispatch(chooseCityCode(item.cityCode));
                          setSnapState(0);
                          bottomSheetRef.current?.snapTo(0);
                          setDestinationViewOn(false);
                          // setRatingViewOn(false);
                        }}
                        onShowUnderlay={separators.highlight}
                        onHideUnderlay={separators.unhighlight}>
                        <View style={{backgroundColor: "azure"}}>
                          <PaperText>{item.cityName}</PaperText>
                        </View>
                      </TouchableHighlight>
                    )}
                    ItemSeparatorComponent={() => (
                      <PaperDivider style={HOTEL_SEARCH_SCREEN_DIVIDER_LINE} />
                    )}
                  />
                ) : (
                  <>
                    <ButtonWithColorBg
                      size={20}
                      color={colors.black}
                      iconName={"location-arrow"}
                      iconProvider={"FontAwesome"}
                    />
                    <PaperText
                      style={{
                        paddingLeft: 20,
                        paddingBottom: 10,
                      }}>
                      Search Your destination
                    </PaperText>
                  </>
                )}
              </View>
            </View>
          ) : null}
          {/* {dateViewOn ? (
            // <View>
            //   <PaperText style={HOTEL_SEARCH_BOOKING_DATE_TEXT}>
            //     Select Dates
            //   </PaperText>
            //   <Calendar
            //     style={{marginTop: 30}}
            //     monthFormat={"yyyy MMM"}
            //     minDate={"2022-01-01"}
            //     maxDate={"2026-12-31"}
            //     markingType={"period"}
            //     markedDates={markedDates}
            //     onDayPress={changeMarkedDatesCallBack}
            //     onMonthChange={month => {
            //       console.log("month changed", month);
            //     }}
            //   />
            // </View>
          ) : null} */}
          {/* {userViewOn ? (
            <View>
              <PaperText style={HOTEL_SEARCH_BOOKING_ROOM_TEXT}>
                Rooms & Guests
              </PaperText>
              <PaperDivider style={HOTEL_SEARCH_SCREEN_DIVIDER_LINE} />
              <PaperText style={HOTEL_SEARCH_ROOM_TEXT}>Room 1</PaperText>
              <PaperDivider style={HOTEL_SEARCH_SCREEN_DIVIDER_LINE} />

              <View style={HOTEL_SEARCH_BOOKING_ADULTS_ROW}>
                <View style={HOTEL_SEARCH_BOOKING_ADULTS_LEFT_COLUMN}>
                  <PaperText style={HOTEL_SEARCH_ADULTS_TEXT}>Adults</PaperText>
                </View>
                <View style={HOTEL_SEARCH_BOOKING_ADULTS_RIGHT_COLUMN}>
                  <View style={HOTEL_ADULTS_MINUS_BUTTON}>
                    <ButtonWithColorBg
                      size={25}
                      color={colors.mint}
                      iconName={"minuscircle"}
                      iconProvider={"AntDesign"}
                      onPress={minusAdults}
                    />
                  </View>

                  <PaperText style={HOTEL_SEARCH_ADULTS_TEXT}>
                    {adults}
                  </PaperText>

                  <View style={HOTEL_ADULTS_ADD_BUTTON}>
                    <ButtonWithColorBg
                      size={25}
                      color={colors.mint}
                      iconName={"pluscircle"}
                      iconProvider={"AntDesign"}
                      onPress={addAdults}
                    />
                  </View>
                </View>
              </View>
              <PaperDivider style={HOTEL_SEARCH_SCREEN_DIVIDER_LINE} />
            </View>
          ) : null} */}
          {!destinationViewOn ? (
            <View style={{height: "18%"}}>
              <FlatList
                data={buttonList}
                keyExtractor={buttonItem => buttonItem.key.toString()}
                renderItem={renderItem}
                contentContainerStyle={{backgroundColor: "white"}}
                ItemSeparatorComponent={() => (
                  <PaperDivider style={HOTEL_SEARCH_SCREEN_DIVIDER_LINE} />
                )}
                style={{paddingTop: 25, flex: 1}}
              />
              <PaperDivider style={HOTEL_SEARCH_SCREEN_DIVIDER_LINE} />
              {/* Rating row */}
              <View style={{width: "100%", height: "15%"}}>
                <Rating
                  showRating={true}
                  onFinishRating={(rating: number) =>
                    dispatch(selectRating(rating))
                  }
                  style={{paddingVertical: 10}}
                  type="custom"
                  ratingTextColor={colors.mint}
                  startingValue={3}
                  fractions={0}
                  jumpValue={1}
                />
              </View>
            </View>
          ) : null}
        </BottomSheet>

        <View
          style={{
            position: "absolute",
            bottom: 80,
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
          }}>
          <TouchableHighlight
            style={{
              width: 200,
              height: 50,
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
            }}
            onPress={
              destinationViewOn
                ? () => {
                    setSnapState(0);
                    bottomSheetRef.current?.snapTo(0);
                    setDestinationViewOn(false);
                  }
                : () => navigation.navigate("hotelList" as any)
            }
            underlayColor={"white"}>
            <View
              style={{
                height: "100%",
                width: "100%",
                borderRadius: 25,
                backgroundColor: colors.mint,
                // marginVertical: 70,
                justifyContent: "center",
                alignItems: "center",
              }}>
              <View style={HOTEL_SEARCH_BUTTON}>
                {destinationViewOn ? (
                  <PaperText style={{color: "white"}}>DONE</PaperText>
                ) : (
                  <PaperText style={{color: "white"}}>SEARCH HOTELS</PaperText>
                )}
              </View>
            </View>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

{
  /* <View>
  <View style={HOTEL_CROSS_BUTTON}>
    <ButtonWithColorBg
      size={20}
      color={colors.white}
      iconName={"cross"}
      iconProvider={"Entypo"}
      backgroundColor={colors.black}
      onPress={() => {
        setSnapState(0);
        bottomSheetRef.current?.snapTo(0);
        setDestinationViewOn(false);
        setRatingViewOn(false);
      }}
    />
  </View>
  <View style={HOTEL_SEARCH_HOTEL_RATING}>
    <PaperText style={HOTEL_SEARCH_HOTEL_CLASS_TEXT}>Hotel Class</PaperText>
  </View>
  <View></View>
</View>; */
}
