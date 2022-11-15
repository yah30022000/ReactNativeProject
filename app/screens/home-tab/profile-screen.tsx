import React, { FC } from "react";
import { TabNavigatorParamList } from "../../navigators/home-bottom-tab";
import { MaterialBottomTabScreenProps } from "@react-navigation/material-bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text as PaperText } from "react-native-paper";
import { TouchableHighlight, View } from "react-native";
import { logout } from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";

export interface ProfileScreenProps {

}

export const ProfileScreen: FC<MaterialBottomTabScreenProps<TabNavigatorParamList, "profile">> = ({
                                                                                                    route,
                                                                                                    navigation,
                                                                                                  }) => {

  /* props */
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <PaperText>ProfileScreen</PaperText>

      <TouchableHighlight
        onPress={() => dispatch(logout())}
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
            Logout
          </PaperText>
        </View>
      </TouchableHighlight>
    </SafeAreaView>
  )
};
