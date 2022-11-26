import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { PaymentScreen } from "../screens";
import { PaymentDemoScreen } from "../screens/payment/PaymentDemoScreen";
import { AppStack } from "./app-stack";


interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {
}

export const AppNavigator = (props: NavigationProps) => {

  return (
    <NavigationContainer
      {...props}
    >
      <AppStack/>
      {/* <PaymentDemoScreen/> */}
    </NavigationContainer>
  )
}

AppNavigator.displayName = "AppNavigator"

const exitRoutes = ["home"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
