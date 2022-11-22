// import { FC } from "react";
// import { StackScreenProps } from "@react-navigation/stack";
import {
  Divider as PaperDivider,
  IconButton as PaperIconButton,
  Text as PaperText,
  useTheme,
} from "react-native-paper";
import React, {FC} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {
  HOME_SCREEN_DIVIDER_LINE,
  HOME_SCREEN_IMAGE_FIRST_WRAPPER,
  HOME_SCREEN_IMAGE_RATING_TEXT,
  HOME_SCREEN_IMAGE_RATING_WRAPPER,
  HOME_SCREEN_IMAGE_ROW,
  HOME_SCREEN_IMAGE_ROW_LEFT,
  HOME_SCREEN_IMAGE_ROW_RIGHT,
  HOME_SCREEN_IMAGE_SCROLL_VIEW,
  HOME_SCREEN_IMAGE_TEXT,
  HOME_SCREEN_IMAGE_TEXT_CONTAINER,
  HOME_SCREEN_MIDDLE_ROW,
  HOME_SCREEN_REGION_IMAGE,
  HOME_SCREEN_SECOND_MIDDLE_ROW,
  HOME_SCREEN_SECOND_MIDDLE_ROW_TITLE,
  HOME_SCREEN_SUBTITLE,
  HOME_SCREEN_SUBTITLE_ARROW_LOGO,
  HOME_SCREEN_TITLE,
  HOME_SCREEN_UPPER_ROW,
  HOME_SCREEN_VIEW,
} from "../../theme";
import {
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import ButtonWithColorBg, {
  ButtonProp,
} from "../../components/ButtonWithColorBg";
import {TabNavigatorParamList} from "../../navigators";
import {MaterialBottomTabScreenProps} from "@react-navigation/material-bottom-tabs";

export interface HomeScreenProps {}

export const HomeScreen: FC<
  MaterialBottomTabScreenProps<TabNavigatorParamList, "home">
> = ({route, navigation}) => {
  /* props */
  // const {}: HomeScreenProps = route.params;

  const {colors} = useTheme();

  let middleButtons: Array<ButtonProp> = [
    {
      color: colors.mint,
      size: 36,
      backgroundColor: colors.mintLight,
      iconName: "bed",
      iconProvider: "MaterialCommunityIcons",
      label: "HOTELS",
      route: "hotelSearch",
    },
    {
      color: colors.coral,
      size: 36,
      backgroundColor: colors.coralLight,
      iconName: "airplane",
      iconProvider: "MaterialCommunityIcons",
      label: "FLIGHTS",
      // route: "/flight",
    },
    {
      color: colors.yellow,
      size: 36,
      backgroundColor: colors.yellowLight,
      iconName: "hamburger",
      iconProvider: "MaterialCommunityIcons",
      label: "FOODS",
      // route: "/food",
    },
    {
      color: colors.purple,
      size: 36,
      backgroundColor: colors.purpleLight,
      iconName: "event",
      iconProvider: "MaterialIcons",
      label: "EVENTS",
      // route: "event",
    },
  ];

  let regionCategories = [
    {
      regionName: "Japan",
      image: require("@travelasset/images/japan1.jpeg"),
      rating: "5.0",
    },
    {
      regionName: "Korea",
      image: require("@travelasset/images/korea1.jpeg"),
      rating: "4.2",
    },
    {
      regionName: "Norway",
      image: require("@travelasset/images/norway1.jpeg"),
      rating: "5.0",
    },
    {
      regionName: "Malaysia",
      image: require("@travelasset/images/malaysia1.jpeg"),
      rating: "4.8",
    },
    {
      regionName: "Taiwan",
      image: require("@travelasset/images/taiwan.jpeg"),
      rating: "3.6",
    },
    {
      regionName: "Germany",
      image: require("@travelasset/images/berlin1.jpeg"),
      rating: "4.9",
    },
  ];

  let regionCategoriesHalf = Math.ceil(regionCategories.length / 2);

  return (
    <SafeAreaView style={HOME_SCREEN_VIEW}>
      {/* Upper Row */}
      <View style={HOME_SCREEN_UPPER_ROW}>
        <View>
          {/* Greeting title, e.g. Hi Julia, You are in Hong Kong ! */}
          <PaperText style={HOME_SCREEN_TITLE}>Hi Monroe !</PaperText>
          <PaperText style={HOME_SCREEN_SUBTITLE}>
            You are in
            <PaperText style={{color: colors.coral}}> Hong Kong</PaperText>
            <PaperIconButton
              icon={({size, color}) => (
                <FontAwesomeIcon
                  name="chevron-down"
                  size={size}
                  color={color}
                />
              )}
              color={colors.grey}
              size={10}
              style={HOME_SCREEN_SUBTITLE_ARROW_LOGO}
            />
          </PaperText>
        </View>
        <View>
          {/* Search Logo, maybe not necessary */}
          <PaperIconButton
            icon={({size, color}) => (
              <FontAwesomeIcon name="search" size={size} color={color} />
            )}
            color={colors.grey}
            size={18}
            // onPress={() => console.log("Pressed")}
          />
        </View>
      </View>

      {/* Middle 4 button row */}
      <View style={HOME_SCREEN_MIDDLE_ROW}>
        {middleButtons.map((btn, index) => {
          return (
            <ButtonWithColorBg
              key={index}
              {...btn}
              onPress={
                btn.route != null
                  ? () => navigation.navigate(btn.route as any)
                  : () => {}
              }
            />
          );
        })}
      </View>

      {/* middle break line */}
      <PaperDivider style={HOME_SCREEN_DIVIDER_LINE} />

      {/* Best destination row */}
      <View style={HOME_SCREEN_SECOND_MIDDLE_ROW}>
        <View>
          <PaperText style={HOME_SCREEN_SECOND_MIDDLE_ROW_TITLE}>
            Best Destination
          </PaperText>
        </View>
        <View>
          <PaperText>SEE ALL</PaperText>
        </View>
      </View>

      <ScrollView 
      style={HOME_SCREEN_IMAGE_SCROLL_VIEW}
      contentContainerStyle={{flexGrow: 1}} 
      scrollEventThrottle={0}>
        {/* Image Row */}
        <View style={HOME_SCREEN_IMAGE_ROW}>
          {/* Bottom Left Image Row */}
          <View style={HOME_SCREEN_IMAGE_ROW_LEFT}>
            {regionCategories
              .slice(0, regionCategoriesHalf)
              .map((cat, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => {}}>
                    <ImageBackground
                      source={cat.image}
                      resizeMode="cover"
                      style={{
                        ...HOME_SCREEN_REGION_IMAGE,
                        height: index % 2 == 0 ? 180 : 300,
                      }}>
                      <View style={HOME_SCREEN_IMAGE_TEXT_CONTAINER}>
                        <View style={HOME_SCREEN_IMAGE_FIRST_WRAPPER}>
                          <PaperText style={HOME_SCREEN_IMAGE_TEXT}>
                            {cat.regionName}
                          </PaperText>
                        </View>
                        <View style={HOME_SCREEN_IMAGE_RATING_WRAPPER}>
                          <PaperText style={HOME_SCREEN_IMAGE_RATING_TEXT}>
                            {cat.rating}
                            {"   "}
                            <FontAwesomeIcon name={"star"} color={"white"} />
                          </PaperText>
                        </View>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                );
              })}
          </View>

          {/* Bottom Left Right Row */}
          <View style={HOME_SCREEN_IMAGE_ROW_RIGHT}>
            {regionCategories.slice(regionCategoriesHalf).map((cat, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => {}}>
                  <ImageBackground
                    source={cat.image}
                    resizeMode="cover"
                    style={{
                      ...HOME_SCREEN_REGION_IMAGE,
                      height: index % 2 != 0 ? 180 : 300,
                    }}>
                    <View style={HOME_SCREEN_IMAGE_TEXT_CONTAINER}>
                      <View style={HOME_SCREEN_IMAGE_FIRST_WRAPPER}>
                        <PaperText style={HOME_SCREEN_IMAGE_TEXT}>
                          {cat.regionName}
                        </PaperText>
                      </View>
                      <View style={HOME_SCREEN_IMAGE_RATING_WRAPPER}>
                        <PaperText style={HOME_SCREEN_IMAGE_RATING_TEXT}>
                          {cat.rating}
                          {"   "}
                          <FontAwesomeIcon name={"star"} color={"white"} />
                        </PaperText>
                      </View>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
