import React, {FC, useEffect, useState} from "react";
import {StackScreenProps} from "@react-navigation/stack";
import {StackNavigatorParamList} from "../../navigators";
import {
  Text as PaperText,
  useTheme,
  Modal as PaperModal,
} from "react-native-paper";
import {FlatList, SafeAreaView, TouchableHighlight, View} from "react-native";
import {HotelState, RootState, useAppDispatch} from "../../redux";
import {useSelector} from "react-redux";
import {HotelBookingsRequest} from "../../helper/amadeus/hotel-booking-request-response";
import {getSavedHotelBookingThunk} from "../../redux/hotel/thunk/getSavedHotelBookingThunk";
import {
  PAYMENT_COMPLETE_SCREEN,
  PAYMENT_COMPLETE_SCREEN_HEADER_ROW,
  PAYMENT_COMPLETE_BACK_BUTTON,
  PAYMENT_COMPLETE_TITLE,
  PAYMENT_COMPLETE_TITLE_TEXT,
  PAYMENT_COMPLETE_SCREEN_FLAT_LIST,
  PAYMENT_COMPLETE_SCREEN_FLAT_LIST_FIRST_CONTAINER,
  PAYMENT_COMPLETE_SCREEN_FLAT_LIST_FIRST_ROW_LEFT_COLUMN,
  PAYMENT_COMPLETE_SCREEN_FLAT_LIST_TEXT,
  PAYMENT_COMPLETE_SCREEN_FLAT_LIST_SUBTEXT,
} from "../../theme";
import ButtonWithColorBg from "../../components/ButtonWithColorBg";
import {PaymentFormData} from "./payment-screen";
export interface PaymentCompleteScreenProps {
  bookingId: string;
}

export const PaymentCompleteScreen: FC<
  StackScreenProps<StackNavigatorParamList, "paymentComplete">
> = ({route, navigation}) => {
  /* props */
  const {colors} = useTheme();
  const {bookingId}: PaymentCompleteScreenProps = route.params;
  const [paymentFormData, setPaymentFormData] = useState<PaymentFormData>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSavedHotelBookingThunk(bookingId));
  }, []);
  return (
    <SafeAreaView style={PAYMENT_COMPLETE_SCREEN}>
      <View style={PAYMENT_COMPLETE_SCREEN_HEADER_ROW}>
        <TouchableHighlight
          style={{flexGrow: 0.4}}
          underlayColor={"transparent"}>
          <View style={PAYMENT_COMPLETE_BACK_BUTTON}>
            <ButtonWithColorBg
              size={25}
              color={colors.white}
              iconName={"chevron-back"}
              iconProvider={"Ionicons"}
              backgroundColor={colors.mint}
              onPress={() => navigation.popToTop()}
            />
          </View>
        </TouchableHighlight>
        <View style={PAYMENT_COMPLETE_TITLE}>
          <PaperText style={PAYMENT_COMPLETE_TITLE_TEXT}>
            Payment Complete
          </PaperText>
        </View>

        <FlatList
          data={paymentFormData?.offers}
          style={PAYMENT_COMPLETE_SCREEN_FLAT_LIST}
          renderItem={({item, index}: {item: HotelId; index: string}) => {
            <View style={PAYMENT_COMPLETE_SCREEN_FLAT_LIST_FIRST_CONTAINER}>
              <View
                style={PAYMENT_COMPLETE_SCREEN_FLAT_LIST_FIRST_ROW_LEFT_COLUMN}>
                <View>
                  <PaperText
                    style={PAYMENT_COMPLETE_SCREEN_FLAT_LIST_TEXT}
                    numberOfLines={1}
                    ellipsizeMode="tail">

                    </PaperText>
                </View>
                <View>
                  <PaperText 
                  style={PAYMENT_COMPLETE_SCREEN_FLAT_LIST_SUBTEXT}>

                  </PaperText>
                </View>
              </View>
            </View>;
          }}></FlatList>
      </View>
    </SafeAreaView>
  );
};
