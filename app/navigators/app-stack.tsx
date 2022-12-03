import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeBottomTab, HomeBottomTabProps } from "./home-bottom-tab";
import {
  HotelDetailScreen,
  HotelDetailScreenProps,
  HotelListScreen,
  HotelRoomSelectScreen,
  HotelRoomSelectScreenProps,
  HotelSearchFilterScreenProps,
  HotelSearchListProps,
  HotelSearchScreen,
  HotelSearchScreenProps,
  LoginScreen,
  LoginScreenProps,
  OnboardingScreen,
  OnboardingScreenProps,
  PaymentCompleteScreen,
  PaymentCompleteScreenProps,
  PaymentScreen,
  PaymentScreenProps,
  PreLoginScreen,
  PreLoginScreenProps,
  RegisterVerifyScreen,
  RegisterVerifyScreenProps,
} from "../screens";
import { useSelector } from "react-redux";
import { getCurrentAuthenticatedUserThunk, logout, RootState, useAppDispatch } from "../redux";
import { useEffect } from "react";
import { Hub as AmplifyHub, Storage as AmplifyS3Storage } from "aws-amplify";
import SplashScreen from "react-native-splash-screen";


/**
 * For every new screens added within Tab stack
 * 1. screens/tab - duplicate screen
 * 2. screens/index.ts - export new screen
 * 3. app.stack.tsx - add new property within nav param list,
 *    add new Stack.Screen in AppStack
 * 4. screens/home-tab/component-display-screen.tsx - add new screen object inside componentPages array
 */
export type StackNavigatorParamList = {
  // before login
  onBoarding: OnboardingScreenProps
  preLogin: PreLoginScreenProps
  login: LoginScreenProps
  registerVerify: RegisterVerifyScreenProps

  // after login
  homeTab: HomeBottomTabProps;
  hotelSearch: HotelSearchScreenProps;
  hotelList: HotelSearchListProps;
  hotelSearchFilter: HotelSearchFilterScreenProps;
  hotelDetail: HotelDetailScreenProps;
  hotelRoomSelect: HotelRoomSelectScreenProps;
  payment: PaymentScreenProps;
  paymentComplete: PaymentCompleteScreenProps;
};

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<StackNavigatorParamList>();

export const AppStack = () => {

  const isLoggedIn = useSelector<RootState>((state) => state.user.isLoggedIn);

  const dispatch = useAppDispatch();

  // AWS Cognito OAuth - Hub is a radio to receive message instantly
  useEffect(() => {
    SplashScreen.hide(); //hides the splash screen on app load.

    const unsubscribeAmplifyHub = AmplifyHub.listen("auth", ({ payload: { event, data } }) => {
      // console.log("AmplifyHub Auth event: ", event, " data: ", data);
      switch (event) {
        case "signIn":
        case "cognitoHostedUI":
          dispatch(getCurrentAuthenticatedUserThunk());
          break;
        case "signOut":
          console.log("AmplifyHub received request of logout from user!!");
          dispatch(logout());
          break;
        case "signIn_failure":
        case "cognitoHostedUI_failure":
          console.log("Sign in failure", data);
          break;
      }

      // AmplifyAuth.currentAuthenticatedUser()
      //   .then(userData => console.log("AmplifyAuth.currentAuthenticatedUser: ", userData))
      //   .catch(() => console.log('Not signed in'));
    });

    return unsubscribeAmplifyHub;
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="homeTab">
      {!isLoggedIn ? (
        // AuthStack, before login
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name="onBoarding" component={OnboardingScreen} />
          <Stack.Screen name="preLogin" component={PreLoginScreen} />
          <Stack.Screen name="login" component={LoginScreen} options={{ title: "", headerShown: true }}
            // initialParams={{setIsLoggedIn: setIsLoggedIn}}
          />
          <Stack.Screen name="registerVerify" component={RegisterVerifyScreen} options={{ title: "Register Verification", headerShown: true }}
            // initialParams={{setIsLoggedIn: setIsLoggedIn}}
          />
        </Stack.Group>
      ) : (
        // AppStack, after login
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name="homeTab" component={HomeBottomTab}
            // initialParams={{setIsLoggedIn: setIsLoggedIn}}
          />
          <Stack.Screen name="hotelSearch" component={HotelSearchScreen} />
          <Stack.Screen name="hotelList" component={HotelListScreen} />
          {/*<Stack.Screen name="hotelSearchFilter" component={HotelSearchFilterScreen}/>*/}
          <Stack.Screen name="hotelDetail" component={HotelDetailScreen} />
          <Stack.Screen name="hotelRoomSelect" component={HotelRoomSelectScreen} />
          <Stack.Screen name="payment" component={PaymentScreen} />
          <Stack.Screen name="paymentComplete" component={PaymentCompleteScreen} />
        </Stack.Group>
      )

      }

    </Stack.Navigator>
  );
};
