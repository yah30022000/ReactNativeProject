import {Control, FormState, UseFormHandleSubmit} from "react-hook-form";
import {TouchableHighlight, View} from "react-native";
import {
  LOGIN_SCREEN_BOTTOM_BUTTON,
  LOGIN_SCREEN_BOTTOM_BUTTON_ROW_WRAPPER,
  LOGIN_SCREEN_BOTTOM_BUTTON_TEXT,
  LOGIN_SCREEN_BOTTOM_BUTTON_TOUCHABLE,
  LOGIN_SCREEN_BOTTOM_BUTTON_WRAPPER,
  LOGIN_SCREEN_LOGIN_TAB_VIEW,
  LOGIN_SCREEN_TEXT_INPUT_WRAPPER,
  LOGIN_SCREEN_LOGIN_TAB_UPPER_ROW,
  LOGIN_SCREEN_LOGIN_TAB_FORGOT_PASSWORD_TEXT,
} from "../../theme";
import {Controller as FormController} from "react-hook-form";
import {
  HelperText as PaperHelperText,
  Text as PaperText,
  TextInput as PaperTextInput,
} from "react-native-paper";
import React from "react";
import {LoginFormData} from "./login-screen";

export interface LoginTabProps {
  PASSWORD_MIN_LENGTH: number;
  REGEX: {email: RegExp};
  ERROR_MESSAGES: {
    REQUIRED: string;
    EMAIL_INVALID: string;
  };
  loginControl: Control<LoginFormData, any>;
  loginFormState: FormState<LoginFormData>;
  loginHandleSubmit: UseFormHandleSubmit<LoginFormData>;
  loginSubmitCallback: (data: any) => void;
}

export const LoginTab = (props: LoginTabProps) => {
  return (
    <View style={LOGIN_SCREEN_LOGIN_TAB_VIEW}>
      {/* Upper Row */}
      <View style={LOGIN_SCREEN_LOGIN_TAB_UPPER_ROW}>
        <FormController
          control={props.loginControl}
          name="email"
          defaultValue=""
          rules={{
            required: {message: props.ERROR_MESSAGES.REQUIRED, value: true},
            pattern: {
              value: props.REGEX.email,
              message: props.ERROR_MESSAGES.EMAIL_INVALID,
            },
          }}
          render={({field: {onChange, onBlur, value, ref}}) => (
            <View style={LOGIN_SCREEN_TEXT_INPUT_WRAPPER}>
              <PaperTextInput
                ref={ref}
                mode={"outlined"}
                label={"Email"}
                placeholder={"Enter your email address"}
                selectionColor={"#4D94A0"}
                outlineColor={"#c6c6c6"}
                activeOutlineColor={"#4D94A0"}
                textContentType="emailAddress"
                value={value}
                onBlur={onBlur}
                autoCapitalize="none"
                onChangeText={value => onChange(value)}
                error={props.loginFormState.errors.email && true}
              />
              <PaperHelperText type="error">
                {props.loginFormState.errors.email?.message}
              </PaperHelperText>
            </View>
          )}
        />

        <FormController
          control={props.loginControl}
          name="password"
          defaultValue=""
          rules={{
            required: {message: props.ERROR_MESSAGES.REQUIRED, value: true},
            minLength: {
              value: props.PASSWORD_MIN_LENGTH,
              message: "Password must have at least 6 characters",
            },
          }}
          render={({field: {onChange, onBlur, value, ref}}) => (
            <View style={LOGIN_SCREEN_TEXT_INPUT_WRAPPER}>
              <PaperTextInput
                ref={ref}
                mode={"outlined"}
                label={"Password"}
                placeholder={"Enter your password"}
                selectionColor={"#4D94A0"}
                outlineColor={"#c6c6c6"}
                activeOutlineColor={"#4D94A0"}
                textContentType="password"
                secureTextEntry
                value={value}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                error={props.loginFormState.errors.password && true}
              />
              <PaperHelperText type="error">
                {props.loginFormState.errors.password?.message}
              </PaperHelperText>
            </View>
          )}
        />

        <TouchableHighlight 
        underlayColor={"transparent"}
        onPress={() => {}}>
          <PaperText style={LOGIN_SCREEN_LOGIN_TAB_FORGOT_PASSWORD_TEXT}>
            Forgot password?
          </PaperText>
        </TouchableHighlight>
      </View>

      {/* Bottom Button Row */}
      <View style={LOGIN_SCREEN_BOTTOM_BUTTON_ROW_WRAPPER}>
        <TouchableHighlight
          style={LOGIN_SCREEN_BOTTOM_BUTTON_TOUCHABLE}
          onPress={props.loginHandleSubmit(props.loginSubmitCallback)}
          // disabled={!props.loginFormState.isValid}
          underlayColor={"white"}>
          <View style={LOGIN_SCREEN_BOTTOM_BUTTON_WRAPPER}>
            <View style={LOGIN_SCREEN_BOTTOM_BUTTON}>
              <PaperText style={LOGIN_SCREEN_BOTTOM_BUTTON_TEXT}>
                LOGIN
              </PaperText>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};
