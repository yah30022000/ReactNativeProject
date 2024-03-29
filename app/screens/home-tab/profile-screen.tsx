import React, { FC } from "react";
import { TabNavigatorParamList } from "../../navigators";
import { MaterialBottomTabScreenProps } from "@react-navigation/material-bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { Divider as PaperDivider, Text as PaperText, useTheme } from "react-native-paper";
import { FlatList, Image, TouchableHighlight, View } from "react-native";
import { logout, logoutThunk, RootState, useAppDispatch, UserState } from "../../redux";

import {
  PROFILE_SCREEN,
  PROFILE_SCREEN_DIVIDER_LINE,
  PROFILE_SCREEN_EDIT_BUTTON,
  PROFILE_SCREEN_OPTION_ITEM,
  PROFILE_SCREEN_OPTION_ITEM_TEXT,
  PROFILE_SCREEN_PROFILE_EMAIL,
  PROFILE_SCREEN_PROFILE_EMAIL_TEXT,
  PROFILE_SCREEN_PROFILE_USER_NAME,
  PROFILE_SCREEN_PROFILE_USER_NAME_TEXT,
  PROFILE_SCREEN_TITLE,
  PROFILE_SCREEN_TITLE_TEXT,
  PROFILE_SCREEN_USER_IMAGE,
  PROFILE_SCREEN_USER_IMAGE_ROW,
} from "../../theme";
import ButtonWithColorBg, { ButtonProp } from "../../components/ButtonWithColorBg";
import { useSelector } from "react-redux";

export interface ProfileScreenProps {}

export interface ProfileOptionItem extends ButtonProp{
  title: string;
  titleFontSize: number;
  textColor?: string;
}

export const ProfileScreen: FC<
  MaterialBottomTabScreenProps<TabNavigatorParamList, "profile">
> = ({route, navigation}) => {
  /* props */
  const {colors} = useTheme();
  const dispatch = useAppDispatch();

  // global variables
  let signInResult = useSelector<RootState>(
    (state) => state.user.signInResult
  ) as UserState["signInResult"] | undefined;

  const buttonList: Array<ProfileOptionItem> = [
    {
      title: "Edit Profile",
      titleFontSize: 18,
      size: 20,
      color: colors.mint,
      backgroundColor: "transparent",
      iconName: "user-o",
      iconProvider: "FontAwesome",
      onPress: ()=>{}
    },
    {
      title: "Payment",
      titleFontSize: 18,
      size: 20,
      color: colors.mint,
      backgroundColor: "transparent",
      iconName: "wallet-outline",
      iconProvider: "Ionicons",
      onPress: ()=>{}
    },
    {
      title: "Notification",
      titleFontSize: 18,
      size: 20,
      color: colors.mint,
      backgroundColor: "transparent",
      iconName: "notifications-outline",
      iconProvider: "Ionicons",
      onPress: ()=>{}
    },
    {
      title: "Logout",
      titleFontSize: 18,
      size: 20,
      textColor: colors.red,
      color: colors.red,
      backgroundColor: "transparent",
      iconName: "logout",
      iconProvider: "MaterialIcons",
      onPress: ()=> dispatch(logoutThunk())
    }
  ]

  return (
    <SafeAreaView style={PROFILE_SCREEN}>
      <View style={PROFILE_SCREEN_TITLE}>
        <PaperText style={PROFILE_SCREEN_TITLE_TEXT}>Profile</PaperText>
        <ButtonWithColorBg
          size={20}
          color={colors.black}
          iconName={"more-vertical"}
          iconProvider={"Feather"}
          backgroundColor={"transparent"}
        />
      </View>

      {/* Image Row */}
      <View style={PROFILE_SCREEN_USER_IMAGE_ROW}>
        {/* centralized view */}
        <View>
          <Image
            source={require("@travelasset/images/daniel.jpeg")}
            style={PROFILE_SCREEN_USER_IMAGE}
          />
          <View style={PROFILE_SCREEN_EDIT_BUTTON}>
            <ButtonWithColorBg
              size={18}
              color={"white"}
              iconName={"edit"}
              iconProvider={"Entypo"}
              backgroundColor={"#4D94A0"}
            />
          </View>
        </View>
      </View>

      <View style={PROFILE_SCREEN_PROFILE_USER_NAME}>
        <PaperText style={PROFILE_SCREEN_PROFILE_USER_NAME_TEXT}>
          {signInResult?.name}
        </PaperText>
      </View>

      <View style={PROFILE_SCREEN_PROFILE_EMAIL}>
        <PaperText style={PROFILE_SCREEN_PROFILE_EMAIL_TEXT}>
          {signInResult?.email}
        </PaperText>
      </View>

      <PaperDivider style={PROFILE_SCREEN_DIVIDER_LINE} />

      <FlatList
        data={buttonList}
        renderItem={({item, index}:{item: ProfileOptionItem, index: number}) => (
          <TouchableHighlight
            underlayColor={"transparent"}
            key={index}
            onPress={item.onPress}
            >
            <View style={PROFILE_SCREEN_OPTION_ITEM}>
              <ButtonWithColorBg
                size={item.size}
                color={item.color}
                backgroundColor={item.backgroundColor}
                iconName={item.iconName}
                iconProvider={item.iconProvider}
                textStyle={{marginTop: 0}}
              />
              <PaperText style={{...PROFILE_SCREEN_OPTION_ITEM_TEXT, fontSize: item.titleFontSize, color: item.textColor}}>
                {item.title}
              </PaperText>
            </View>
          </TouchableHighlight>
        )}
      />
    </SafeAreaView>
  );
};
