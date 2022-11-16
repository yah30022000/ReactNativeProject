import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeBottomTab, HomeBottomTabProps } from "./home-bottom-tab";
import { HotelSearchScreen, HotelSearchScreenProps } from "../screens/hotels/hotel-search-screen";
import { HotelListScreen, HotelSearchListProps } from "../screens/hotels/hotel-list-screen";
import { HotelDetailScreen, HotelDetailScreenProps } from "../screens/hotels/hotel-detail-screen";
import { HotelRoomSelectScreen, HotelRoomSelectScreenProps } from "../screens/hotels/hotel-room-select-screen";
import { PaymentScreen, PaymentScreenProps } from "../screens/payment/payment-screen";
import { PaymentCompleteScreen, PaymentCompleteScreenProps } from "../screens/payment/payment-complete-screen";
import { LoginScreen, LoginScreenProps } from "../screens/login/login-screen";
import { OnboardingScreen } from "../screens";
import { useSelector } from "react-redux";
import userSlice, { UserState } from "../redux/user/userSlice";
import { useEffect } from "react";
import { RootState } from "../redux/store";

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
  onBoarding: undefined
  login: LoginScreenProps

  // after login
  homeTab: HomeBottomTabProps;
  hotelSearch: HotelSearchScreenProps;
  hotelList: HotelSearchListProps;
  hotelDetail: HotelDetailScreenProps;
  hotelRoomSelect: HotelRoomSelectScreenProps;
  payment: PaymentScreenProps;
  paymentComplete: PaymentCompleteScreenProps;
};

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<StackNavigatorParamList>();

export const AppStack = () => {

  const isLoggedIn = useSelector<RootState>((state) => state.users.isLoggedIn);

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
          <Stack.Screen name="login" component={LoginScreen}
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
