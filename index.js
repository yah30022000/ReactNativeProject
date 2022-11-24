/**
 * @format
 */

import { AppRegistry, Linking } from "react-native";
import App from "./app/App";
import { name as appName } from "./app.json";
import "react-native-gesture-handler";
import { Amplify } from "aws-amplify";
import awsmobile from "./src/aws-exports";
import InAppBrowser from 'react-native-inappbrowser-reborn';

// OAuth require in-app browser
async function urlOpener(url, redirectUrl) {
  await InAppBrowser.isAvailable();
  const { type, url: newUrl } = await InAppBrowser.openAuth(url, redirectUrl, {
    showTitle: false,
    enableUrlBarHiding: true,
    enableDefaultShare: false,
    ephemeralWebSession: false,
  });

  if (type === 'success') {
    Linking.openURL(newUrl);
  }
}

// https://docs.amplify.aws/lib/client-configuration/configuring-amplify-categories/q/platform/js/#scoped-configuration---graphql-api
Amplify.configure({
  ...awsmobile,
  oauth: {
    ...awsmobile.oauth,
    urlOpener,
  },
});



AppRegistry.registerComponent(appName, () => App);
