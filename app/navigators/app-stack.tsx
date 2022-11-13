import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeBottomTab, HomeBottomTabProps } from "./home-bottom-tab";
import { HotelSearchScreen, HotelSearchScreenProps } from "../screens/hotels/hotel-search-screen";
import { HotelListScreen, HotelSearchListProps } from "../screens/hotels/hotel-list-screen";
import { HotelDetailScreen, HotelDetailScreenProps } from "../screens/hotels/hotel-detail-screen";
import { HotelRoomSelectScreen, HotelRoomSelectScreenProps } from "../screens/hotels/hotel-room-select-screen";
import { PaymentScreen, PaymentScreenProps } from "../screens/payment/payment-screen";
import { PaymentCompleteScreen, PaymentCompleteScreenProps } from "../screens/payment/payment-complete-screen";

/**
 * For every new screens added within Tab stack
 * 1. screens/tab - duplicate screen
 * 2. screens/index.ts - export new screen
 * 3. app.stack.tsx - add new property within nav param list,
 *    add new Stack.Screen in AppStack
 * 4. screens/home-tab/component-display-screen.tsx - add new screen object inside componentPages array
 */
export type StackNavigatorParamList = {
  homeTab: HomeBottomTabProps,
  hotelSearch: HotelSearchScreenProps,
  hotelList: HotelSearchListProps,
  hotelDetail: HotelDetailScreenProps,
  hotelRoomSelect: HotelRoomSelectScreenProps,
  payment: PaymentScreenProps
  paymentComplete: PaymentCompleteScreenProps
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<StackNavigatorParamList>();


export const AppStack = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="homeTab"
    >
      <Stack.Screen name="homeTab" component={HomeBottomTab} />
      <Stack.Screen name="hotelSearch" component={HotelSearchScreen}/>
      <Stack.Screen name="hotelList" component={HotelListScreen} />
      <Stack.Screen name="hotelDetail" component={HotelDetailScreen} />
      <Stack.Screen name="hotelRoomSelect" component={HotelRoomSelectScreen} />
      <Stack.Screen name="payment" component={PaymentScreen} />
      <Stack.Screen name="paymentComplete" component={PaymentCompleteScreen} />
    </Stack.Navigator>
  );
};
