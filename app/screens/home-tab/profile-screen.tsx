import React, { FC } from "react";
import { TabNavigatorParamList } from "../../navigators";
import { MaterialBottomTabScreenProps } from "@react-navigation/material-bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text as PaperText } from "react-native-paper";
import { TouchableHighlight, View } from "react-native";
import { logout, logoutThunk } from "../../redux/user/userSlice";
import { useAppDispatch } from "../../redux/hooks";

export interface ProfileScreenProps {

}

export const ProfileScreen: FC<MaterialBottomTabScreenProps<TabNavigatorParamList, "profile">> = ({
                                                                                                    route,
                                                                                                    navigation,
                                                                                                  }) => {

  /* props */
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <PaperText>ProfileScreen</PaperText>

      <TouchableHighlight
        onPress={() => dispatch(logoutThunk())}
        underlayColor={"transparent"}>
        <View style={{
          height: 50,
          width: 200,
          borderRadius: 25,
          backgroundColor: "#4D94A0",
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
