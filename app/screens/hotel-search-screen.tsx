/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Button as PaperButton,
  Divider as PaperDivider,
  IconButton as PaperIconButton,
  Text as PaperText,
  useTheme,
} from "react-native-paper";
import React, {useCallback, useMemo, useRef, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import BottomSheet, {BottomSheetFlatList} from "@gorhom/bottom-sheet";
import ButtonWithColorBg, {ButtonProp} from "../components/ButtonWithColorBg";
import {
  HOTEL_SEARCH_SCREEN,
  HOTEL_BACK_BUTTON,
  HOTEL_SEARCH_SCREEN_TITLE_ROW,
  HOTEL_SEARCH_SCREEN_TITLE_TEXT,
  HOTEL_SEARCH_SCREEN_SUBTITLE_TEXT,
  HOTEL_BOTTOM_SHEET,
} from "../theme/styles";
import {
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";

export default function HotelSearchScreen() {
  const {colors} = useTheme();

  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo<Array<string>>(() => ["60%", "80%"], []);

  const data = useMemo(
    () =>
      Array(3)
        .fill(0)
        .map((_, index) => `index-${index}`),
    [],
  );

  // current snapPoints
  const [snapState, setSnapState] = useState<number>(0);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  // render
  const renderItem = useCallback(
    ({item}: any) => (
      <View style={{width: "50%", height: 100}}>
        <PaperButton
          onPress={() => {
            if (snapState == 0) {
              setSnapState(1);
              bottomSheetRef.current?.snapTo(1);
            } else {
              setSnapState(0);
              bottomSheetRef.current?.snapTo(0);
            }
          }}>
          expand / collapse
        </PaperButton>
      </View>
    ),
    [snapState],
  );

  return (
    <View style={HOTEL_SEARCH_SCREEN}>
      <View style={HOTEL_BACK_BUTTON}>
        <ButtonWithColorBg
          size={20}
          color={colors.mint}
          iconName={"chevron-back"}
          iconProvider={"Ionicons"}
          backgroundColor={colors.mintLight}

          // onPress={()=>console.log("button pressed!!!")}
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

      {/* <View style={HOTEL_BOTTOM_SHEET}> */}
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <BottomSheetFlatList
          data={data}
          keyExtractor={i => i}
          renderItem={renderItem}
          contentContainerStyle={{backgroundColor: "white"}}
        />
      </BottomSheet>
      {/* </View> */}
    </View>
  );
}

/*
{state == true ? (
  <Text>123</Text>
  : <Text>456</Text>
)}
*/
