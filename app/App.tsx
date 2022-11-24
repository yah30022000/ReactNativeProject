import React from "react";
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
import { AppNavigator } from "./navigators";
import theme from "./theme/theme";
import { store } from "./redux/store";

const App = () => {


  return (
    <PaperProvider
      theme={theme}
      // settings={{
      //   icon: props => <MaterialIcon {...props} />,
      // }}
    >
      <ReduxProvider store={store}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <AppNavigator
            // initialState={initialNavigationState}
            // onStateChange={onNavigationStateChange}
          />
        </SafeAreaProvider>
      </ReduxProvider>

    </PaperProvider>
  );
};

export default App;
