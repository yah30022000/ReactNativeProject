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
  HOTEL_SEARCH_FILTER_SCREEN_TITLE,
  HOTEL_SEARCH_FILTER_SCREEN_TITLE_TEXT,
  HOTEL_SEARCH_FILTER_PRICE_RANGE,
  HOTEL_SEARCH_FILTER_PRICE_RANGE_TEXT,
  HOTEL_SEARCH_FILTER_PRICE,
  HOTEL_SEARCH_FILTER_PRICE_TEXT,
} from "../../theme";
import {selectRating} from "../../redux/hotel/hotelSlice";
import {useAppDispatch} from "../../redux/hooks";

export interface HotelSearchFilterScreenProps {}

export const HotelSearchFilterScreen: FC<
  StackScreenProps<StackNavigatorParamList, "hotelSearchFilter">
> = ({route, navigation}) => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const [priceRangeValue, setPriceRangeValue] = useState<number[]>([500, 4000]);
  let dimension = useWindowDimensions();

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

        <PaperText style={HOTEL_SEARCH_FILTER_SCREEN_TITLE_TEXT}>
          FILTER
        </PaperText>

        <PaperText style={HOTEL_SEARCH_FILTER_SCREEN_TITLE_TEXT}>
          CLEAR
        </PaperText>
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
    </SafeAreaView>
  );
};
