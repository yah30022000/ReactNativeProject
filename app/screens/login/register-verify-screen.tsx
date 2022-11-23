import React, { FC, useEffect, useState } from "react";
import { StackNavigatorParamList } from "../../navigators";
import { StackScreenProps } from "@react-navigation/stack";
import {
  Modal as PaparModal,
  Portal as PaperPortal,
  Snackbar as PaperSnackbar,
  Text as PaperText,
  useTheme,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import OtpInputs from "react-native-otp-inputs";
import { KeyboardAvoidingView, Platform, TouchableHighlight, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  REGISTER_VERIFY_SCREEN_MISC_STYLE,
  REGISTER_VERIFY_SCREEN_OTP_FOCUS,
  REGISTER_VERIFY_SCREEN_OTP_INPUT,
  REGISTER_VERIFY_SCREEN_OTP_INPUT_CONTAINER,
  REGISTER_VERIFY_SCREEN_OTP_ROW,
  REGISTER_VERIFY_SCREEN_RESEND_BUTTON,
  REGISTER_VERIFY_SCREEN_RESEND_BUTTON_ROW_WRAPPER,
  REGISTER_VERIFY_SCREEN_RESEND_BUTTON_TEXT,
  REGISTER_VERIFY_SCREEN_RESEND_BUTTON_TOUCHABLE,
  REGISTER_VERIFY_SCREEN_RESEND_BUTTON_WRAPPER,
  REGISTER_VERIFY_SCREEN_TITLE_ROW,
  REGISTER_VERIFY_SCREEN_VERIFY_BUTTON,
  REGISTER_VERIFY_SCREEN_VERIFY_BUTTON_ROW_WRAPPER,
  REGISTER_VERIFY_SCREEN_VERIFY_BUTTON_TEXT,
  REGISTER_VERIFY_SCREEN_VERIFY_BUTTON_TOUCHABLE,
  REGISTER_VERIFY_SCREEN_VERIFY_BUTTON_WRAPPER,
} from "../../theme";
import { useAppDispatch } from "../../redux/hooks";
import { confirmRegisterThunk, resendVerifyCodeThunk } from "../../redux/user/userSlice";
import { changeHotelSearching } from "../../redux/hotel/hotelSlice";

export interface RegisterVerifyScreenProps {
  exception?: string
}

export const RegisterVerifyScreen: FC<StackScreenProps<StackNavigatorParamList, "registerVerify">> = ({
                                                                                                        route,
                                                                                                        navigation,
                                                                                                      }) => {

  const { colors } = useTheme();
  const dispatch = useAppDispatch();

  const props = route.params

  // local variables
  const [verifyCode, setVerifyCode] = useState<string>("");
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(
    !!props.exception
  )
  const [resendTimer, setResendTimer] = useState<number>(10000);

  // global variables
  let emailDestination = useSelector<RootState>(
    (state) => state.user.signUpResult?.codeDeliveryDetails.Destination,
  ) as string | undefined;

  let username = useSelector<RootState>(
    (state) => state.user.signUpResult?.username
  ) as string | undefined

  let usernameFromError = useSelector<RootState>(
    (state) => state.user.signUpError?.username
  ) as string | undefined

  const onToggleSnackBar = () => setSnackbarVisible(!snackbarVisible);
  const onDismissSnackBar = () => setSnackbarVisible(false);

  const resendVerifyCode = () => {
    if(username || usernameFromError){
      dispatch(resendVerifyCodeThunk(username? username : usernameFromError!))
    }
  }

  const confirmRegister = () => {
    if(username || usernameFromError){
      let requestBody = {
        username : username? username : usernameFromError!,
        code: verifyCode
      }
      dispatch(confirmRegisterThunk(requestBody))
    }
  }

  useEffect(() => {
  if(!!props.exception){
    if (usernameFromError) {
      dispatch(resendVerifyCodeThunk(usernameFromError));
    }
  }},[]);

  useEffect(() => {
    // resend time, reduce every second
    let timerInterval = setTimeout(() => {
      if (resendTimer > 0) {
        setResendTimer(resendTimer - 1000);
      }
    }, 1000);
    return () => clearTimeout(timerInterval);
  }, [resendTimer]);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["right", "bottom", "left"]}>

      {/* Title Row */}
      <View style={REGISTER_VERIFY_SCREEN_TITLE_ROW}>
        <PaperText>Code has been sent to {emailDestination}</PaperText>
      </View>

      {/* One Time Password */}
      <View style={REGISTER_VERIFY_SCREEN_OTP_ROW}>
        <OtpInputs
          handleChange={(code) => setVerifyCode(code)}
          numberOfInputs={6}
          autofillFromClipboard={false}
          placeholder={""}
          maxLength={1}
          selectTextOnFocus={false}
          focusStyles={REGISTER_VERIFY_SCREEN_OTP_FOCUS}
          inputContainerStyles={REGISTER_VERIFY_SCREEN_OTP_INPUT_CONTAINER}
          inputStyles={REGISTER_VERIFY_SCREEN_OTP_INPUT}
          style={REGISTER_VERIFY_SCREEN_MISC_STYLE}
          blurOnSubmit={true}
        />
      </View>

      {/* Resend Code */}
      <View style={REGISTER_VERIFY_SCREEN_RESEND_BUTTON_ROW_WRAPPER}>
        {!resendTimer || resendTimer <= 0 ? (
          <TouchableHighlight
            style={REGISTER_VERIFY_SCREEN_RESEND_BUTTON_TOUCHABLE}
            onPress={() => {
              setResendTimer(10000);
              resendVerifyCode();
            }}
            underlayColor={"transparent"}>
            <View style={REGISTER_VERIFY_SCREEN_RESEND_BUTTON_WRAPPER}>
              <View style={REGISTER_VERIFY_SCREEN_RESEND_BUTTON}>
                <PaperText style={REGISTER_VERIFY_SCREEN_RESEND_BUTTON_TEXT}>
                  RESEND CODE
                </PaperText>
              </View>
            </View>
          </TouchableHighlight>
        ) : (
          <PaperText>Resend code in {resendTimer / 1000}s</PaperText>
        )}

      </View>

      {/* Bottom Verify Code Button */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding": "height"}
        keyboardVerticalOffset={150}
        style={REGISTER_VERIFY_SCREEN_VERIFY_BUTTON_ROW_WRAPPER}>
        <TouchableHighlight
          style={REGISTER_VERIFY_SCREEN_VERIFY_BUTTON_TOUCHABLE}
          onPress={() => {
            confirmRegister()
          }}
          underlayColor={"transparent"}>
          <View style={REGISTER_VERIFY_SCREEN_VERIFY_BUTTON_WRAPPER}>
            <View style={REGISTER_VERIFY_SCREEN_VERIFY_BUTTON}>
              <PaperText style={REGISTER_VERIFY_SCREEN_VERIFY_BUTTON_TEXT}>
                VERIFY CODE
              </PaperText>
            </View>
          </View>
        </TouchableHighlight>
      </KeyboardAvoidingView>

      {/* Error snackbar */}
      <PaperSnackbar
        style={{
          backgroundColor: "#f13a59",
        }}
        visible={snackbarVisible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Close",
          onPress: () => {
            onDismissSnackBar();
          },
        }}>
        {
          props.exception && props.exception == "UsernameExistsException" ?
           "User exists, re-sent Verify Code to email" : ""
        }
      </PaperSnackbar>

      <PaperPortal>
        {/*<PaparModal visible={*/}
        {/*  (modalStatus === "loading" || modalStatus === "completed" || modalStatus === "failed")*/}
        {/*} onDismiss={() => {*/}
        {/*  setModalStatus("none")*/}
        {/*  dispatch(changeHotelSearching("none"))*/}
        {/*  if(modalStatus === "completed"){*/}
        {/*    navigation.navigate("hotelList" as any)*/}

        {/*  }*/}
        {/*}} contentContainerStyle={{ backgroundColor: "white", padding: 20, height: "60%", width: "80%", alignSelf: "center", borderRadius: 35 }}>*/}
        {/*  <PaperText>{modalStatus}</PaperText>*/}
        {/*</PaparModal>*/}
      </PaperPortal>


    </SafeAreaView>
  );

};
