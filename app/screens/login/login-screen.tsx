import React, { FC, useState } from "react";
import { StackNavigatorParamList } from "../../navigators";
import { login, registerThunk } from "../../redux/user/userSlice";
import { StackScreenProps } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar, useWindowDimensions } from "react-native";
import { TabBar, TabView } from "react-native-tab-view";
import { useForm } from "react-hook-form";
import { LoginTab } from "./login-tab";
import { useAppDispatch } from "../../redux/hooks";
import { RegisterTab } from "./register-tab";

export interface LoginScreenProps {
  initialPage?: "login" | "register";
}

export interface LoginFormData {
  email: string;
  password: string;
}
export interface RegisterFormData {
  // username: string;
  name: string;
  // phoneNumber: number;
  email: string;
  password: string;
}

export const LoginScreen: FC<
  StackScreenProps<StackNavigatorParamList, "login">
> = ({route, navigation}) => {
  // local states
  const props = route.params;
  const layout = useWindowDimensions();
  const [index, setIndex] = useState<number>(
    props.initialPage && props.initialPage == "login"
      ? 0
      : props.initialPage && props.initialPage == "register"
      ? 1
      : 0,
  );
  const [routes] = useState<Array<{key: string; title: string}>>([
    {key: "login", title: "Login"},
    {key: "register", title: "Register"},
  ]);

  // global states
  // useAppDispatch() includes normal reducer and extra reducer (async thunk)
  // useDispatch() only include normal reducer
  const dispatch = useAppDispatch();

  /* React Hook Form Start */
  const PASSWORD_MIN_LENGTH = 8;
  // const USERNAME_MIN_LENGTH = 6;
  // const USERNAME_MAX_LENGTH = 18;

  const REGEX = {
    // username: /^[a-zA-Z0-9](_(?!(\.|_))|\.(?![_.])|[a-zA-Z0-9]){4,16}[a-zA-Z0-9]$/im,
    email:
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    name: /^[a-zA-Z\s]*$/i,
    // phoneNumber: /^[^0-3][0-9]{7}/gm,
  };

  const ERROR_MESSAGES = {
    REQUIRED: "This Field Is Required",
    EMAIL_INVALID: "Not a Valid Email",
    NAME_INVALID: "Not a Valid Name",
    // USERNAME_INVALID: "Not a Valid Username",
    // PHONE_NUMBER_INVALID: "Not a Valid Phone Number",
  };

  const {
    control: loginControl,
    formState: loginFormState,
    handleSubmit: loginHandleSubmit,
  } = useForm<LoginFormData>();

  const {
    control: registerControl,
    formState: registerFormState,
    handleSubmit: registerHandleSubmit,
  } = useForm<RegisterFormData>();

  const loginSubmitCallback = (data: LoginFormData) => {
    console.log("loginSubmitCallback: ", data);

    // TODO: redux async thunk, and then do Amplify Auth
    // why don't use navigation.navigate to homeTab, because it is in AppStack
    // login screen is in AuthStack, we change redux state and let react navigation to change stack for us
    dispatch(login());
  };

  const registerSubmitCallback = (data: RegisterFormData) => {
    console.log("registerSubmitCallback: ", data);

    // TODO: redux async thunk, and then do Amplify Auth
    // why don't use navigation.navigate to homeTab, because it is in AppStack
    // login screen is in AuthStack, we change redux state and let react navigation to change stack for us
    dispatch(registerThunk(data))
  };

  /* React Hook Form End */

  /* Tab View Callback */
  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: "#4D94A0"}}
      style={{backgroundColor: "white"}}
      activeColor={"#4D94A0"}
      inactiveColor={"#202224"}
    />
  );

  const renderScene = ({route}: any) => {
    switch (route.key) {
      case "login":
        return (
          <LoginTab
            PASSWORD_MIN_LENGTH={PASSWORD_MIN_LENGTH}
            REGEX={REGEX}
            ERROR_MESSAGES={ERROR_MESSAGES}
            loginControl={loginControl}
            loginFormState={loginFormState}
            loginHandleSubmit={loginHandleSubmit}
            loginSubmitCallback={loginSubmitCallback}
          />
        );
      case "register":
        return (
          <RegisterTab
            PASSWORD_MIN_LENGTH={PASSWORD_MIN_LENGTH}
            // USERNAME_MIN_LENGTH={USERNAME_MIN_LENGTH}
            // USERNAME_MAX_LENGTH={USERNAME_MAX_LENGTH}
            REGEX={REGEX}
            ERROR_MESSAGES={ERROR_MESSAGES}
            registerControl={registerControl}
            registerFormState={registerFormState}
            registerHandleSubmit={registerHandleSubmit}
            registerSubmitCallback={registerSubmitCallback}
           />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{flex: 1}} edges={["right", "bottom", "left"]}>
      <StatusBar
        animated={true}
        barStyle={"default"}
        // hidden={true}
      />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  );
};
