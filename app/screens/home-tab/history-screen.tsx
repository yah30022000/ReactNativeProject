import React, {FC} from "react";
import {TabNavigatorParamList} from "../../navigators/home-bottom-tab";
import {MaterialBottomTabScreenProps} from "@react-navigation/material-bottom-tabs";
import {SafeAreaView} from "react-native-safe-area-context";
import {
  Text as PaperText,
  useTheme,
  Divider as PaperDivider,
} from "react-native-paper";

import {
  BOOKING_HISTORY_SCREEN,
  BOOKING_HISTORY_BACK_BUTTON,
  BOOKING_HISTORY_TITLE,
  BOOKING_HISTORY_TITLE_TEXT,
  BOOKING_HISTORY_OPTION_ITEM,
  BOOKING_HISTORY_OPTION_ITEM_TEXT,
  BOOKING_HISTORY_SCREEN_DIVIDER_LINE,
} from "../../theme";
import {FlatList, TouchableHighlight, View} from "react-native";
import ButtonWithColorBg, {
  ButtonProp,
} from "../../components/ButtonWithColorBg";
import {useAppDispatch} from "../../redux/hooks";

export interface HistoryScreenProps {}

export interface BookingHistoryItem extends ButtonProp {
  date: string;
  title: string;
  dateFontSize: number;
  titleFontSize: number;
  textColor?: string;
  hotelID: string;
  Price: string;
}

export const HistoryScreen: FC<
  MaterialBottomTabScreenProps<TabNavigatorParamList, "history">
> = ({route, navigation}) => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  /* props */
  // const {}: HistoryScreenProps = route.params;
  const buttonList: Array<BookingHistoryItem> = [
    {
      date: "11/2022",
      title: "Renaissance Hong Kong Harbour View Hotel",
      titleFontSize: 18,
      dateFontSize: 16,
      size: 20,
      color: colors.mint,
      backgroundColor: "transparent",
      iconName: "hotel",
      iconProvider: "FontAwesome5",
      hotelID: "BRHKGHVB",
      Price: "HKD 1309",
      onPress: () => {},
    },
    {
      date: "11/2022",
      title: "CROWNE PLAZA CAUSEWAY",
      titleFontSize: 18,
      dateFontSize: 16,
      size: 20,
      color: colors.mint,
      backgroundColor: "transparent",
      iconName: "hotel",
      iconProvider: "FontAwesome5",
      hotelID: "CPHKGBCA",
      Price: "HKD 1705",
      onPress: () => {},
    },
    {
      date: "11/2022",
      title: "CROWNE PLAZA HONG KONG KOWLOON EAST",
      titleFontSize: 18,
      dateFontSize: 16,
      size: 20,
      color: colors.mint,
      backgroundColor: "transparent",
      iconName: "hotel",
      iconProvider: "FontAwesome5",
      hotelID: "CPHKGD61",
      Price: "HKD 1078",
      onPress: () => {},
    },
    {
      date: "11/2022",
      title: "THE GARDEN VIEW YWCA",
      titleFontSize: 18,
      dateFontSize: 16,
      size: 20,
      color: colors.mint,
      backgroundColor: "transparent",
      iconName: "hotel",
      iconProvider: "FontAwesome5",
      hotelID: "HSHKGACI",
      Price: "HKD 1650",
      onPress: () => {},
    },
  ];
  return (
    <SafeAreaView style={BOOKING_HISTORY_SCREEN}>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}>
        <TouchableHighlight
          style={{flexGrow: 0.4}}
          onPress={() => navigation.goBack()}
          underlayColor={"transparent"}>
          <View style={BOOKING_HISTORY_BACK_BUTTON}>
            <ButtonWithColorBg
              size={25}
              color={colors.white}
              iconName={"chevron-back"}
              iconProvider={"Ionicons"}
              backgroundColor={colors.mint}
              onPress={() => navigation.goBack()}
            />
          </View>
        </TouchableHighlight>
        <View style={BOOKING_HISTORY_TITLE}>
          <PaperText style={BOOKING_HISTORY_TITLE_TEXT}>
            Booking History
          </PaperText>
        </View>

        <PaperDivider style={BOOKING_HISTORY_SCREEN_DIVIDER_LINE} />

        <FlatList
          data={buttonList}
          renderItem={({
            item,
            index,
          }: {
            item: BookingHistoryItem;
            index: number;
          }) => (
            <TouchableHighlight
              underlayColor={"transparent"}
              key={index}
              onPress={item.onPress}>
              <View style={BOOKING_HISTORY_OPTION_ITEM}>
                <ButtonWithColorBg
                  size={item.size}
                  color={item.color}
                  backgroundColor={item.backgroundColor}
                  iconName={item.iconName}
                  iconProvider={item.iconProvider}
                  textStyle={{marginTop: 0}}
                />
                <PaperText
                  style={{
                    ...BOOKING_HISTORY_OPTION_ITEM_TEXT,
                    fontSize: item.titleFontSize,
                    color: item.textColor,
                  }}>
                  {item.date}
                  {item.title}
                  {item.hotelID}
                  {item.Price}
                </PaperText>
              </View>
            </TouchableHighlight>
          )}
        />
      </View>
    </SafeAreaView>
  );
};
