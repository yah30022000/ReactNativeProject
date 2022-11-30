import {
  Divider as PaperDivider,
  Modal as PaperModal,
  Portal as PaperPortal,
  Searchbar as PaperSearchbar,
  Snackbar as PaperSnackbar,
  Text as PaperText,
  useTheme,
} from "react-native-paper";
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomSheet from "@gorhom/bottom-sheet";
import ButtonWithColorBg from "../../components/ButtonWithColorBg";
import {
  FILTER_TEXT,
  HOTEL_ADVANCED_ADD_BUTTON,
  HOTEL_ADVANCED_MINUS_BUTTON,
  HOTEL_BACK_BUTTON,
  HOTEL_FILTER_BUTTON,
  HOTEL_LOCATION_BUTTON,
  HOTEL_SCREEN_MODAL_CONTENT_CONTAINER,
  HOTEL_SCREEN_MODAL_CONTENT_VIEW,
  HOTEL_SEARCH_ADVANCED_TEXT,
  HOTEL_SEARCH_BAR,
  HOTEL_SEARCH_BAR_DIVIDER_LINE,
  HOTEL_SEARCH_BOOKING_ADVANCED_LEFT_COLUMN,
  HOTEL_SEARCH_BOOKING_ADVANCED_RIGHT_COLUMN,
  HOTEL_SEARCH_BOOKING_ADVANCED_ROW,
  HOTEL_SEARCH_BOOKING_DESTINATION_TEXT,
  HOTEL_SEARCH_BOOKING_HOTELS_TEXT,
  HOTEL_SEARCH_BOOKING_ROOM_TEXT,
  HOTEL_SEARCH_BOOKING_ROOM_TEXT_ROW,
  HOTEL_SEARCH_BOTTOM_BUTTON,
  HOTEL_SEARCH_BOTTOM_BUTTON_ROW_WRAPPER,
  HOTEL_SEARCH_BOTTOM_BUTTON_TOUCHABLE,
  HOTEL_SEARCH_BOTTOM_BUTTON_WRAPPER,
  HOTEL_SEARCH_CALENDAR_WRAPPER,
  HOTEL_SEARCH_CITYNAME,
  HOTEL_SEARCH_CITYNAME_TEXT,
  HOTEL_SEARCH_DESTINATION_BUTTON,
  HOTEL_SEARCH_FILTER_PRICE_RANGE_TEXT,
  HOTEL_SEARCH_FILTER_PRICE_TEXT,
  HOTEL_SEARCH_FLAT_LIST,
  HOTEL_SEARCH_FLAT_LIST_WRAPPER,
  HOTEL_SEARCH_MULTI_SELECT,
  HOTEL_SEARCH_SCREEN,
  HOTEL_SEARCH_SCREEN_DESTINATION_TEXT,
  HOTEL_SEARCH_SCREEN_DIVIDER_LINE,
  HOTEL_SEARCH_SCREEN_FILTER_TEXT,
  HOTEL_SEARCH_SCREEN_LOCATION_TEXT,
  HOTEL_SEARCH_SCREEN_SUBTITLE_TEXT,
  HOTEL_SEARCH_SCREEN_TITLE_ROW,
  HOTEL_SEARCH_SCREEN_TITLE_TEXT,
  HOTEL_SEARCH_YOUR_BOOKING_HOTELS_DESTINATION,
  LOCATION_TEXT,
} from "../../theme";
import {
  FlatList,
  Image,
  ImageBackground,
  StatusBar,
  TouchableHighlight,
  useWindowDimensions,
  View,
} from "react-native";
import { StackNavigatorParamList } from "../../navigators";
import { StackScreenProps } from "@react-navigation/stack";
import CalendarPicker, { DateChangedCallback } from "react-native-calendar-picker";
import {
  amenities,
  amenitiesSelectItems,
  ButtonItem,
  ButtonItemAndIndex,
  HotelCityCode,
  hotelCityCodes,
} from "../../helper";
import { useSelector } from "react-redux";
import {
  changeHotelSearchStatus,
  getAmadeusHotelListAndOffersThunk,
  HotelListAndOffersRequest,
  HotelState,
  RootState,
  setHotelListAndOffersRequest,
  useAppDispatch,
} from "../../redux";
import { Rating } from "react-native-ratings";
import { Moment } from "moment";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import EntypoIcon from "react-native-vector-icons/Entypo";

export interface HotelSearchScreenProps {
}

