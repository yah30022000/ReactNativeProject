import React, {FC, useState} from "react";
import {StackScreenProps} from "@react-navigation/stack";
import {StackNavigatorParamList} from "../../navigators";
import {Rating} from "react-native-ratings";
import {
  Divider as PaperDivider,
  Text as PaperText,
  useTheme,
} from "react-native-paper";
import {SafeAreaView} from "react-native-safe-area-context";
import {
  FlatList,
  Image,
  TouchableHighlight,
  useWindowDimensions,
  View,
} from "react-native";
import ButtonWithColorBg from "../../components/ButtonWithColorBg";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

import {
  HOTEL_SEARCH_FILTER_CROSS_BUTTON,
  HOTEL_FILTER_BOTTOM_BUTTON_TOUCHABLE,
  HOTEL_FILTER_BOTTOM_BUTTON_WRAPPER,
  HOTEL_FILTER_BOTTOM_BUTTON,
  HOTEL_FILTER_BUTTON_ICON,
  HOTEL_SEARCH_FILTER_RIGHT_BUTTON,
  HOTEL_SEARCH_FILTER_SCREEN_TITLE_TEXT,
  HOTEL_SEARCH_FILTER_PRICE_RANGE,
  HOTEL_SEARCH_FILTER_PRICE_RANGE_TEXT,
  HOTEL_SEARCH_FILTER_DATE_COLUMN,
  HOTEL_SEARCH_FILTER_SCREEN__DATE,
  HOTEL_SEARCH_FILTER_SCREEN_DATE_TEXT,
  HOTEL_SEARCH_FILTER_PAYMENT_COLUMN,
  HOTEL_SEARCH_FILTER_PAYMENT_TYPE,
  HOTEL_SEARCH_FILTER_SCREEN_PAYMENT_TEXT,
  HOTEL_SEARCH_FILTER_ROOM_TYPE_COLUMN,
  HOTEL_SEARCH_FILTER_SCREEN_ROOM_TYPE,
  HOTEL_SEARCH_FILTER_SCREEN_ROOM_TYPE_TEXT,
  HOTEL_SEARCH_FILTER_BED_TYPE_COLUMN,
  HOTEL_SEARCH_FILTER_SCREEN_BED_TYPE,
  HOTEL_SEARCH_FILTER_SCREEN_BED_TYPE_TEXT,
  HOTEL_SEARCH_FILTER_PRICE,
  HOTEL_FILTER_DIVIDER_LINE,
  HOTEL_SEARCH_FILTER_PRICE_TEXT,
} from "../../theme";
import {
  changeHotelSearching,
  HotelState,
  selectRating,
} from "../../redux/hotel/hotelSlice";
import {useAppDispatch} from "../../redux/hooks";

export interface HotelSearchFilterScreenProps {}

export const HotelSearchFilterScreen: FC<
  StackScreenProps<StackNavigatorParamList, "hotelSearchFilter">
