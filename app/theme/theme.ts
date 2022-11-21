import {DefaultTheme} from "react-native-paper";

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
      white: string;
      blue: string;
      red: string;
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
    mintLight: "#e8fdff",
    black: "#202224",
    grey: "#A0A0A0",
    purple: "#5C3B5D",
    purpleLight: "#fbe8ff",
    yellow: "#EEAF12",
    yellowLight: "#FFF7F2",
    coral: "#F9A978",
    coralLight: "#fff3e8",
    white: "#ffffff",
    blue: "#1878f2",
    red: "#f13a59",
  },
};

export default theme;