export const HotelSearchScreen: FC<StackScreenProps<StackNavigatorParamList, "hotelSearch">> = ({
                                                                                                  route,
                                                                                                  navigation,
                                                                                                }) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  let dimension = useWindowDimensions();
  const bottomSheetRef = useRef<BottomSheet>(null);

  // local variables
  const snapPoints = useMemo<Array<string>>(() => ["60%", "80%", "90%"], []);
  const [snapState, setSnapState] = useState<number>(0);
  const [destinationViewOn, setDestinationViewOn] = useState<boolean>(false);
  const [calendarViewOn, setCalendarViewOn] = useState<boolean>(false);
  const [advancedViewOn, setAdvancedViewOn] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [hotelCityCodesLocalState, setHotelCityCodesLocalState] = useState<Array<HotelCityCode>>([]);
  const [modalStatus, setModalStatus] =
    useState<HotelState["hotelListAndOffersSearchStatus"]>("none");
  const minDate = new Date(); // Today
  const maxDate = new Date(2030, 12, 31);

  // local variables -> hotelListAndOffersRequest
  const [checkInDate, setCheckInDate] = useState<Moment>();
  const [checkOutDate, setCheckOutDate] = useState<Moment>();
  const [cityCode, setCityCode] = useState<string>("");
  const [currency, setCurrency] = useState<string>("");
  const [ratings, setRatings] = useState<Array<number>>([]);
  const [adults, setAdults] = useState<number>(2);
  const [rooms, setRooms] = useState<number>(1);
  const [priceRangeValue, setPriceRangeValue] = useState<number[]>([0, 1000000]);
  const [amenitiesSelected, setAmenitiesSelected] = useState<typeof amenitiesSelectItems>([]);


  // global variables
  const hotelListAndOffersRequest = useSelector<RootState>(
    state => state.hotel.hotelListAndOffersRequest,
  ) as HotelListAndOffersRequest | null;

  const hotelListAndOffersSearchStatus = useSelector<RootState>(
    state => state.hotel.hotelListAndOffersSearchStatus,
  ) as HotelState["hotelListAndOffersSearchStatus"];

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    // console.log("handleSheetChanges", index);
  }, []);

  const findHotelCityCodes = (searchInput?: string) => {
    if (searchInput) {
      let newhotelCityCodesLocalState = hotelCityCodes.filter(cityObject => {
        return cityObject.cityName.includes(searchInput);
      });
      setHotelCityCodesLocalState(newhotelCityCodesLocalState);
      // console.log("newhotelCityCodesLocalState: ", newhotelCityCodesLocalState);
      setInputValue(searchInput);
    } else {
      setInputValue("");
    }
  };

  const searchHotelApiCall = () => {
    if (!cityCode || cityCode == "") {
      onToggleSnackBar("Please choose a valid city");
      return;
    }

    if (!checkInDate || !checkOutDate) {
      onToggleSnackBar("Please pick check in and check out period");
      return;
    }

    let amenitiesIntoRequest = amenitiesSelected.map((amenity) => {
        return amenity.title;
      }) as typeof amenities;

    dispatch(setHotelListAndOffersRequest({
      cityCode: cityCode,

      // if price range is defined, need to have currency code that match the city (e.g. HKD in HKG)
      currency: priceRangeValue.length < 1 ? undefined : currency,
      adults: adults,

      roomQuantity: rooms,
      checkInDate: checkInDate?.format("yyyy-MM-DD"),
      checkOutDate: checkOutDate?.format("yyyy-MM-DD"),

      // if price range is not chosen, return undefined
      priceRange: priceRangeValue.length < 1 ? undefined :
        `${priceRangeValue[0]}-${priceRangeValue[1]}`,
      ratings: ratings.length < 1 ? [3, 4, 5] : ratings,
      amenities: amenitiesIntoRequest.length < 1 ? undefined : amenitiesIntoRequest,

      // credit card payment
      paymentPolicy: "GUARANTEE",
    }));
  };

  const closeModalCallback = () => {
    setModalStatus("none");
    dispatch(changeHotelSearchStatus("none"));
    if (modalStatus === "completed") {
      navigation.navigate("hotelList" as any);
    }
  };

  const onDateChange: DateChangedCallback = (date, type) => {
    if (type === "END_DATE") {
      setCheckOutDate(date);
    } else {
      setCheckInDate(date);
    }
  };

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
  const minusRooms = () => {
    if (rooms <= 1) {
      return;
    } else {
      setRooms(rooms - 1);
    }
  };
  const addRooms = () => {
    if (adults >= 9) {
      return;
    } else {
      setRooms(rooms + 1);
    }
  };

  /* Bottom Snackbar start */
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const onToggleSnackBar = (message: string) => {
    setSnackbarVisible(!snackbarVisible);
    setSnackbarMessage(message)
  }
  const onDismissSnackBar = () => setSnackbarVisible(false);
  /* Bottom Snackbar end */

  // render
  const renderItem = ({ item, index }: ButtonItemAndIndex) => (
    <TouchableHighlight onPress={item.onPress} underlayColor={"transparent"}>
      <View style={item.buttonStyle}>
        <ButtonWithColorBg
          size={20}
          color={item.color}
          iconName={item.iconName}
          iconProvider={item.iconProvider}
          backgroundColor={item.backgroundColor}
        />
        <View style={item.textStyle}>
          {item.customComponent ? (
            item.customComponent
          ) : (
            <>
              <PaperText style={item.textTitleStyle}>
                {item.textTitle}
              </PaperText>
              <PaperText style={item.textSubtitleStyle}>
                {item.textSubtitle}
              </PaperText>
            </>
          )}
        </View>
      </View>
    </TouchableHighlight>
  );

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
        cityCode
          ? hotelCityCodes.find(city => {
            return city.cityCode === cityCode;
            })!.cityName
          : "Enter your destination",
      onPress: () => {
        if (snapState == 0) {
          setSnapState(1);
          bottomSheetRef.current?.snapTo(1);
          setDestinationViewOn(true);
          setCalendarViewOn(false);
          setAdvancedViewOn(false);
        }
      },
    },
    {
      key: 2,
      buttonStyle: HOTEL_LOCATION_BUTTON,
      color: colors.mint,
      backgroundColor: colors.mintLight,
      iconName: "calendar-check-o",
      iconProvider: "FontAwesome",
      textStyle: LOCATION_TEXT,
      textTitleStyle: HOTEL_SEARCH_SCREEN_LOCATION_TEXT,
      textSubtitleStyle: HOTEL_SEARCH_SCREEN_DESTINATION_TEXT,
      textTitle: "BOOKING PERIOD",
      textSubtitle: checkInDate && checkOutDate ?
        `${checkInDate.format("yyyy-MM-DD")} to ${checkOutDate.format("yyyy-MM-DD")}`
        : "Check-in and Check-out dates",
      onPress: () => {
        if (snapState == 0) {
          setSnapState(1);
          bottomSheetRef.current?.snapTo(1);
          setDestinationViewOn(false);
          setCalendarViewOn(true);
          setAdvancedViewOn(false);
        }
      },
    },
    {
      key: 3,
      buttonStyle: HOTEL_FILTER_BUTTON,
      color: colors.mint,
      backgroundColor: colors.mintLight,
      iconName: "star",
      iconProvider: "FontAwesome",
      textStyle: FILTER_TEXT,
      textTitleStyle: HOTEL_SEARCH_SCREEN_LOCATION_TEXT,
      textSubtitleStyle: HOTEL_SEARCH_SCREEN_DESTINATION_TEXT,
      textTitle: "RATING SELECT",
      textSubtitle: "Star Rating of Hotels",
      onPress: () => {
      },
      customComponent: (
        <>
          <PaperText style={HOTEL_SEARCH_SCREEN_FILTER_TEXT}>
            RATING SELECT
          </PaperText>
          <Rating
            showRating={false}
            onFinishRating={(rating: number) => setRatings(Array.from([rating]))}
            style={{ paddingVertical: 10 }}
            type="custom"
            ratingTextColor={colors.black}
            startingValue={3}
            fractions={0}
            jumpValue={1}
            imageSize={30}
          />
        </>
      ),
    },
    {
      key: 4,
      buttonStyle: HOTEL_LOCATION_BUTTON,
      color: colors.mint,
      backgroundColor: colors.mintLight,
      iconName: "add-task",
      iconProvider: "MaterialIcons",
      textStyle: LOCATION_TEXT,
      textTitleStyle: HOTEL_SEARCH_SCREEN_LOCATION_TEXT,
      textSubtitleStyle: HOTEL_SEARCH_SCREEN_DESTINATION_TEXT,
      textTitle: "ADVANCED PREFERENCES",
      textSubtitle: "Number of adults, rooms, and more..",
      onPress: () => {
        if (snapState == 0) {
          setSnapState(2);
          bottomSheetRef.current?.snapTo(2);
          setDestinationViewOn(false);
          setCalendarViewOn(false);
          setAdvancedViewOn(true);
        }
      },
    },
  ];


  useEffect(() => {
    if (hotelListAndOffersSearchStatus === "loading") {
      setModalStatus("loading");
      if (hotelListAndOffersRequest) {
        dispatch(getAmadeusHotelListAndOffersThunk(hotelListAndOffersRequest));
      }
    } else if (hotelListAndOffersSearchStatus === "completed") {
      setModalStatus("completed");
    } else if (hotelListAndOffersSearchStatus === "failed") {
      setModalStatus("failed");
    }
  }, [hotelListAndOffersSearchStatus]);

  return (
    <ImageBackground
      source={require("@travelasset/images/crown-hotel.jpeg")}
      style={{flex: 1}}
      resizeMode="cover">
      <SafeAreaView style={HOTEL_SEARCH_SCREEN}>
        <StatusBar
          animated={true}
          barStyle={"light-content"}
          // hidden={true}
        />
        <View style={HOTEL_BACK_BUTTON}>
          <ButtonWithColorBg
            size={25}
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
          style={{borderRadius: 30, overflow: "hidden"}}
          // disable top line button to control height snapping
          handleComponent={null}
        >
          {destinationViewOn ? (
            <View>
              <PaperText style={HOTEL_SEARCH_BOOKING_HOTELS_TEXT}>
                Search Your Destination
              </PaperText>
              <View style={HOTEL_SEARCH_DESTINATION_BUTTON}>
                <PaperSearchbar
                  style={HOTEL_SEARCH_BAR}
                  onChangeText={findHotelCityCodes}
                  value={inputValue}
                />
              </View>
              <View style={HOTEL_SEARCH_YOUR_BOOKING_HOTELS_DESTINATION}>
                {hotelCityCodesLocalState.length > 0 ? (
                  <FlatList
                    data={hotelCityCodesLocalState}
                    renderItem={({item, index, separators}) => (
                      <TouchableHighlight
                        underlayColor={"transparent"}
                        key={item.cityCode}
                        onPress={() => {
                          setCityCode(item.cityCode);
                          setCurrency(item.currency);

                          setSnapState(0);
                          bottomSheetRef.current?.snapTo(0);
                          setDestinationViewOn(false);
                        }}
                        onShowUnderlay={separators.highlight}
                        onHideUnderlay={separators.unhighlight}>
                        <View style={HOTEL_SEARCH_CITYNAME}>
                          <ButtonWithColorBg
                            size={20}
                            color={colors.grey}
                            iconName={"search"}
                            iconProvider={"FontAwesome"}
                          />
                          <PaperText style={HOTEL_SEARCH_CITYNAME_TEXT}>
                            {item.cityName}
                          </PaperText>
                        </View>
                      </TouchableHighlight>
                    )}
                    ItemSeparatorComponent={() => (
                      <PaperDivider style={HOTEL_SEARCH_BAR_DIVIDER_LINE} />
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
                    <PaperText style={HOTEL_SEARCH_BOOKING_DESTINATION_TEXT}>
                      Search Your destination
                    </PaperText>
                  </>
                )}
              </View>
            </View>
          ) : null}
          {calendarViewOn ? (
            <View>
              <PaperText style={HOTEL_SEARCH_BOOKING_HOTELS_TEXT}>
                Search Dates
              </PaperText>
              <View style={HOTEL_SEARCH_CALENDAR_WRAPPER}>
                <CalendarPicker
                  startFromMonday={false}
                  allowRangeSelection={true}
                  minDate={minDate}
                  maxDate={maxDate}
                  todayBackgroundColor={colors.purple}
                  selectedDayColor={colors.mint}
                  selectedDayTextColor={colors.white}
                  onDateChange={onDateChange}
                />
                {/*<PaperText>Check in {checkInDate ? checkInDate.format("yyyy-MM-DD") : ""}</PaperText>*/}
              </View>
            </View>
          ) : null}

          {advancedViewOn ? (
            <View style={{ paddingHorizontal: 15 }}>
              <View style={HOTEL_SEARCH_BOOKING_ROOM_TEXT_ROW}>
                <PaperText style={HOTEL_SEARCH_BOOKING_ROOM_TEXT}>
                  Advanced Preferences
                </PaperText>
              </View>

              <PaperDivider style={HOTEL_SEARCH_SCREEN_DIVIDER_LINE} />

              {/* Adults Row */}
              <View style={HOTEL_SEARCH_BOOKING_ADVANCED_ROW}>
                <View style={HOTEL_SEARCH_BOOKING_ADVANCED_LEFT_COLUMN}>
                  <PaperText style={HOTEL_SEARCH_ADVANCED_TEXT}>Adults</PaperText>
                </View>
                <View style={HOTEL_SEARCH_BOOKING_ADVANCED_RIGHT_COLUMN}>
                  <View style={HOTEL_ADVANCED_MINUS_BUTTON}>
                    <ButtonWithColorBg
                      size={30}
                      color={colors.mint}
                      iconName={"minuscircle"}
                      iconProvider={"AntDesign"}
                      onPress={minusAdults}
                    />
                  </View>
                  <PaperText style={HOTEL_SEARCH_ADVANCED_TEXT}>
                    {adults}
                  </PaperText>
                  <View style={HOTEL_ADVANCED_ADD_BUTTON}>
                    <ButtonWithColorBg
                      size={30}
                      color={colors.mint}
                      iconName={"pluscircle"}
                      iconProvider={"AntDesign"}
                      onPress={addAdults}
                    />
                  </View>
                </View>
              </View>

              <PaperDivider style={HOTEL_SEARCH_SCREEN_DIVIDER_LINE} />

              {/* Rooms Row */}
              <View style={HOTEL_SEARCH_BOOKING_ADVANCED_ROW}>
                <View style={HOTEL_SEARCH_BOOKING_ADVANCED_LEFT_COLUMN}>
                  <PaperText style={HOTEL_SEARCH_ADVANCED_TEXT}>Rooms</PaperText>
                </View>
                <View style={HOTEL_SEARCH_BOOKING_ADVANCED_RIGHT_COLUMN}>
                  <View style={HOTEL_ADVANCED_MINUS_BUTTON}>
                    <ButtonWithColorBg
                      size={30}
                      color={colors.mint}
                      iconName={"minuscircle"}
                      iconProvider={"AntDesign"}
                      onPress={minusRooms}
                    />
                  </View>
                  <PaperText style={HOTEL_SEARCH_ADVANCED_TEXT}>
                    {rooms}
                  </PaperText>
                  <View style={HOTEL_ADVANCED_ADD_BUTTON}>
                    <ButtonWithColorBg
                      size={30}
                      color={colors.mint}
                      iconName={"pluscircle"}
                      iconProvider={"AntDesign"}
                      onPress={addRooms}
                    />
                  </View>
                </View>
              </View>

              <PaperDivider style={HOTEL_SEARCH_SCREEN_DIVIDER_LINE} />

              {/* Price Range Row */}
              <View style={{ marginVertical: 20, paddingHorizontal: 20 }}>
                <View style={{ flexDirection: "column", justifyContent: "space-between" }}>
                  <PaperText style={HOTEL_SEARCH_FILTER_PRICE_RANGE_TEXT}>
                    Price Range (Total Nights)
                  </PaperText>
                  <PaperText style={HOTEL_SEARCH_FILTER_PRICE_TEXT}>
                    {currency ? currency : "HKD"}{" "}
                    {priceRangeValue[0]}
                    -
                    {currency ? currency : "HKD"}{" "}
                    {priceRangeValue[1]}
                  </PaperText>
                </View>
                <View style={{ marginVertical: 10 }}>
                  <MultiSlider
                    values={priceRangeValue}
                    onValuesChange={(values: number[]) => setPriceRangeValue(values)}
                    sliderLength={dimension.width * 0.85}
                    min={0}
                    max={1000000}
                    step={100}
                    trackStyle={{ backgroundColor: colors.grey }}
                    selectedStyle={{ backgroundColor: colors.mint }}
                    markerStyle={{ borderColor: colors.mint, borderWidth: 3 }}
                    pressedMarkerStyle={{ borderColor: colors.mint, borderWidth: 2 }}
                  />
                </View>
              </View>

              <PaperDivider style={HOTEL_SEARCH_SCREEN_DIVIDER_LINE} />

              <View style={{ paddingHorizontal: 10 }}>
                <SectionedMultiSelect
                  items={amenitiesSelectItems}
                  IconRenderer={MaterialIcons as any}
                  uniqueKey="id"
                  displayKey={"title"}
                  selectText="Amenities"
                  showDropDowns={true}
                  animateDropDowns={false}
                  readOnlyHeadings={false}
                  onSelectedItemsChange={(items) => {
                    setAmenitiesSelected(items);
                    console.log("setAmenitiesSelected: ", amenitiesSelected);
                  }}
                  selectedItems={amenitiesSelected}
                  chipRemoveIconComponent={
                    <View style={{ margin: 2 }}>
                      <EntypoIcon color={colors.white} name={"cross"} size={18} />
                    </View>
                  }
                  styles={HOTEL_SEARCH_MULTI_SELECT}
                />
              </View>
            </View>
          ) : null}

          {!destinationViewOn && !calendarViewOn && !advancedViewOn ? (
            <View style={HOTEL_SEARCH_FLAT_LIST_WRAPPER}>
              <FlatList
                data={buttonList}
                keyExtractor={buttonItem => buttonItem.key.toString()}
                renderItem={renderItem}
                contentContainerStyle={{ backgroundColor: "white" }}
                ItemSeparatorComponent={() => (
                  <PaperDivider style={HOTEL_SEARCH_SCREEN_DIVIDER_LINE} />
                )}
                style={HOTEL_SEARCH_FLAT_LIST}
              />
              <PaperDivider style={HOTEL_SEARCH_SCREEN_DIVIDER_LINE} />
            </View>
          ) : null}
        </BottomSheet>

        <View style={HOTEL_SEARCH_BOTTOM_BUTTON_ROW_WRAPPER}>
          <TouchableHighlight
            style={HOTEL_SEARCH_BOTTOM_BUTTON_TOUCHABLE}
            onPress={
              destinationViewOn || calendarViewOn || advancedViewOn ? () => {
                  setSnapState(0);
                  bottomSheetRef.current?.snapTo(0);
                  setDestinationViewOn(false);
                  setCalendarViewOn(false);
                  setAdvancedViewOn(false);
                }
                : searchHotelApiCall
            }
            underlayColor={"transparent"}>
            <View style={HOTEL_SEARCH_BOTTOM_BUTTON_WRAPPER}>
              <View style={HOTEL_SEARCH_BOTTOM_BUTTON}>
                {destinationViewOn || calendarViewOn || advancedViewOn ? (
                  <PaperText style={{ color: "white" }}>DONE</PaperText>
                ) : (
                  <PaperText style={{ color: "white" }}>SEARCH HOTELS</PaperText>
                )}
              </View>
            </View>
          </TouchableHighlight>
        </View>

        {/* Error Snackbar for not fulfilling the form fields */}
        <PaperSnackbar
          style={{
            backgroundColor: colors.red
          }}
          visible={snackbarVisible}
          onDismiss={onDismissSnackBar}
          action={{
            label: "Close",
            color: "white",
            onPress: () => {
              onDismissSnackBar();
            },
          }}>
          {snackbarMessage}
        </PaperSnackbar>

        {/* Modal when loading */}
        <PaperPortal>
          <PaperModal
            visible={
              modalStatus === "loading" ||
              modalStatus === "completed" ||
              modalStatus === "failed"
            }
            onDismiss={closeModalCallback}
            contentContainerStyle={HOTEL_SCREEN_MODAL_CONTENT_CONTAINER}>
            <View
              style={HOTEL_SCREEN_MODAL_CONTENT_VIEW}>
              {/* Image */}
              <View
                style={{
                  height: "40%",
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "center",
                }}>
                <Image
                  source={
                    modalStatus === "loading" ?
                    require("@travelasset/images/loading.jpeg") :
                    modalStatus === "completed" ?
                    require("@travelasset/images/success.jpeg") :
                    modalStatus === "failed" ?
                    require("@travelasset/images/fail.jpeg") : undefined
                  }
                  style={{
                    height: 250,
                    width: 250,
                  }}
                  resizeMode="cover"
                />
              </View>
              <View>
                <PaperText style={{fontSize: 32, textAlign: "center"}}>
                  { modalStatus === "loading" ?  "Loading Appropriate Choices For You ..." :
                    modalStatus === "completed" ? "Successfully Found Hotel List !" :
                    modalStatus === "failed" ? "Cannot Find Hotel List ..." : ""
                  }
                </PaperText>
              </View>
              <View>
                <TouchableHighlight
                  style={HOTEL_SEARCH_BOTTOM_BUTTON_TOUCHABLE}
                  onPress={closeModalCallback}
                  underlayColor={"transparent"}>
                  <View style={HOTEL_SEARCH_BOTTOM_BUTTON_WRAPPER}>
                    <View style={HOTEL_SEARCH_BOTTOM_BUTTON}>
                      <PaperText style={{color: colors.white}}>CLOSE</PaperText>
                    </View>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </PaperModal>
        </PaperPortal>
      </SafeAreaView>
    </ImageBackground>
  );
};

