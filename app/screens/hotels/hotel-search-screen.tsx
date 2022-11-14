import {
  Button as PaperButton,
  Divider as PaperDivider,
  IconButton as PaperIconButton,
  Text as PaperText,
  useTheme,
} from "react-native-paper";
import React, {FC, useCallback, useMemo, useRef, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import BottomSheet, {BottomSheetFlatList} from "@gorhom/bottom-sheet";
import ButtonWithColorBg, {
  ButtonProp,
} from "../../components/ButtonWithColorBg";
import {
  HOTEL_SEARCH_SCREEN,
  HOTEL_BACK_BUTTON,
  HOTEL_SEARCH_SCREEN_TITLE_ROW,
  HOTEL_SEARCH_SCREEN_TITLE_TEXT,
  HOTEL_SEARCH_SCREEN_SUBTITLE_TEXT,
  HOTEL_SEARCH_SCREEN_DIVIDER_LINE,
  HOTEL_DATE_BUTTON,
  HOTEL_USER_BUTTON,
  HOTEL_BOTTOM_SHEET,
  HOTEL_SEARCH_SCREEN_LOCATION_TEXT,
  HOTEL_SEARCH_SCREEN_DESTINATION_TEXT,
  HOTEL_SEARCH_SCREEN_DATE_TEXT,
  HOTEL_SEARCH_SCREEN_SELECT_DATE_TEXT,
  HOTEL_SEARCH_SCREEN_USER_TEXT,
  HOTEL_SEARCH_SCREEN_USER_ROOMS_TEXT,
  HOTEL_LOCATION_BUTTON,
  HOTEL_SEARCH_BUTTON,
  LOCATION_TEXT,
  DATE_TEXT,
  USER_TEXT,
  HOME_SCREEN_DIVIDER_LINE,
} from "../../theme/styles";
import {
  FlatList,
  ImageBackground,
  ScrollView,
  TextStyle,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import {StackNavigatorParamList} from "../../navigators";
import {StackScreenProps} from "@react-navigation/stack";
import {color} from "react-native-reanimated";

// import FeatherIcon from 'react-native-vector-icons/Feather'
// <FeatherIcon name=""/>

export interface HotelSearchScreenProps {}

export const HotelSearchScreen: FC<
  StackScreenProps<StackNavigatorParamList, "hotelSearch">
> = ({route, navigation}) => {
  const {colors} = useTheme();

  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo<Array<string>>(() => ["60%", "80%"], []);

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
    },
  ];

  // current snapPoints
  const [snapState, setSnapState] = useState<number>(0);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  // render
  const renderItem = ({item, index}: ButtonItemAndIndex) => (
    <TouchableHighlight
      onPress={() => {
        if (snapState == 0) {
          setSnapState(1);
          bottomSheetRef.current?.snapTo(1);
        } else {
          setSnapState(0);
          bottomSheetRef.current?.snapTo(0);
        }
      }}
      underlayColor={colors.white}>
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

  return (
    <ImageBackground
      source={require("@travelasset/images/crown-hotel.jpeg")}
      style={{flex: 1}}
      resizeMode="cover">
      <View style={HOTEL_SEARCH_SCREEN}>
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
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          style={{borderRadius: 25, overflow: "hidden"}}>
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
        </BottomSheet>

        <TouchableHighlight
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
          }}
          onPress={() => navigation.navigate("hotelList" as any)}
          underlayColor={"azure"}>
          <View
            style={{
              height: 50,
              width: 200,
              borderRadius: 25,
              backgroundColor: colors.mint,
              marginVertical: 70,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <View style={HOTEL_SEARCH_BUTTON}>
              <PaperText style={{color: "white"}}>SEARCH HOTELS</PaperText>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    </ImageBackground>
  );
};

/*
{state == true ? (
  <Text>123</Text>
  : <Text>456</Text>
)}
*/
