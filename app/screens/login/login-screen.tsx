import React, { FC, useState } from "react";
import { StackNavigatorParamList } from "../../navigators";
import { login } from "../../redux/user/userSlice";
import { StackScreenProps } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text as PaperText } from "react-native-paper";
import { StatusBar, useWindowDimensions, View } from "react-native";
import { TabBar, TabView } from "react-native-tab-view";
import { LOGIN_SCREEN_REGISTER_TAB_VIEW } from "../../theme";
import { useForm } from "react-hook-form";
import { LoginTab } from "./login-tab";
import { useAppDispatch } from "../../redux/hooks";


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

  // global states
  // useAppDispatch() includes normal reducer and extra reducer (async thunk)
  // useDispatch() only include normal reducer
  const dispatch = useAppDispatch();

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
    // why don't use navigation.navigate to homeTab, because it is in AppStack
    // login screen is in AuthStack, we change redux state and let react navigation to change stack for us
    dispatch(login())
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



const RegisterTab = () => (
  <View style={LOGIN_SCREEN_REGISTER_TAB_VIEW}>
    <PaperText>Register Tab</PaperText>
  </View>
);
