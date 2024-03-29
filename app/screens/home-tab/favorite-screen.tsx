import { FC } from "react";
import { TabNavigatorParamList } from "../../navigators/home-bottom-tab";
import { MaterialBottomTabScreenProps } from "@react-navigation/material-bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text as PaperText } from "react-native-paper";

export interface FavoriteScreenProps {
}

export const FavoriteScreen: FC<MaterialBottomTabScreenProps<TabNavigatorParamList, "favorite">> = ({ route,navigation }) => {

  /* props */
  // const {}: FavoriteScreenProps = route.params;

  return (
    <SafeAreaView style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
      <PaperText>FavoriteScreen</PaperText>
    </SafeAreaView>
  )
};
