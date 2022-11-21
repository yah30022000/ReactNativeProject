import React, {FC, memo, useState} from "react";
import {StackNavigatorParamList} from "../../navigators";
import {Button, Text as PaperText, useTheme} from "react-native-paper";
import TextInput from "../../components/TextInput";
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import {login} from "../../redux/user/userSlice";
import {useDispatch} from "react-redux";
import theme from "../../theme/theme";
import {Form, FormItem} from "react-native-form-component";
import {emailValidator, passwordValidator} from "../../helper/utils";
import Background from "../../components/Background";
import BackButton from "../../components/BackButton";
import Header from "../../components/Header";
import {Navigation} from "../../types";
import {
  LOGIN_SCREEN_FORGOT_PASSWORD,
  LOGIN_SCREEN_FORGOT_PASSWORD_TEXT,
} from "../../theme/styles";
import {StackScreenProps} from "@react-navigation/stack";

export interface LoginScreenProps {
  initialPage?: "login" | "register";
}

export const LoginScreen: FC<
  StackScreenProps<StackNavigatorParamList, "login">
> = ({route, navigation}) => {
  const [email, setEmail] = useState({value: "", error: ""});
  const [password, setPassword] = useState({value: "", error: ""});

  const _onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      return;
    }

    // navigation.navigate('Dashboard');
  };
  return (
    <Background>
      <BackButton
        goBack={() => {
          // navigation.navigate('HomeScreen')
        }}
      />

      <Header>Welcome back.</Header>

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({value: text, error: ""})}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoComplete="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({value: text, error: ""})}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <View style={LOGIN_SCREEN_FORGOT_PASSWORD}>
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate('ForgotPasswordScreen')}
          }}>
          <Text style={LOGIN_SCREEN_FORGOT_PASSWORD_TEXT}>
            Forgot your password?
          </Text>
        </TouchableOpacity>
      </View>

      <Button mode="contained" onPress={_onLoginPressed}>
        Login
      </Button>
    </Background>
  );
};
