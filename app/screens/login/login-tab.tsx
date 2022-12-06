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
  Snackbar as PaperSnackbar,
  ActivityIndicator as PaperActivityIndicator
} from "react-native-paper";
import React, { useEffect, useState } from "react";
import {LoginFormData} from "./login-screen";
import { UserState } from "../../redux";

export interface LoginTabProps {
  PASSWORD_MIN_LENGTH: number;
  REGEXP: {email: RegExp};
  ERROR_MESSAGES: {
    REQUIRED: string;
    EMAIL_INVALID: string;
  };
  loginControl: Control<LoginFormData, any>;
  loginFormState: FormState<LoginFormData>;
  loginHandleSubmit: UseFormHandleSubmit<LoginFormData>;
  loginSubmitCallback: (data: any) => void;
  signingIn: UserState["signingIn"];
  signInError: UserState["signInError"]
}

export const LoginTab = (props: LoginTabProps) => {

   /* Bottom Snackbar start */
   const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
   const onToggleSnackBar = () => setSnackbarVisible(!snackbarVisible);
   const onDismissSnackBar = () => setSnackbarVisible(false);

   useEffect(()=>{
     if(props.signingIn === "completed" || props.signingIn === "failed"){
       onToggleSnackBar()
     }
   }, [props.signingIn])
   /* Bottom Snackbar end */

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
              value: props.REGEXP.email,
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
              message: "Password must have at least 8 characters",
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
          underlayColor={"transparent"}>
          <View style={LOGIN_SCREEN_BOTTOM_BUTTON_WRAPPER}>
            <View style={LOGIN_SCREEN_BOTTOM_BUTTON}>
            {
                props.signingIn == "loading" ? (
                  <PaperActivityIndicator animating={true} color={"#FFFFFF"} />
                ) : (<PaperText style={LOGIN_SCREEN_BOTTOM_BUTTON_TEXT}>
                  LOGIN
                </PaperText>)
              }
            </View>
          </View>
        </TouchableHighlight>
      </View>


      <PaperSnackbar
        style={{
          backgroundColor: props.signingIn == "failed" ? "#f13a59" :
            props.signingIn == "completed" ? "#42c949" : "#4D94A0"
        }}
        visible={snackbarVisible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Close",
          color: "white",
          onPress: () => {
            onDismissSnackBar();
          },
        }}>
        {
          props.signingIn == "failed" && props.signInError ?
            props.signInError.message
            : props.signingIn == "completed" ?
              "Sign In successfully" : ""
        }
      </PaperSnackbar>
    </View>
  );
};
