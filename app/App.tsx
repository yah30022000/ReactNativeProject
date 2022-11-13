import React from "react";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import {Provider as PaperProvider} from "react-native-paper";
// import HomeScreen from "./screens/home-screen";
import theme from "./theme/theme";
import HotelSearchScreen from "./screens/hotel-search-screen";

const App = () => {
  return (
    <PaperProvider
      theme={theme}
      // settings={{
      //   icon: props => <MaterialIcon {...props} />,
      // }}
    >
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        {/* <HomeScreen /> */}
        {/*<OnboardingScreen/>*/}
        <HotelSearchScreen />
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default App;
