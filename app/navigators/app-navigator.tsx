import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { OnboardingScreen, PaymentScreen } from "../screens";
import { OnboardingDemoScreen } from "../screens/login/onboarding-demo-screen";
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
      {/* <OnboardingDemoScreen/> */}
    </NavigationContainer>
  )
}

AppNavigator.displayName = "AppNavigator"

const exitRoutes = ["home"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
