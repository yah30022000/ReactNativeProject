import React, {useEffect} from "react";
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
import { AppNavigator } from "./navigators";
import theme from "./theme/theme";
import { store } from "./redux/store";
import FontistoIcon from "react-native-vector-icons/Fontisto";
import SplashScreen from "react-native-splash-screen";

const App = () => {

  useEffect(() => {
    SplashScreen.hide(); //hides the splash screen on app load.
  }, []);

  return (
    <PaperProvider
      theme={theme}
      settings={{
        icon: props => <FontistoIcon {...props} />,
      }}
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
