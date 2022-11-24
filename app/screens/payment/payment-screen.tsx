import React, {FC} from "react";
import {StackScreenProps} from "@react-navigation/stack";
import {StackNavigatorParamList} from "../../navigators";
import {Text as PaperText, useTheme} from "react-native-paper";
import {SafeAreaView, TouchableHighlight, View} from "react-native";
import {
  PAYMENT_SCREEN_BACK_BUTTON,
  PAYMENT_SCREEN_TITLE,
  PAYMENT_SCREEN_TITLE_TEXT,
  PAYMENT_METHOD_BUTTON,
  PAYMENT_BOTTOM_BUTTON_TOUCHABLE,
  PAYMENT_BOTTOM_BUTTON_WRAPPER,
  PAYMENT_BOTTOM_BUTTON,
} from "../../theme/styles";
import { useAppDispatch } from "../../redux/hooks";
import ButtonWithColorBg from "../../components/ButtonWithColorBg";

export interface PaymentScreenProps {}

export const PaymentScreen: FC<
  StackScreenProps<StackNavigatorParamList, "payment">
> = ({route, navigation}) => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  /* props */
  // const {}: PaymentScreenProps = route.params;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.mint, paddingHorizontal: 25}}>
    <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
      <TouchableHighlight
          onPress={() => navigation.goBack()}
          underlayColor={"transparent"}>
          <View style={PAYMENT_SCREEN_BACK_BUTTON}>
            <ButtonWithColorBg
              size={25}
              color={colors.mint}
              iconName={"left"}
              iconProvider={"AntDesign"}
              backgroundColor={colors.white}
              onPress={() => navigation.goBack()}
            />
          </View>
        </TouchableHighlight>
      </View>
      <View style={PAYMENT_SCREEN_TITLE}>
      <PaperText style={PAYMENT_SCREEN_TITLE_TEXT}>
        PAYMENT METHODS
        </PaperText>
      </View>
      <View style={PAYMENT_METHOD_BUTTON}>
      <TouchableHighlight
      style={PAYMENT_BOTTOM_BUTTON_TOUCHABLE}
        onPress={() => navigation.navigate("paymentComplete" as any)}
        underlayColor={"transparent"}>
          <View style={PAYMENT_BOTTOM_BUTTON_WRAPPER}>
            <View style={PAYMENT_BOTTOM_BUTTON}>
            <PaperText style={{color: colors.mint}}>
                  USE PAYMENT METHOD
                </PaperText>
            </View>
          </View>
      </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};
