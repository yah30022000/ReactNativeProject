import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { AppStack } from "./app-stack";


interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {
}

export const AppNavigator = (props: NavigationProps) => {

  return (
    <NavigationContainer
      {...props}
    >
      <AppStack/>
    </NavigationContainer>
  )
}

AppNavigator.displayName = "AppNavigator"

const exitRoutes = ["home"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
