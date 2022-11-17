import {
  Divider as PaperDivider,
  Searchbar as PaperSearchbar,
  Text as PaperText,
  useTheme,
} from "react-native-paper";
import {Calendar, DateData} from "react-native-calendars";
import React, {FC, useCallback, useMemo, useRef, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import BottomSheet from "@gorhom/bottom-sheet";
import ButtonWithColorBg, {
  ButtonProp,
} from "../../components/ButtonWithColorBg";
import {
  DATE_TEXT,
  HOTEL_BACK_BUTTON,
  HOTEL_DATE_BUTTON,
  HOTEL_LOCATION_BUTTON,
  HOTEL_SEARCH_BAR,
  HOTEL_SEARCH_BOOKING_DATE_TEXT,
  HOTEL_SEARCH_BOOKING_HOTELS_TEXT,
  HOTEL_SEARCH_BUTTON,
  HOTEL_SEARCH_DESTINATION_BUTTON,
  HOTEL_SEARCH_SCREEN,
  HOTEL_SEARCH_SCREEN_DATE_TEXT,
  HOTEL_SEARCH_SCREEN_DESTINATION_TEXT,
  HOTEL_SEARCH_SCREEN_DIVIDER_LINE,
  HOTEL_SEARCH_SCREEN_LOCATION_TEXT,
  HOTEL_SEARCH_SCREEN_SELECT_DATE_TEXT,
  HOTEL_SEARCH_SCREEN_SUBTITLE_TEXT,
  HOTEL_SEARCH_SCREEN_TITLE_ROW,
  HOTEL_SEARCH_SCREEN_TITLE_TEXT,
  HOTEL_SEARCH_SCREEN_USER_ROOMS_TEXT,
  HOTEL_SEARCH_SCREEN_USER_TEXT,
  HOTEL_SEARCH_YOUR_BOOKING_HOTELS_DESTINATION,
  HOTEL_SEARCH_BOOKING_ROOM_TEXT,
  HOTEL_SEARCH_ROOM_TEXT,
  HOTEL_USER_BUTTON,
  HOTEL_ADULTS_ADD_BUTTON,
  HOTEL_ADULTS_MINUS_BUTTON,
  LOCATION_TEXT,
  USER_TEXT,
  HOTEL_SEARCH_BOOKING_ADULTS_LEFT_COLUMN,
  HOTEL_SEARCH_BOOKING_ADULTS_RIGHT_COLUMN,
  HOTEL_SEARCH_BOOKING_ADULTS_ROW,
  HOTEL_SEARCH_ADULTS_TEXT,
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
import {MarkedDates} from "react-native-calendars/src/types";

export interface HotelSearchScreenProps {}

export const HotelSearchScreen: FC<
  StackScreenProps<StackNavigatorParamList, "hotelSearch">
> = ({route, navigation}) => {
  const {colors} = useTheme();

  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo<Array<string>>(() => ["60%", "80%"], []);

  // current snapPoints
  const [snapState, setSnapState] = useState<number>(0);
  const [destinationViewOn, setDestinationViewOn] = useState<boolean>(false);
  const [dateViewOn, setDateViewOn] = useState<boolean>(false);
  const [userViewOn, setUserViewOn] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [adults, setAdults] = useState<number>(1);

  const minusAdults = () => {
    if (adults <= 1) {
      return;
    } else {
      setAdults(adults - 1);
    }
  };
  const addAdults = () => {
    if (adults >= 9) {
      return;
    } else {
      setAdults(adults + 1);
    }
  };

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
      textSubtitle: "Enter your destination",
      onPress: () => {
        if (snapState == 0) {
          setSnapState(1);
          bottomSheetRef.current?.snapTo(1);
          setDestinationViewOn(true);
          setDateViewOn(false);
          setUserViewOn(false);
        }
      },
    },
    {
      key: 2,
      buttonStyle: HOTEL_DATE_BUTTON,
      color: colors.mint,
      backgroundColor: colors.mintLight,
      iconName: "date-range",
      iconProvider: "MaterialIcons",
      textStyle: DATE_TEXT,
      textTitleStyle: HOTEL_SEARCH_SCREEN_DATE_TEXT,
      textSubtitleStyle: HOTEL_SEARCH_SCREEN_SELECT_DATE_TEXT,
      textTitle: "SELECT DATE",
      textSubtitle: "18 Sep - 20 Sep(2 night)",
      onPress: () => {
        if (snapState == 0) {
          setSnapState(1);
          bottomSheetRef.current?.snapTo(1);
          setDestinationViewOn(false);
          setDateViewOn(true);
          setUserViewOn(false);
        }
      },
    },
    {
      key: 3,
      buttonStyle: HOTEL_USER_BUTTON,
      color: colors.mint,
      backgroundColor: colors.mintLight,
      iconName: "user",
      iconProvider: "FontAwesome",
      textStyle: USER_TEXT,
      textTitleStyle: HOTEL_SEARCH_SCREEN_USER_TEXT,
      textSubtitleStyle: HOTEL_SEARCH_SCREEN_USER_ROOMS_TEXT,
      textTitle: "ROOMS AND GUESTS",
      textSubtitle: "1 room, 1 guest",
      onPress: () => {
        if (snapState == 0) {
          setSnapState(1);
          bottomSheetRef.current?.snapTo(1);
          setDestinationViewOn(false);
          setDateViewOn(false);
          setUserViewOn(true);
        }
      },
    },
  ];

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

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

  // calendar items

  const [markedDates, setMarkedDates] = useState<MarkedDates>({});

  const changeMarkedDatesCallBack = (day: DateData) => {
    const updateMarkedDates = {...markedDates};
    if (
      !(day.dateString in updateMarkedDates) &&
      Object.keys(updateMarkedDates).length < 3
    ) {
      updateMarkedDates[day.dateString] = {
        color: colors.mint,
        startingDay: true,
      };

      for (const [index, [key, value]] of Object.entries(
        Object.entries(updateMarkedDates),
      )) {
        let parsedIndex = parseInt(index);

        if (parsedIndex === 0) {
          updateMarkedDates[key] = {color: colors.mint, startingDay: true};
        } else if (
          parsedIndex + 1 ===
          Object.entries(updateMarkedDates).length
        ) {
          updateMarkedDates[key] = {color: colors.mint, endingDay: true};
        } else if (
          parsedIndex !== 0 &&
          parseInt(index) !== Object.entries(updateMarkedDates).length
        ) {
          updateMarkedDates[key] = {
            color: colors.mintLight,
            startingDay: false,
            endingDay: false,
          };
        }
      }
      setMarkedDates(updateMarkedDates);

      // console.log("markedDates: ", markedDates);
    }
  };

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
                  onBlur={(
                    event: NativeSyntheticEvent<TextInputFocusEventData>,
                  ) => {
                    event.target;
                  }}
                  onFocus={(
                    event: NativeSyntheticEvent<TextInputFocusEventData>,
                  ) => {
                    event.target;
                  }}
                  onChangeText={event => setInputValue(event)}
                  value={inputValue}
                />
              </View>
              <View style={HOTEL_SEARCH_YOUR_BOOKING_HOTELS_DESTINATION}>
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
                  Search Nearby Destination
                </PaperText>
              </View>
            </View>
          ) : null}
          {dateViewOn ? (
            <View>
              <PaperText style={HOTEL_SEARCH_BOOKING_DATE_TEXT}>
                Select Dates
              </PaperText>
              <Calendar
                style={{marginTop: 30}}
                monthFormat={"yyyy MMM"}
                minDate={"2022-01-01"}
                maxDate={"2026-12-31"}
                markingType={"period"}
                markedDates={markedDates}
                onDayPress={changeMarkedDatesCallBack}
                onMonthChange={month => {
                  console.log("month changed", month);
                }}
              />
            </View>
          ) : null}
          {userViewOn ? (
            <View>
              <PaperText style={HOTEL_SEARCH_BOOKING_ROOM_TEXT}>
                Rooms & Guests
              </PaperText>
              <PaperDivider style={HOTEL_SEARCH_SCREEN_DIVIDER_LINE} />
              <PaperText style={HOTEL_SEARCH_ROOM_TEXT}>Room 1</PaperText>
              <PaperDivider style={HOTEL_SEARCH_SCREEN_DIVIDER_LINE} />
              {/* Adults row */}
              <View style={HOTEL_SEARCH_BOOKING_ADULTS_ROW}>
                <View style={HOTEL_SEARCH_BOOKING_ADULTS_LEFT_COLUMN}>
                  <PaperText style={HOTEL_SEARCH_ADULTS_TEXT}>Adults</PaperText>
                </View>
                <View style={HOTEL_SEARCH_BOOKING_ADULTS_RIGHT_COLUMN}>
                  {/* minus button */}
                  <View style={HOTEL_ADULTS_MINUS_BUTTON}>
                    <ButtonWithColorBg
                      size={25}
                      color={colors.mint}
                      iconName={"minuscircle"}
                      iconProvider={"AntDesign"}
                      onPress={minusAdults}
                    />
                  </View>
                  {/* adult count */}
                  <PaperText style={HOTEL_SEARCH_ADULTS_TEXT}>
                    {adults}
                  </PaperText>
                  {/* add button */}
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
          ) : null}
          {!destinationViewOn && !dateViewOn && !userViewOn ? (
            <FlatList
              data={buttonList}
              keyExtractor={buttonItem => buttonItem.key.toString()}
              renderItem={renderItem}
              contentContainerStyle={{backgroundColor: "white"}}
              ItemSeparatorComponent={() => (
                <PaperDivider style={HOTEL_SEARCH_SCREEN_DIVIDER_LINE} />
              )}
              style={{paddingTop: 25}}
            />
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
                    setDateViewOn(false);
                    setUserViewOn(false);
                  }
                : dateViewOn
                ? () => {
                    setSnapState(0);
                    bottomSheetRef.current?.snapTo(0);
                    setDestinationViewOn(false);
                    setDateViewOn(false);
                    setUserViewOn(false);
                  }
                : userViewOn
                ? () => {
                    setSnapState(0);
                    bottomSheetRef.current?.snapTo(0);
                    setDestinationViewOn(false);
                    setDateViewOn(false);
                    setUserViewOn(false);
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
                {destinationViewOn || dateViewOn || userViewOn ? (
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
