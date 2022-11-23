import { FC } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { StackNavigatorParamList } from "../../navigators";
import { Text as PaperText } from "react-native-paper";
import { TouchableHighlight, View } from "react-native";

export interface HotelDetailScreenProps{

}

export const HotelDetailScreen: FC<StackScreenProps<StackNavigatorParamList, "hotelDetail">> =
  ({ route, navigation }) => {

    /* props */
    // const {}: HotelDetailScreenProps = route.params;

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <PaperText>HotelDetailScreen</PaperText>

        <TouchableHighlight
          onPress={()=>navigation.navigate("hotelRoomSelect" as any)}
          underlayColor={"transparent"}>
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
              To Hotel Room Select Page
            </PaperText>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={()=>navigation.goBack()}
          underlayColor={"transparent"}>
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
          underlayColor={"transparent"}>
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
      </View>
    );
  };
