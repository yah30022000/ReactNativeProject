import { Control, Controller as FormController, FormState, UseFormHandleSubmit } from "react-hook-form";
import { TouchableHighlight, View } from "react-native";
import {
  LOGIN_SCREEN_BOTTOM_BUTTON,
  LOGIN_SCREEN_BOTTOM_BUTTON_ROW_WRAPPER,
  LOGIN_SCREEN_BOTTOM_BUTTON_TEXT,
  LOGIN_SCREEN_BOTTOM_BUTTON_TOUCHABLE,
  LOGIN_SCREEN_BOTTOM_BUTTON_WRAPPER,
  LOGIN_SCREEN_REGISTER_TAB_TNC_TEXT,
  LOGIN_SCREEN_REGISTER_TAB_UPPER_ROW,
  LOGIN_SCREEN_REGISTER_TAB_VIEW,
  LOGIN_SCREEN_TEXT_INPUT_WRAPPER,
} from "../../theme";
import {
  ActivityIndicator as PaperActivityIndicator,
  HelperText as PaperHelperText,
  Snackbar as PaperSnackbar,
  Text as PaperText,
  TextInput as PaperTextInput,
} from "react-native-paper";
import React, { useEffect, useState } from "react";
import { RegisterFormData } from "./login-screen";
import { UserState } from "../../redux/user/userSlice";

export interface RegisterTabProps {
  PASSWORD_MIN_LENGTH: number;
  // USERNAME_MIN_LENGTH: number;
  // USERNAME_MAX_LENGTH: number;
  REGEXP: {
    email: RegExp;
    name: RegExp;
    // username: RegExp;
    // phoneNumber: RegExp
  };
  ERROR_MESSAGES: {
    REQUIRED: string;
    EMAIL_INVALID: string;
    NAME_INVALID: string;
    // USERNAME_INVALID: string;
    // PHONE_NUMBER_INVALID: string;
  };
  registerControl: Control<RegisterFormData, any>;
  registerFormState: FormState<RegisterFormData>;
  registerHandleSubmit: UseFormHandleSubmit<RegisterFormData>;
  registerSubmitCallback: (data: any) => void;
  signingUp: UserState["signingUp"];
  signUpError: UserState["signUpError"]
  allowRegisterVerify: boolean;
}

