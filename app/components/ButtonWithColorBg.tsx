import React from "react";
import {Text as PaperText} from "react-native-paper";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import EntypoIcon from "react-native-vector-icons/Entypo";
import EvilIcon from "react-native-vector-icons/EvilIcons";
import FeatherIcon from "react-native-vector-icons/Feather";
import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import FoundationIcon from "react-native-vector-icons/Foundation";
import Ionicon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import {TouchableOpacity} from "react-native";
import {GestureResponderEvent, TextStyle, View, ViewStyle} from "react-native";
import {StackNavigatorParamList, TabNavigatorParamList} from "../navigators";

export interface ButtonProp {
  style?:ViewStyle
  textStyle?:TextStyle
  size: number;
  color: string;
  backgroundColor?: string;
  iconName: string;
  label?: string;
  route?: keyof StackNavigatorParamList | keyof TabNavigatorParamList;
  iconProvider:
    | "AntDesign"
    | "Entypo"
    | "EvilIcons"
    | "Feather"
    | "Fontisto"
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
          <View style={{...iconStyle,...props.style}}>
            <AntDesignIcon
              name={props.iconName}
              size={props.size}
              color={props.color}
            />
          </View>
          <View style={{...textStyle, ...props.textStyle}}>
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
          <View style={{...iconStyle,...props.style}}>
            <EntypoIcon
              name={props.iconName}
              size={props.size}
              color={props.color}
            />
          </View>
          <View style={{...textStyle, ...props.textStyle}}>
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
          <View style={{...iconStyle,...props.style}}>
            <EvilIcon
              name={props.iconName}
              size={props.size}
              color={props.color}
            />
          </View>
          <View style={{...textStyle, ...props.textStyle}}>
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
          <View style={{...iconStyle,...props.style}}>
            <FeatherIcon
              name={props.iconName}
              size={props.size}
              color={props.color}
            />
          </View>
          <View style={{...textStyle, ...props.textStyle}}>
            {props.label ? (
              <PaperText style={{flexShrink: 1}}>{props.label}</PaperText>
            ) : (
              <></>
            )}
          </View>
        </TouchableOpacity>
      );
    case "Fontisto":
      return (
        <TouchableOpacity onPress={props.onPress}>
          <View style={{...iconStyle,...props.style}}>
            <FontAwesomeIcon
              name={props.iconName}
              size={props.size}
              color={props.color}
            />
          </View>
          <View style={{...textStyle, ...props.textStyle}}>
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
          <View style={{...iconStyle,...props.style}}>
            <FontAwesomeIcon
              name={props.iconName}
              size={props.size}
              color={props.color}
            />
          </View>
          <View style={{...textStyle, ...props.textStyle}}>
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
          <View style={{...iconStyle,...props.style}}>
            <FontAwesome5Icon
              name={props.iconName}
              size={props.size}
              color={props.color}
            />
          </View>
          <View style={{...textStyle, ...props.textStyle}}>
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
          <View style={{...iconStyle,...props.style}}>
            <FoundationIcon
              name={props.iconName}
              size={props.size}
              color={props.color}
            />
          </View>
          <View style={{...textStyle, ...props.textStyle}}>
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
          <View style={{...iconStyle,...props.style}}>
            <Ionicon
              name={props.iconName}
              size={props.size}
              color={props.color}
            />
          </View>
          <View style={{...textStyle, ...props.textStyle}}>
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
          <View style={{...iconStyle,...props.style}}>
            <MaterialIcon
              name={props.iconName}
              size={props.size}
              color={props.color}
            />
          </View>
          <View style={{...textStyle, ...props.textStyle}}>
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
          <View style={{...iconStyle,...props.style}}>
            <MaterialCommunityIcon
              name={props.iconName}
              size={props.size}
              color={props.color}
            />
          </View>
          <View style={{...textStyle, ...props.textStyle}}>
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
          <View style={{...iconStyle,...props.style}}>
            <MaterialCommunityIcon
              name={props.iconName}
              size={props.size}
              color={props.color}
            />
          </View>
          <View style={{...textStyle, ...props.textStyle}}>
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
