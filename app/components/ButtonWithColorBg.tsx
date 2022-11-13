import React from "react";
import {
  IconButton as PaperIconButton,
  Text as PaperText,
} from "react-native-paper";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import EntypoIcon from "react-native-vector-icons/Entypo";
import EvilIcon from "react-native-vector-icons/EvilIcons";
import FeatherIcon from "react-native-vector-icons/Feather";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import FoundationIcon from "react-native-vector-icons/Foundation";
import Ionicon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import {TouchableOpacity} from "react-native-gesture-handler";
import {GestureResponderEvent, TextStyle, View, ViewStyle} from "react-native";

export interface ButtonProp {
  size: number;
  color: string;
  backgroundColor?: string;
  iconName: string;
  label?: string;
  route?: string;
  iconProvider:
    | "AntDesign"
    | "Entypo"
    | "EvilIcons"
    | "Feather"
    | "FontAwesome"
    | "FontAwesome5"
    | "Foundation"
    | "Ionicons"
    | "MaterialIcons"
    | "MaterialCommunityIcons";
  onPress?:
    | (((event: GestureResponderEvent) => void) & (() => void))
    | undefined;
}

export default function ButtonWithColorBg(props: ButtonProp) {
  let iconStyle: ViewStyle = {
    width: props.size * 1.8,
    height: props.size * 1.8,
    borderRadius: 15,
    backgroundColor: props.backgroundColor,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  };

  let textStyle: TextStyle = {
    width: props.size * 1.8,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  };

  switch (props.iconProvider) {
    case "AntDesign":
      return (
        <TouchableOpacity onPress={props.onPress}>
          <View style={iconStyle}>
            <AntDesignIcon
              name={props.iconName}
              size={props.size}
              color={props.color}
            />
          </View>
          <View style={textStyle}>
            {props.label ? (
              <PaperText style={{flexShrink: 1}}>{props.label}</PaperText>
            ) : (
              <></>
            )}
          </View>
        </TouchableOpacity>
      );
    case "Entypo":
      return (
        <TouchableOpacity onPress={props.onPress}>
          <View style={iconStyle}>
            <EntypoIcon
              name={props.iconName}
              size={props.size}
              color={props.color}
            />
          </View>
          <View style={textStyle}>
            {props.label ? (
              <PaperText style={{flexShrink: 1}}>{props.label}</PaperText>
            ) : (
              <></>
            )}
          </View>
        </TouchableOpacity>
      );
    case "EvilIcons":
      return (
        <TouchableOpacity onPress={props.onPress}>
          <View style={iconStyle}>
            <EvilIcon
              name={props.iconName}
              size={props.size}
              color={props.color}
            />
          </View>
          <View style={textStyle}>
            {props.label ? (
              <PaperText style={{flexShrink: 1}}>{props.label}</PaperText>
            ) : (
              <></>
            )}
          </View>
        </TouchableOpacity>
      );
    case "Feather":
      return (
        <TouchableOpacity onPress={props.onPress}>
          <View style={iconStyle}>
            <FeatherIcon
              name={props.iconName}
              size={props.size}
              color={props.color}
            />
          </View>
          <View style={textStyle}>
            {props.label ? (
              <PaperText style={{flexShrink: 1}}>{props.label}</PaperText>
            ) : (
              <></>
            )}
          </View>
        </TouchableOpacity>
      );
    case "FontAwesome":
      return (
        <TouchableOpacity onPress={props.onPress}>
          <View style={iconStyle}>
            <FontAwesomeIcon
              name={props.iconName}
              size={props.size}
              color={props.color}
            />
          </View>
          <View style={textStyle}>
            {props.label ? (
              <PaperText style={{flexShrink: 1}}>{props.label}</PaperText>
            ) : (
              <></>
            )}
          </View>
        </TouchableOpacity>
      );
    case "FontAwesome5":
      return (
        <TouchableOpacity onPress={props.onPress}>
          <View style={iconStyle}>
            <FontAwesome5Icon
              name={props.iconName}
              size={props.size}
              color={props.color}
            />
          </View>
          <View style={textStyle}>
            {props.label ? (
              <PaperText style={{flexShrink: 1}}>{props.label}</PaperText>
            ) : (
              <></>
            )}
          </View>
        </TouchableOpacity>
      );
    case "Foundation":
      return (
        <TouchableOpacity onPress={props.onPress}>
          <View style={iconStyle}>
            <FoundationIcon
              name={props.iconName}
              size={props.size}
              color={props.color}
            />
          </View>
          <View style={textStyle}>
            {props.label ? (
              <PaperText style={{flexShrink: 1}}>{props.label}</PaperText>
            ) : (
              <></>
            )}
          </View>
        </TouchableOpacity>
      );
    case "Ionicons":
      return (
        <TouchableOpacity onPress={props.onPress}>
          <View style={iconStyle}>
            <Ionicon
              name={props.iconName}
              size={props.size}
              color={props.color}
            />
          </View>
          <View style={textStyle}>
            {props.label ? (
              <PaperText style={{flexShrink: 1}}>{props.label}</PaperText>
            ) : (
              <></>
            )}
          </View>
        </TouchableOpacity>
      );
    case "MaterialIcons":
      return (
        <TouchableOpacity onPress={props.onPress}>
          <View style={iconStyle}>
            <MaterialIcon
              name={props.iconName}
              size={props.size}
              color={props.color}
            />
          </View>
          <View style={textStyle}>
            {props.label ? (
              <PaperText style={{flexShrink: 1}}>{props.label}</PaperText>
            ) : (
              <></>
            )}
          </View>
        </TouchableOpacity>
      );
    case "MaterialCommunityIcons":
      return (
        <TouchableOpacity onPress={props.onPress}>
          <View style={iconStyle}>
            <MaterialCommunityIcon
              name={props.iconName}
              size={props.size}
              color={props.color}
            />
          </View>
          <View style={textStyle}>
            {props.label ? (
              <PaperText style={{flexShrink: 1}}>{props.label}</PaperText>
            ) : (
              <></>
            )}
          </View>
        </TouchableOpacity>
      );
    default:
      return (
        <TouchableOpacity onPress={props.onPress}>
          <View style={iconStyle}>
            <MaterialCommunityIcon
              name={props.iconName}
              size={props.size}
              color={props.color}
            />
          </View>
          <View style={textStyle}>
            {props.label ? (
              <PaperText style={{flexShrink: 1}}>{props.label}</PaperText>
            ) : (
              <></>
            )}
          </View>
        </TouchableOpacity>
      );
  }
}
