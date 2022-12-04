import React, { FC } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { StackNavigatorParamList } from "../../navigators";
import { Text as PaperText, useTheme } from "react-native-paper";
import { Image, ImageBackground, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  PRE_LOGIN_SCREEN_LOWER_ROW,
  PRE_LOGIN_SCREEN_LOWER_ROW_LOGIN_REGISTER,
  PRE_LOGIN_SCREEN_UPPER_ROW,
  PRE_LOGIN_SCREEN_UPPER_ROW_BRAND_LOGO,
  PRE_LOGIN_SCREEN_VIEW,
} from "../../theme";
import { LoginButton } from "../../components/LoginButton";
import { Auth as AmplifyAuth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';

export interface PreLoginScreenProps {
}


export const PreLoginScreen: FC<StackScreenProps<StackNavigatorParamList, "preLogin">> =
  ({ route, navigation }) => {

    // const windowWidth = Dimensions.get("window").width;
    // const windowHeight = Dimensions.get("window").height;

    const { colors } = useTheme();

    return (
      <ImageBackground
        source={require("@travelasset/images/fuji-japan.jpeg")}
        style={{ flex: 1 }}
        blurRadius={5}
      >
        <SafeAreaView style={PRE_LOGIN_SCREEN_VIEW}>
          <StatusBar
            animated={true}
            barStyle={"light-content"}
            // hidden={true}
          />

          {/* Upper Row */}
          <View style={PRE_LOGIN_SCREEN_UPPER_ROW}>
            <Image
              source={require("@travelasset/icon/TripTroop-circle-outer.png")}
              style={PRE_LOGIN_SCREEN_UPPER_ROW_BRAND_LOGO} />
          </View>

          {/* Lower Row */}
          <View style={PRE_LOGIN_SCREEN_LOWER_ROW}>
            <LoginButton haveLogo label={"Login with Google"} authProvider={"google"} onPress={() => {
              AmplifyAuth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google })
            }} />
            <LoginButton haveLogo label={"Login with Facebook"} authProvider={"facebook"} onPress={() => {
              AmplifyAuth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Facebook })
            }} />
            <LoginButton haveLogo label={"Login with Apple"} authProvider={"apple"} onPress={() => {
            }} />
            <View>
              <PaperText style={{ color: colors.white }}>Or</PaperText>
            </View>
            <View style={PRE_LOGIN_SCREEN_LOWER_ROW_LOGIN_REGISTER}>
              <LoginButton
                label={"Login"}
                authProvider={"login"}
                onPress={() => navigation.navigate("login" as any, {initialPage: "login"})}
                haveLogo={false}
                // customStyle={PRE_LOGIN_SCREEN_LOGIN_REGISTER_BUTTON_CUSTOM}
              />
              <LoginButton
                label={"Register"}
                authProvider={"register"}
                onPress={() => navigation.navigate("login" as any, {initialPage: "register"})}
                haveLogo={false}
                // customStyle={PRE_LOGIN_SCREEN_LOGIN_REGISTER_BUTTON_CUSTOM}
              />
            </View>
          </View>


        </SafeAreaView>
      </ImageBackground>
    );
  };
