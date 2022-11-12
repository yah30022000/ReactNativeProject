import { DefaultTheme } from "react-native-paper";


declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      mint: string;
      mintLight: string;
      black: string;
      grey: string;
      purple: string;
      purpleLight: string;
      coral: string;
      coralLight: string;
      yellow: string;
      yellowLight: string;
    }

    interface Theme {
      myOwnProperty: boolean;
    }
  }
}

const theme: ReactNativePaper.Theme = {
  ...DefaultTheme,
  // dark: true,
  myOwnProperty: true,
  colors: {
    ...DefaultTheme.colors,
    mint: "#4D94A0",
    mintLight: "#F1F6F7",
    black: "#202224",
    grey: "#A0A0A0",
    purple: "#5C3B5D",
    purpleLight: "#F4F3FC",
    yellow: "#EEAF12",
    yellowLight: "#FFF7F2",
    coral: "#F9A978",
    coralLight: "#FFF5F5"
  },
};

export default theme;
