import React, { FC, useState } from "react";
import { StackNavigatorParamList } from "../../navigators";
import { login } from "../../redux/user/userSlice";
import { StackScreenProps } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { HelperText as PaperHelperText, Text as PaperText, TextInput as PaperTextInput } from "react-native-paper";
import { StatusBar, TouchableHighlight, useWindowDimensions, View } from "react-native";
import { TabBar, TabView } from "react-native-tab-view";
import {
  LOGIN_SCREEN_BOTTOM_BUTTON,
  LOGIN_SCREEN_BOTTOM_BUTTON_ROW_WRAPPER,
  LOGIN_SCREEN_BOTTOM_BUTTON_TEXT,
  LOGIN_SCREEN_BOTTOM_BUTTON_TOUCHABLE,
  LOGIN_SCREEN_BOTTOM_BUTTON_WRAPPER,
  LOGIN_SCREEN_LOGIN_TAB_VIEW,
  LOGIN_SCREEN_REGISTER_TAB_VIEW,
  LOGIN_SCREEN_TEXT_INPUT_WRAPPER,
  LOGIN_SCREEN_UPPER_ROW,
} from "../../theme";
import { Control, Controller as FormController, FormState, useForm, UseFormHandleSubmit } from "react-hook-form";


export interface LoginScreenProps {
  initialPage?: "login" | "register";
}

export interface LoginFormData {
  email: string;
  password: string;
}

export const LoginScreen: FC<StackScreenProps<StackNavigatorParamList, "login">> = ({ route, navigation }) => {

  // local states
  const props = route.params;
  const layout = useWindowDimensions();
  const [index, setIndex] = useState<number>(
    (props.initialPage && props.initialPage == "login") ? 0 :
      (props.initialPage && props.initialPage == "register") ? 1 : 0,
  );
  const [routes] = useState<Array<{ key: string; title: string; }>>([
    { key: "login", title: "Login" },
    { key: "register", title: "Register" },
  ]);


  /* React Hook Form Start */
  const PASSWORD_MIN_LENGTH = 6;

  const REGEX = {
    email: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  };

  const ERROR_MESSAGES = {
    REQUIRED: "This Field Is Required",
    EMAIL_INVALID: "Not a Valid Email",
  };

  const {
    control: loginControl,
    formState: loginFormState,
    handleSubmit: loginHandleSubmit,
  } = useForm<LoginFormData>();

  const loginSubmitCallback = (data: LoginFormData) => {
    console.log('loginSubmitCallback: ', data);
    // TODO: redux async thunk, and then do Amplify Auth
  }

  /* React Hook Form End */

  /* Tab View Callback */
  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "#4D94A0" }}
      style={{ backgroundColor: "white" }}
      activeColor={"#4D94A0"}
      inactiveColor={"#202224"}

    />
  );

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case "login":
        return (<LoginTab
            PASSWORD_MIN_LENGTH={PASSWORD_MIN_LENGTH}
            REGEX={REGEX}
            ERROR_MESSAGES={ERROR_MESSAGES}
            loginControl={loginControl}
            loginFormState={loginFormState}
            loginHandleSubmit={loginHandleSubmit}
            loginSubmitCallback={loginSubmitCallback}
          />
        );
      case "second":
        return <RegisterTab />;
      default:
        return null;
    }}

    return (
      <SafeAreaView
        style={{ flex: 1 }}
        edges={["right", "bottom", "left"]}
      >
        <StatusBar
          animated={true}
          barStyle={"default"}
          // hidden={true}
        />
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
        />
      </SafeAreaView>
    );
  };

interface LoginTabProps {
  PASSWORD_MIN_LENGTH: number;
  REGEX: { email: RegExp }
  ERROR_MESSAGES: {
    REQUIRED: string
    EMAIL_INVALID: string
  }
  loginControl: Control<LoginFormData, any>;
  loginFormState: FormState<LoginFormData>;
  loginHandleSubmit: UseFormHandleSubmit<LoginFormData>;
  loginSubmitCallback: (data: any) => void;
}

const LoginTab = (props: LoginTabProps) => {


  return (
    <View style={LOGIN_SCREEN_LOGIN_TAB_VIEW}>
      <View style={LOGIN_SCREEN_UPPER_ROW}>
        <View style={LOGIN_SCREEN_TEXT_INPUT_WRAPPER}>
          <FormController
            control={props.loginControl}
            name="email"
            defaultValue=""
            rules={{
              required: { message: props.ERROR_MESSAGES.REQUIRED, value: true },
              pattern: {
                value: props.REGEX.email,
                message: props.ERROR_MESSAGES.EMAIL_INVALID,
              },
            }}
            render={({field: { onChange, onBlur, value, ref }}) => (
              <View style={LOGIN_SCREEN_TEXT_INPUT_WRAPPER}>
                <PaperTextInput
                  ref={ref}
                  mode={"outlined"}
                  label={"Email"}
                  placeholder={"Enter your email address"}
                  selectionColor={"#4D94A0"}
                  outlineColor={"#c6c6c6"}
                  activeOutlineColor={"#4D94A0"}
                  textContentType="emailAddress"
                  value={value}
                  onBlur={onBlur}
                  autoCapitalize="none"
                  onChangeText={(value) => onChange(value)}
                  error={props.loginFormState.errors.email && true}
                />
                <PaperHelperText type="error">{props.loginFormState.errors.email?.message}</PaperHelperText>
              </View>
            )}
          />

        </View>

        <FormController
          control={props.loginControl}
          name="password"
          defaultValue=""
          rules={{
            required: { message: props.ERROR_MESSAGES.REQUIRED, value: true },
            minLength: {
              value: props.PASSWORD_MIN_LENGTH,
              message: "Password must have at least 6 characters",
            },
          }}
          render={({field: { onChange, onBlur, value, ref }}) => (
            <View style={LOGIN_SCREEN_TEXT_INPUT_WRAPPER}>
              <PaperTextInput
                ref={ref}
                mode={"outlined"}
                label={"Password"}
                placeholder={"Enter your password"}
                selectionColor={"#4D94A0"}
                outlineColor={"#c6c6c6"}
                activeOutlineColor={"#4D94A0"}
                textContentType="password"
                secureTextEntry
                value={value}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                error={props.loginFormState.errors.password && true}
              />
              <PaperHelperText type="error">{props.loginFormState.errors.email?.message}</PaperHelperText>
            </View>
          )}
        />
      </View>


      <View
        style={LOGIN_SCREEN_BOTTOM_BUTTON_ROW_WRAPPER}>
        <TouchableHighlight
          style={LOGIN_SCREEN_BOTTOM_BUTTON_TOUCHABLE}
          onPress={props.loginHandleSubmit(props.loginSubmitCallback)}
          // disabled={!props.loginFormState.isValid}
          underlayColor={"white"}>
          <View
            style={LOGIN_SCREEN_BOTTOM_BUTTON_WRAPPER}>
            <View style={LOGIN_SCREEN_BOTTOM_BUTTON}>
              <PaperText style={LOGIN_SCREEN_BOTTOM_BUTTON_TEXT}>LOGIN</PaperText>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );

};

const RegisterTab = () => (
  <View style={LOGIN_SCREEN_REGISTER_TAB_VIEW}>
    <PaperText>Register Tab</PaperText>
  </View>
);
