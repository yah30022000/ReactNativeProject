/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./app/App";
import { name as appName } from "./app.json";
import "react-native-gesture-handler";
import { Amplify } from "aws-amplify";
import awsmobile from "./src/aws-exports";

// https://docs.amplify.aws/lib/client-configuration/configuring-amplify-categories/q/platform/js/#scoped-configuration---graphql-api
Amplify.configure(awsmobile);


AppRegistry.registerComponent(appName, () => App);
