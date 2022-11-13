import { FC } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { StackNavigatorParamList } from "../../navigators";
import { Text as PaperText } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableHighlight, View } from "react-native";

export interface HotelSearchListProps{

}

export const HotelListScreen: FC<StackScreenProps<StackNavigatorParamList, "hotelList">> =
  ({ route,navigation }) => {

    /* props */
    // const {}: HotelSearchListProps = route.params;

    return (
      <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <PaperText>HotelListScreen</PaperText>

        <TouchableHighlight
          onPress={()=>navigation.navigate("hotelDetail" as any)}
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
              To Hotel Detail Page
            </PaperText>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={()=>navigation.goBack()}
          underlayColor={"azure"}>
          <View style={{
            height: 50,
            width: 200,
            borderRadius: 25,
            backgroundColor: "grey",
            margin: 50,
            justifyContent: "center",
            alignItems: "center"
          }}>
            <PaperText style={{color: "white"}}>
              Back Button
            </PaperText>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={()=>navigation.popToTop()}
          underlayColor={"azure"}>
          <View style={{
            height: 50,
            width: 200,
            borderRadius: 25,
            backgroundColor: "pink",
            margin: 50,
            justifyContent: "center",
            alignItems: "center"
          }}>
            <PaperText style={{color: "white"}}>
              To Home Page
            </PaperText>
          </View>
        </TouchableHighlight>
      </SafeAreaView>
    );
  };
