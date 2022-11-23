import {FC} from "react";
import {StackScreenProps} from "@react-navigation/stack";
import {StackNavigatorParamList} from "../../navigators";
import {Text as PaperText} from "react-native-paper";
import {TouchableHighlight, View} from "react-native";

export interface PaymentScreenProps {}

export const PaymentScreen: FC<
  StackScreenProps<StackNavigatorParamList, "payment">
> = ({route, navigation}) => {
  /* props */
  // const {}: PaymentScreenProps = route.params;

  return (
    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
      <PaperText>PaymentScreen</PaperText>

      <TouchableHighlight
        onPress={() => navigation.navigate("paymentComplete" as any)}
        underlayColor={"transparent"}>
        <View
          style={{
            height: 50,
            width: 200,
            borderRadius: 25,
            backgroundColor: "#4D94A0",
            margin: 50,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <PaperText style={{color: "white"}}>
            USE PAYMENT METHOD
          </PaperText>
        </View>
      </TouchableHighlight>

      <TouchableHighlight
        onPress={() => navigation.goBack()}
        underlayColor={"transparent"}>
        <View
          style={{
            height: 50,
            width: 200,
            borderRadius: 25,
            backgroundColor: "grey",
            margin: 50,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <PaperText style={{color: "white"}}>Back Button</PaperText>
        </View>
      </TouchableHighlight>

      <TouchableHighlight
        onPress={() => navigation.popToTop()}
        underlayColor={"transparent"}>
        <View
          style={{
            height: 50,
            width: 200,
            borderRadius: 25,
            backgroundColor: "pink",
            margin: 50,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <PaperText style={{color: "white"}}>To Home Page</PaperText>
        </View>
      </TouchableHighlight>
    </View>
  );
};
