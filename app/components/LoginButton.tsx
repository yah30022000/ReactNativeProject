import { TouchableOpacity, View, ViewStyle } from "react-native";
import { Text as PaperText, useTheme } from "react-native-paper";
import { PRE_LOGIN_SCREEN_LOWER_ROW_TOUCHABLE, PRE_LOGIN_SCREEN_TOUCHABLE_LOGO_WRAPPER } from "../theme";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import React from "react";

export interface LoginButtonProps {
  label: string;
  authProvider: "aws" | "apple" | "facebook" | "google" | "register" | "login" | "logout";
  onPress: () => void;
  // customStyle?: ViewStyle;
  haveLogo: boolean;
}

export function LoginButton(props: LoginButtonProps) {

  const { colors } = useTheme();

  let loginButtonViewStyle: ViewStyle = {
    width: "100%",
    height: 60,
    borderRadius: 15,
    backgroundColor:
      props.authProvider == "aws" ? "#304150" :
        props.authProvider == "apple" ? colors.white :
          props.authProvider == "facebook" ? "#3B65BF" :
            props.authProvider == "google" ? colors.white :
              props.authProvider == "login" ? colors.black :
                props.authProvider == "logout" ? colors.white :
                  colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    // wrapper
    <TouchableOpacity
      style={!props.haveLogo ?
        {
          ...{
            ...PRE_LOGIN_SCREEN_LOWER_ROW_TOUCHABLE,
            flexDirection: "row",
            justifyContent: "center",
          }, width: "45%",
        } :
        PRE_LOGIN_SCREEN_LOWER_ROW_TOUCHABLE
      }
      onPress={props.onPress}
    >
      {/* touchable button */}
      <View style={!props.haveLogo ? {...loginButtonViewStyle, width: "100%"} : loginButtonViewStyle}>
        {(props.authProvider != "login" && props.authProvider != "logout" && props.authProvider != "register") ? (
          <View style={PRE_LOGIN_SCREEN_TOUCHABLE_LOGO_WRAPPER}>
            <FontAwesome5Icon
              name={props.authProvider == "facebook" ? "facebook-f" : props.authProvider}
              size={25}
              color={
                props.authProvider == "aws" ? "#FF9900" :
                  props.authProvider == "apple" ? colors.black :
                    props.authProvider == "facebook" ? colors.white :
                      props.authProvider == "google" ? colors.yellow :
                        colors.black
              }
            />
          </View>
        ) : null
        }
        <View
          style={{
            width:
              (props.authProvider != "login" && props.authProvider != "logout" && props.authProvider != "register") ?
                "80%" : "100%",
            flexDirection: "row",
            justifyContent: (props.authProvider != "login" && props.authProvider != "logout" && props.authProvider != "register") ?
              "flex-start" : "center",
          }}
        >
          <PaperText style={{
            fontSize: 20,
            fontWeight: "bold",
            color: (
              props.authProvider == "facebook" ||
              props.authProvider == "login" ||
              props.authProvider == "aws") ?
              colors.white : colors.black,
          }}>{props.label}
          </PaperText>
        </View>


      </View>
    </TouchableOpacity>
  );
}
