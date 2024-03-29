import React, {FC, useEffect, useState} from "react";
import {StackNavigatorParamList} from "../../navigators";
import {StackScreenProps} from "@react-navigation/stack";
import {
  Modal as PaperModal,
  Modal as PaparModal,
  Portal as PaperPortal,
  Snackbar as PaperSnackbar,
  Text as PaperText,
  useTheme,
} from "react-native-paper";
import {SafeAreaView} from "react-native-safe-area-context";
import OtpInputs from "react-native-otp-inputs";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableHighlight, useWindowDimensions,
  View,
} from "react-native";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {
  HOTEL_SEARCH_BOTTOM_BUTTON,
  HOTEL_SEARCH_BOTTOM_BUTTON_TOUCHABLE,
  HOTEL_SEARCH_BOTTOM_BUTTON_WRAPPER,
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
import {useAppDispatch} from "../../redux/hooks";
import {
  changeUserConfirmingStatus,
  confirmRegisterThunk,
  login,
  resendVerifyCodeThunk,
  UserState,
} from "../../redux";
import {changeHotelSearchStatus} from "../../redux";
import theme from "../../theme/theme";

export interface RegisterVerifyScreenProps {
  exception: string | undefined;
}

export const RegisterVerifyScreen: FC<
  StackScreenProps<StackNavigatorParamList, "registerVerify">
> = ({route, navigation}) => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();

  const props = route.params;

  // local variables
  const [verifyCode, setVerifyCode] = useState<string>("");
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(
    !!props.exception,
  );
  const [resendTimer, setResendTimer] = useState<number>(10000);

  const dimension = useWindowDimensions();

  // global variables
  let emailDestination = useSelector<RootState>(
    state => state.user.signUpResult?.codeDeliveryDetails.Destination,
  ) as string | undefined;

  let username = useSelector<RootState>(
    state => state.user.signUpResult?.username,
  ) as string | undefined;

  let usernameFromError = useSelector<RootState>(
    state => state.user.signUpError?.username,
  ) as string | undefined;

  let userConfirmedFromSignupResult = useSelector<RootState>(
    state => state.user.signUpResult?.userConfirmed,
  ) as boolean | undefined;

  let userConfirmed = useSelector<RootState>(
    state => state.user.userConfirmed,
  ) as boolean | undefined;

  let userConfirming = useSelector<RootState>(
    state => state.user.userConfirming,
  ) as UserState["userConfirming"];

  const onToggleSnackBar = () => setSnackbarVisible(!snackbarVisible);
  const onDismissSnackBar = () => {
    setSnackbarVisible(false);
    if(userConfirming == "failed"){
      dispatch(changeUserConfirmingStatus("none"));
    }
  }

  const resendVerifyCode = () => {
    if (username || usernameFromError) {
      dispatch(resendVerifyCodeThunk(username ? username : usernameFromError!));
    }
  };

  const confirmRegister = () => {
    if (username || usernameFromError) {
      let requestBody = {
        username: username ? username : usernameFromError!,
        code: verifyCode,
      };
      dispatch(confirmRegisterThunk(requestBody));
    }
  };

  const closeModalCallback = () => {
    dispatch(login());
  };

  // useEffect(() => {
  // if(!!props.exception){
  //   resendVerifyCode()
  // }},[]);

  useEffect(() => {
    if (userConfirming == "failed") {
      onToggleSnackBar();
    }
  }, [userConfirming]);

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
    <SafeAreaView style={{flex: 1}} edges={["right", "bottom", "left"]}>
      {/* Title Row */}
      <View style={REGISTER_VERIFY_SCREEN_TITLE_ROW}>
        <PaperText style={{fontSize: 16, textAlign: "center"}}>
          Code has been sent to{" "}
          {emailDestination ? emailDestination : "Your email"}
        </PaperText>
      </View>

      {/* One Time Password */}
      <View style={REGISTER_VERIFY_SCREEN_OTP_ROW}>
        <OtpInputs
          handleChange={code => setVerifyCode(code)}
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
        <TouchableHighlight
          style={REGISTER_VERIFY_SCREEN_RESEND_BUTTON_TOUCHABLE}
          onPress={
            !resendTimer || resendTimer <= 0
              ? () => {
                  setResendTimer(10000);
                  resendVerifyCode();
                }
              : () => {}
          }
          underlayColor={"transparent"}>
          <View
            style={{
              ...REGISTER_VERIFY_SCREEN_RESEND_BUTTON_WRAPPER,
              backgroundColor:
                !resendTimer || resendTimer <= 0 ? colors.coral : colors.grey,
            }}>
            <View style={REGISTER_VERIFY_SCREEN_RESEND_BUTTON}>
              <PaperText style={REGISTER_VERIFY_SCREEN_RESEND_BUTTON_TEXT}>
                RESEND CODE ({resendTimer / 1000}s)
              </PaperText>
            </View>
          </View>
        </TouchableHighlight>
      </View>

      {/* Bottom Verify Code Button */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={150}
        style={REGISTER_VERIFY_SCREEN_VERIFY_BUTTON_ROW_WRAPPER}>
        <TouchableHighlight
          style={REGISTER_VERIFY_SCREEN_VERIFY_BUTTON_TOUCHABLE}
          onPress={() => {
            confirmRegister();
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
          onPress: onDismissSnackBar,
        }}>
        {props.exception && props.exception == "UsernameExistsException"
          ? "User exists, re-sent Verify Code to email"
          : userConfirming == "failed"
          ? "Invalid verification code provided, please try again."
          : ""}
      </PaperSnackbar>

      <PaperPortal>
        <PaperModal
          visible={!!userConfirmedFromSignupResult || !!userConfirmed}
          onDismiss={closeModalCallback}
          contentContainerStyle={{
            backgroundColor: "white",
            padding: 20,
            height: "60%",
            width: "90%",
            alignSelf: "center",
            borderRadius: 35,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
            }}>
            {/* Image */}
            <View
              style={{
                height: "40%",
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
              }}>
              <Image
                source={require("@travelasset/images/success.jpeg")}
                style={{
                  height: dimension.width/2,
                  width: dimension.width/2,
                }}
                resizeMode="cover"
              />
            </View>
            <View>
              <PaperText style={{fontSize: 32, textAlign: "center"}}>
                Email Account Successfully Confirmed !
              </PaperText>
            </View>
            <View>
              <TouchableHighlight
                style={HOTEL_SEARCH_BOTTOM_BUTTON_TOUCHABLE}
                onPress={closeModalCallback}
                underlayColor={"transparent"}>
                <View style={HOTEL_SEARCH_BOTTOM_BUTTON_WRAPPER}>
                  <View style={HOTEL_SEARCH_BOTTOM_BUTTON}>
                    <PaperText style={{color: colors.white}}>CLOSE</PaperText>
                  </View>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </PaperModal>
      </PaperPortal>
    </SafeAreaView>
  );
};
