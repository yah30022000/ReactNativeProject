import { FC } from "react";
import { TabNavigatorParamList } from "../../navigators/home-bottom-tab";
import { MaterialBottomTabScreenProps } from "@react-navigation/material-bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text as PaperText } from "react-native-paper";

export interface HistoryScreenProps {

}

export const HistoryScreen: FC<MaterialBottomTabScreenProps<TabNavigatorParamList, "history">> = ({ route,navigation }) => {

  /* props */
  // const {}: HistoryScreenProps = route.params;

  return (
    <SafeAreaView style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
      <PaperText>HistoryScreen</PaperText>
    </SafeAreaView>
  )
};