> = ({route, navigation}) => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const [priceRangeValue, setPriceRangeValue] = useState<number[]>([500, 4000]);
  let dimension = useWindowDimensions();
  const [modalStatus, setModalStatus] =
    useState<HotelState["hotelListSearching"]>("none");

  const closeModalCallback = () => {
    setModalStatus("none");
    dispatch(changeHotelSearching("none"));
    if (modalStatus === "completed") {
      navigation.navigate("hotelList" as any);
    }
  };

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: colors.white, paddingHorizontal: 25}}>
      {/* Title Row */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <TouchableHighlight
          onPress={() => navigation.goBack()}
          underlayColor={"transparent"}>
          <View style={HOTEL_SEARCH_FILTER_CROSS_BUTTON}>
            <ButtonWithColorBg
              size={25}
              color={colors.white}
              iconName={"cross"}
              iconProvider={"Entypo"}
              backgroundColor={colors.black}
              onPress={() => navigation.goBack()}
            />
          </View>
        </TouchableHighlight>
        <View>
          <PaperText style={HOTEL_SEARCH_FILTER_SCREEN_TITLE_TEXT}>
            FILTER
          </PaperText>
        </View>
        <TouchableHighlight
          onPress={() => navigation.reset}
          underlayColor={"transparent"}>
          <PaperText style={HOTEL_SEARCH_FILTER_SCREEN_TITLE_TEXT}>
            CLEAR
          </PaperText>
        </TouchableHighlight>
      </View>

      {/* Price Range */}
      <View style={{marginVertical: 20}}>
        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
          <PaperText style={HOTEL_SEARCH_FILTER_PRICE_RANGE_TEXT}>
            Price Range
          </PaperText>
          <PaperText style={HOTEL_SEARCH_FILTER_PRICE_TEXT}>
            HKD {priceRangeValue[0]} - HKD {priceRangeValue[1]}
          </PaperText>
        </View>
        <View style={{marginVertical: 10}}>
          <MultiSlider
            values={priceRangeValue}
            onValuesChange={(values: number[]) => setPriceRangeValue(values)}
            sliderLength={dimension.width * 0.85}
            min={300}
            max={5100}
            step={100}
            trackStyle={{backgroundColor: colors.grey}}
            selectedStyle={{backgroundColor: colors.mint}}
            markerStyle={{borderColor: colors.mint, borderWidth: 3}}
            pressedMarkerStyle={{borderColor: colors.mint, borderWidth: 2}}
          />
        </View>
      </View>
      <View>
        <PaperDivider style={HOTEL_FILTER_DIVIDER_LINE} />
      </View>
      <View style={HOTEL_SEARCH_FILTER_DATE_COLUMN}>
        <View style={HOTEL_SEARCH_FILTER_SCREEN__DATE}>
          <PaperText style={HOTEL_SEARCH_FILTER_SCREEN_DATE_TEXT}>
            Date
          </PaperText>
        </View>
        <TouchableHighlight underlayColor={"transparent"}>
          <ButtonWithColorBg
            size={18}
            textStyle={{display: "none"}}
            style={{margin: 0, padding: 0}}
            color={colors.black}
            iconName={"right"}
            iconProvider={"AntDesign"}
            onPress={() => navigation.navigate("date" as any)}
          />
        </TouchableHighlight>
      </View>
      <View>
        <PaperDivider style={HOTEL_FILTER_DIVIDER_LINE} />
      </View>
      <View style={HOTEL_SEARCH_FILTER_ROOM_TYPE_COLUMN}>
        <View style={HOTEL_SEARCH_FILTER_SCREEN_ROOM_TYPE}>
          <PaperText style={HOTEL_SEARCH_FILTER_SCREEN_ROOM_TYPE_TEXT}>
            Room Type
          </PaperText>
        </View>
        <TouchableHighlight underlayColor={"transparent"}>
          <ButtonWithColorBg
            size={18}
            textStyle={{display: "none"}}
            style={{margin: 0, padding: 0}}
            color={colors.black}
            iconName={"right"}
            iconProvider={"AntDesign"}
            onPress={() => navigation.navigate("date" as any)}
          />
        </TouchableHighlight>
      </View>
      <View>
        <PaperDivider style={HOTEL_FILTER_DIVIDER_LINE} />
      </View>
      <View style={HOTEL_SEARCH_FILTER_BED_TYPE_COLUMN}>
        <View style={HOTEL_SEARCH_FILTER_SCREEN_BED_TYPE}>
          <PaperText style={HOTEL_SEARCH_FILTER_SCREEN_BED_TYPE_TEXT}>
            Bed Type
          </PaperText>
        </View>
        <TouchableHighlight underlayColor={"transparent"}>
          <ButtonWithColorBg
            size={18}
            textStyle={{display: "none"}}
            style={{margin: 0, padding: 0}}
            color={colors.black}
            iconName={"right"}
            iconProvider={"AntDesign"}
            onPress={() => navigation.navigate("date" as any)}
          />
        </TouchableHighlight>
      </View>
      <View>
        <PaperDivider style={HOTEL_FILTER_DIVIDER_LINE} />
      </View>
      <View style={HOTEL_SEARCH_FILTER_PAYMENT_COLUMN}>
        <View style={HOTEL_SEARCH_FILTER_PAYMENT_TYPE}>
          <PaperText style={HOTEL_SEARCH_FILTER_SCREEN_PAYMENT_TEXT}>
            Payment
          </PaperText>
        </View>
        <TouchableHighlight underlayColor={"transparent"}>
          <ButtonWithColorBg
            size={18}
            textStyle={{display: "none"}}
            style={{margin: 0, padding: 0}}
            color={colors.black}
            iconName={"right"}
            iconProvider={"AntDesign"}
            onPress={() => navigation.navigate("date" as any)}
          />
        </TouchableHighlight>
      </View>
      <View>
        <View>
          <PaperDivider style={HOTEL_FILTER_DIVIDER_LINE} />
        </View>

        <View style={HOTEL_FILTER_BUTTON_ICON}>
          <TouchableHighlight
            style={HOTEL_FILTER_BOTTOM_BUTTON_TOUCHABLE}
            onPress={() => navigation.navigate("payment" as any)}
            underlayColor={"transparent"}>
            <View style={HOTEL_FILTER_BOTTOM_BUTTON_WRAPPER}>
              <View style={HOTEL_FILTER_BOTTOM_BUTTON}>
                <PaperText style={{color: colors.white}}>
                  SHOW RESULTS
                </PaperText>
              </View>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
};