export const RegisterTab = (props: RegisterTabProps) => {

  /* Bottom Snackbar start */
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
  const onToggleSnackBar = () => setSnackbarVisible(!snackbarVisible);
  const onDismissSnackBar = () => setSnackbarVisible(false);

  useEffect(()=>{
    if(props.signingUp == "completed" || props.signingUp == "failed"){
      onToggleSnackBar()
    }
  }, [props.signingUp])
  /* Bottom Snackbar end */

  return (
    <View style={LOGIN_SCREEN_REGISTER_TAB_VIEW}>

      {/* Upper Row */}
      <View style={LOGIN_SCREEN_REGISTER_TAB_UPPER_ROW}>


        {/* Username */}
        {/*<FormController*/}
        {/*  control={props.registerControl}*/}
        {/*  name="username"*/}
        {/*  defaultValue=""*/}
        {/*  rules={{*/}
        {/*    required: { message: props.ERROR_MESSAGES.REQUIRED, value: true },*/}
        {/*    pattern: {*/}
        {/*      value: props.REGEX.username,*/}
        {/*      message: props.ERROR_MESSAGES.USERNAME_INVALID,*/}
        {/*    },*/}
        {/*    minLength: {*/}
        {/*      value: props.USERNAME_MIN_LENGTH,*/}
        {/*      message: "Username must have at least 6 characters",*/}
        {/*    },*/}
        {/*    maxLength: {*/}
        {/*      value: props.USERNAME_MAX_LENGTH,*/}
        {/*      message: "Username must not be more than 18 characters",*/}
        {/*    },*/}
        {/*  }}*/}
        {/*  render={({ field: { onChange, onBlur, value, ref } }) => (*/}
        {/*    <View style={LOGIN_SCREEN_TEXT_INPUT_WRAPPER}>*/}
        {/*      <PaperTextInput*/}
        {/*        ref={ref}*/}
        {/*        mode={"outlined"}*/}
        {/*        label={"username"}*/}
        {/*        placeholder={"Enter your Username"}*/}
        {/*        selectionColor={"#4D94A0"}*/}
        {/*        outlineColor={"#c6c6c6"}*/}
        {/*        activeOutlineColor={"#4D94A0"}*/}
        {/*        textContentType="username"*/}
        {/*        value={value}*/}
        {/*        onBlur={onBlur}*/}
        {/*        autoCapitalize="none"*/}
        {/*        onChangeText={value => onChange(value)}*/}
        {/*        error={props.registerFormState.errors.username && true}*/}
        {/*      />*/}
        {/*      <PaperHelperText type="error">*/}
        {/*        {props.registerFormState.errors.username?.message}*/}
        {/*      </PaperHelperText>*/}
        {/*    </View>*/}
        {/*  )}*/}
        {/*/>*/}

      {/* Name */}
      <FormController
        control={props.registerControl}
          name="name"
          defaultValue=""
          rules={{
            required: {message: props.ERROR_MESSAGES.REQUIRED, value: true},
            pattern: {
              value: props.REGEXP.name,
              message: props.ERROR_MESSAGES.NAME_INVALID,
            },
          }}
          render={({field: {onChange, onBlur, value, ref}}) => (
            <View style={LOGIN_SCREEN_TEXT_INPUT_WRAPPER}>
              <PaperTextInput
                ref={ref}
                mode={"outlined"}
                label={"name"}
                placeholder={"Enter your Name"}
                selectionColor={"#4D94A0"}
                outlineColor={"#c6c6c6"}
                activeOutlineColor={"#4D94A0"}
                textContentType="name"
                value={value}
                onBlur={onBlur}
                autoCapitalize="none"
                onChangeText={value => onChange(value)}
                error={props.registerFormState.errors.name && true}
              />
              <PaperHelperText type="error">
                {props.registerFormState.errors.name?.message}
              </PaperHelperText>
            </View>
          )}
        />

        <FormController
          control={props.registerControl}
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
                error={props.registerFormState.errors.email && true}
              />
              <PaperHelperText type="error">
                {props.registerFormState.errors.email?.message}
              </PaperHelperText>
            </View>
          )}
        />

        <FormController
          control={props.registerControl}
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
                error={props.registerFormState.errors.password && true}
              />
              <PaperHelperText type="error">
                {props.registerFormState.errors.password?.message}
              </PaperHelperText>
            </View>
          )}
        />

        {/* <FormController
          control={props.registerControl}
          name="phoneNumber"
          defaultValue={12345678}
          rules={{
            required: {message: props.ERROR_MESSAGES.REQUIRED, value: true},
            pattern: {
              value: props.REGEX.phoneNumber,
              message: props.ERROR_MESSAGES.PHONE_NUMBER_INVALID,
            },
          }}
          render={({field: {onChange, onBlur, value, ref}}) => (
            <View style={LOGIN_SCREEN_TEXT_INPUT_WRAPPER}>
              <PaperTextInput
                ref={ref}
                mode={"outlined"}
                label={"phoneNumber"}
                placeholder={"Enter your Phone Number"}
                selectionColor={"#4D94A0"}
                outlineColor={"#c6c6c6"}
                activeOutlineColor={"#4D94A0"}
                textContentType="telephoneNumber"
                value="number"
                onBlur={onBlur}
                autoCapitalize="none"
                onChangeText={value => onChange(value)}
                error={props.registerFormState.errors.phoneNumber && true}
              />
              <PaperHelperText type="error">
                {props.registerFormState.errors.phoneNumber?.message}
              </PaperHelperText>
            </View>
          )}
        /> */}

        <PaperText style={LOGIN_SCREEN_REGISTER_TAB_TNC_TEXT}>
          This represents an agreement to our Terms and Conditions, upon your Signup.
        </PaperText>

      </View>

      {/* Bottom Button Row */}
      <View style={LOGIN_SCREEN_BOTTOM_BUTTON_ROW_WRAPPER}>
        <TouchableHighlight
          style={LOGIN_SCREEN_BOTTOM_BUTTON_TOUCHABLE}
          onPress={
            props.signingUp == "loading" ? () => {
              } :
              props.registerHandleSubmit(props.registerSubmitCallback)}
          underlayColor={"transparent"}>
          <View style={LOGIN_SCREEN_BOTTOM_BUTTON_WRAPPER}>
            <View style={LOGIN_SCREEN_BOTTOM_BUTTON}>
              {
                props.signingUp == "loading" ? (
                  <PaperActivityIndicator animating={true} color={"#FFFFFF"} />
                ) : (<PaperText style={LOGIN_SCREEN_BOTTOM_BUTTON_TEXT}>
                  SIGN UP
                </PaperText>)
              }

            </View>
          </View>
        </TouchableHighlight>
      </View>

      <PaperSnackbar
        style={{
          backgroundColor: props.signingUp == "failed" ? "#f13a59" :
            props.signingUp == "completed" ? "#42c949" : "#4D94A0"
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
          (props.signingUp == "failed" || props.allowRegisterVerify) && props.signUpError ?
            props.signUpError.message
            : props.signingUp == "completed" ?
              "Sign up successfully, please proceed to verify your account" : ""
        }
      </PaperSnackbar>
    </View>
  );
};
