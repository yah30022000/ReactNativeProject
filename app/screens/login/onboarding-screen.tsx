import { ImageBackground, TouchableHighlight, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FC } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { StackNavigatorParamList } from "../../navigators";
import { Text as PaperText } from "react-native-paper";


export const OnboardingScreen: FC<StackScreenProps<StackNavigatorParamList, "onBoarding">> =
  ({ route, navigation }) => {

    /* props */
    // const {}: OnboardingScreenProps = route.params;

    return (
      <ImageBackground source={require("@travelasset/images/mount-titlis.jpeg")}>
        <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

          <TouchableHighlight
            onPress={()=>navigation.navigate("login" as any)}
            underlayColor={"azure"}>
            <View style={{
              height: 50,
              width: 200,
              borderRadius: 25,
              backgroundColor: "orange",
              margin: 50,
              justifyContent: "center",
              alignItems: "center"
            }}>
              <PaperText style={{color: "white"}}>
                To Login Screen
              </PaperText>
            </View>
          </TouchableHighlight>


        </SafeAreaView>
      </ImageBackground>

    );
  };