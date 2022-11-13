import React from "react";
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import { AppNavigator } from "./navigators"
import theme from "./theme/theme";


const App = () => {

  return (
    <PaperProvider
      theme={theme}
      // settings={{
      //   icon: props => <MaterialIcon {...props} />,
      // }}
    >
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <AppNavigator
          // initialState={initialNavigationState}
          // onStateChange={onNavigationStateChange}
        />
      </SafeAreaProvider>
    </PaperProvider>
  );
};


export default App;
