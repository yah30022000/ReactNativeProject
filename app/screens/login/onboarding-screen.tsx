import React, { FC, useCallback, useMemo, useRef, useState } from "react";
import { Text as PaperText, useTheme } from "react-native-paper";
import {
  ONBOARDING_BOTTOM_BUTTON_ROW_WRAPPER,
  ONBOARDING_BOTTOM_BUTTON_TEXT,
  ONBOARDING_BOTTOM_BUTTON_TOUCHABLE,
  ONBOARDING_BOTTOM_BUTTON_WRAPPER,
  ONBOARDING_SCREEN,
  ONBOARDING_SCREEN_BRAND_LOGO,
  ONBOARDING_SCREEN_SUBTITLE,
  ONBOARDING_SCREEN_SUBTITLE_TEXT,
  ONBOARDING_SCREEN_TITLE,
  ONBOARDING_SCREEN_TITLE_ROW,
  ONBOARDING_SCREEN_TITLE_TEXT,
  ONBOARDING_SKIP_BUTTON_TEXT,
  ONBOARDING_SKIP_BUTTON_TOUCHABLE,
  ONBOARDING_SKIP_BUTTON_WRAPPER,
} from "../../theme";
import { LiquidLike } from "react-native-animated-pagination-dots";
import { Animated, Dimensions, FlatList, Image, StatusBar, TouchableHighlight, View, ViewToken } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomSheet from "@gorhom/bottom-sheet";
import { BoardingItem, boardingList } from "../../helper";
import { StackNavigatorParamList } from "../../navigators";
import { StackScreenProps } from "@react-navigation/stack/lib/typescript/src/types";


export interface OnboardingScreenProps {
}

export const OnboardingScreen: FC<StackScreenProps<StackNavigatorParamList, "onBoarding">> =
  ({ route, navigation }) => {
    const { colors } = useTheme();
    const snapPoints = useMemo<Array<string>>(() => ["50%"], []);
    const boardingSheetRef = useRef<BottomSheet>(null);
  const [visibleIndex, setVisibleIndex] = useState<number>(0);

  // animated background and dot indicator
  // 橫向坐標
  const scrollX = useRef(new Animated.Value(0)).current;
  // 滑動偏差值，影響點點果條線
  let scrollOffset = useRef(new Animated.Value(0)).current;
  const keyExtractor = React.useCallback(
    (_: BoardingItem, index: number) => index.toString(),
    [],
  );
  let flatListRef = useRef<FlatList>(null);
  const {height: fullHeight, width: fullWidth} = Dimensions.get("screen");

  const renderItem = ({item}: {item: BoardingItem}) => {
    return (
      <View style={{flex: 1}}>
        <Animated.Image
          style={{
            width: fullWidth,
            height: fullHeight,
            resizeMode: "cover",
          }}
          source={item.backgroundPath}
          blurRadius={2}
        />
      </View>
    );
  };

  const _onViewableItemsChanged = useCallback(
    (info: {viewableItems: ViewToken[]; changed: ViewToken[]}) => {
      // console.log("Visible items are", info.viewableItems);
      if (info.viewableItems[0].index !== null) {
        setVisibleIndex(info.viewableItems[0].index);
      }
    },
    [],
  );

  return (
    // <ImageBackground
    //   source={require("@travelasset/images/nature.jpeg")}
    //   style={{flex: 1}}
    //   resizeMode="cover">
    <SafeAreaView style={ONBOARDING_SCREEN} edges={["right", "left"]}>
      <StatusBar
        animated={true}
        barStyle={visibleIndex < 1 ?
          "dark-content": "light-content"}
        // hidden={true}
      />


      <View style={ONBOARDING_SCREEN_TITLE_ROW}>
        <Image
          source={require("@travelasset/icon/TripTroop-circle-outer.png")}
          style={ONBOARDING_SCREEN_BRAND_LOGO}
        />
      </View>
      <BottomSheet
        ref={boardingSheetRef}
        index={0}
        snapPoints={snapPoints}
        handleComponent={null}
        style={{borderRadius: 25, overflow: "hidden"}}>
        <View style={ONBOARDING_SCREEN_TITLE}>
          <PaperText style={ONBOARDING_SCREEN_TITLE_TEXT}>
            {boardingList[visibleIndex].title}
          </PaperText>
          <View style={ONBOARDING_SCREEN_SUBTITLE}>
            <PaperText style={ONBOARDING_SCREEN_SUBTITLE_TEXT}>
              {boardingList[visibleIndex].subtitle}
            </PaperText>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 20,
          }}>
          <LiquidLike
            data={boardingList}
            scrollX={scrollX}
            scrollOffset={scrollOffset}
            strokeWidth={10}
            dotSize={10}
            marginHorizontal={5}
            inActiveDotOpacity={0.2}
            activeDotColor={colors.mint}
            containerStyle={{backgroundColor: "transparent"}}
            bigHead
            bigHeadScale={1.2}
            wormDot={false}
          />
        </View>
      </BottomSheet>

      <Animated.FlatList
        style={{flex: 1, zIndex: -1}}
        data={boardingList}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ref={flatListRef}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        decelerationRate={"normal"}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: true,
          },
        )}
        onMomentumScrollEnd={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollOffset}}}],
          {
            useNativeDriver: false,
          },
        )}
        onViewableItemsChanged={_onViewableItemsChanged}
      />

      {/* Bottom Button Row */}
      <View style={ONBOARDING_BOTTOM_BUTTON_ROW_WRAPPER}>
        {/* Bottom Button */}
        <TouchableHighlight
          style={ONBOARDING_BOTTOM_BUTTON_TOUCHABLE}
          onPress={() => {
            visibleIndex + 1 == boardingList.length
              ? navigation.navigate("preLogin" as any)
              : flatListRef.current?.scrollToIndex({index: visibleIndex + 1})
          }}
          underlayColor={"transparent"}>
          <View style={ONBOARDING_BOTTOM_BUTTON_WRAPPER}>
            <PaperText style={ONBOARDING_BOTTOM_BUTTON_TEXT}>
              {visibleIndex + 1 == boardingList.length ? "GET STARTED" : "NEXT"}
            </PaperText>
          </View>
        </TouchableHighlight>

        {/* Skip Button */}
        <TouchableHighlight
          style={ONBOARDING_SKIP_BUTTON_TOUCHABLE}
          onPress={() => navigation.navigate("preLogin" as any)}
          underlayColor={"transparent"}>
          <View style={ONBOARDING_SKIP_BUTTON_WRAPPER}>
            <PaperText style={ONBOARDING_SKIP_BUTTON_TEXT}>
              Skip For Now
            </PaperText>
          </View>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
    // </ImageBackground>
  );
}

