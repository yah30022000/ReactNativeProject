import React, { FC } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { StackNavigatorParamList } from "../../navigators";
import { Text as PaperText } from "react-native-paper";
import { TouchableHighlight, View } from "react-native";
import { login } from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";

export interface LoginScreenProps {
}

export const LoginScreen: FC<StackScreenProps<StackNavigatorParamList, "login">> =
  ({ route, navigation }) => {

    const dispatch = useDispatch();

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <PaperText>LoginScreen</PaperText>

        <TouchableHighlight
          onPress={() => dispatch(login())}
          underlayColor={"azure"}>
          <View style={{
            height: 50,
            width: 200,
            borderRadius: 25,
            backgroundColor: "orange",
            margin: 50,
            justifyContent: "center",
            alignItems: "center",
          }}>
            <PaperText style={{ color: "white" }}>
              Login
            </PaperText>
          </View>
        </TouchableHighlight>

      </View>
    );
  };
