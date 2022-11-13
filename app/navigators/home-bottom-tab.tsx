import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {
  FavoriteScreen,
  FavoriteScreenProps,
  HistoryScreen, HistoryScreenProps,
  HomeScreen,
  HomeScreenProps,
  ProfileScreen, ProfileScreenProps,
} from "../screens";
import { useTheme } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { HOME_BOTTOM_TAB } from "../theme";
import { StackNavigatorParamList } from "./app-stack";
import { StackScreenProps } from "@react-navigation/stack";
import { FC } from "react";


export type TabNavigatorParamList = {
  home: HomeScreenProps
  favorite: FavoriteScreenProps
  history: HistoryScreenProps
  profile: ProfileScreenProps
}

const Tab = createMaterialBottomTabNavigator<TabNavigatorParamList>();

export interface HomeBottomTabProps {
}

export const HomeBottomTab: FC<StackScreenProps<StackNavigatorParamList, "homeTab">> = ({ route, navigation }) => {

  /* props */
  // const {}: HomeBottomTabProps = route.params;

  const { colors } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName={"home"}
      activeColor={colors.mint}
      inactiveColor={colors.grey}
      barStyle={HOME_BOTTOM_TAB}
    >
      <Tab.Screen
        name={"home"}
        component={HomeScreen}
        options={{
          // tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home-outline" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name={"favorite"}
        component={FavoriteScreen}
        options={{
          // tabBarLabel: "Favorite",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="heart-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={"history"}
        component={HistoryScreen}
        options={{
          // tabBarLabel: "History",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="basket-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={"profile"}
        component={ProfileScreen}
        options={{
          // tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person-outline" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
