import {
  ImageBackground,
  StatusBar,
  TouchableHighlight,
  View,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import SplashScreen from 'react-native-splash-screen'
import {FC} from "react";
import {StackScreenProps} from "@react-navigation/stack";
import {StackNavigatorParamList} from "../../navigators";
import {Text as PaperText} from "react-native-paper";

export const OnboardingScreen: FC<
  StackScreenProps<StackNavigatorParamList, "onBoarding">
> = ({route, navigation}) => {
  /* props */
  // const {}: OnboardingScreenProps = route.params;

  return (
    <ImageBackground
      source={require("@travelasset/images/mount-titlis.jpeg")}
      style={{flex: 1}}>
      <SafeAreaView
        style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
        <StatusBar
          animated={true}
          barStyle={"light-content"}
          // hidden={true}
        />
        <TouchableHighlight
          style={{
            height: 50,
            width: 200,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("preLogin" as any)}
          underlayColor={"transparent"}>
          <View
            style={{
              height: "100%",
              width: "100%",
              borderRadius: 25,
              backgroundColor: "#4D94A0",
              margin: 50,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <PaperText style={{color: "white"}}>To Login Screen</PaperText>
          </View>
        </TouchableHighlight>
      </SafeAreaView>
    </ImageBackground>
  );
};
