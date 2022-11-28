import React, {FC, useCallback, useMemo, useRef, useState} from "react";
import {useForm, Controller as FormController} from "react-hook-form";
import {StackScreenProps} from "@react-navigation/stack";
import {StackNavigatorParamList} from "../../navigators";
import {
  Text as PaperText,
  useTheme,
  HelperText as PaperHelperText,
  TextInput as PaperTextInput,
} from "react-native-paper";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableHighlight,
  View,
} from "react-native";
import {
  PAYMENT_SCREEN_BACK_BUTTON,
  PAYMENT_SCREEN_TITLE,
  PAYMENT_SCREEN_TITLE_TEXT,
  INPUT_CARD_NUMBER_ROW,
  CARD_HOLDER_NAME,
  CARD_HOLDER_NAME_TEXT,
  INPUT_CARD_NAME_ROW,
  CARD_NUMBER,
  CARD_EXP_DATE_TEXT,
  EXP_DATE_INPUT_TEXT,
  EXP_DATE_CVV,
  CARD_EXP_DATE,
  CARD_CVV,
  CARD_CVV_TEXT,
  PAYMENT_SCREEN_BOTTOM_BUTTON,
  PAYMENT_SCREEN_BOTTOM_BUTTON_ROW_WRAPPER,
  PAYMENT_SCREEN_BOTTOM_BUTTON_TOUCHABLE,
  PAYMENT_SCREEN_BOTTOM_BUTTON_WRAPPER,
  PAYMENT_SCREEN_BOTTOM_BUTTON_TEXT,
  PAYMENT_SCREEN_BOTTOM_SHEET,
  CARD_NUMBER_TEXT,
} from "../../theme/styles";
import {useAppDispatch} from "../../redux/hooks";
import ButtonWithColorBg from "../../components/ButtonWithColorBg";
import BottomSheet from "@gorhom/bottom-sheet";
import {HotelState} from "../../redux/hotel/hotelSlice";
import {validateCardNumber} from "../../helper/amadeus/validateCardNumber";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import FontistoIcon from "react-native-vector-icons/Fontisto";

export interface PaymentFormData {
  cardHolderName: string;
  cardNumber: string;
  expDate: string;
  cvv: string;
}

export interface PaymentScreenProps {
  offerId?: string
}

export const PaymentScreen: FC<
  StackScreenProps<StackNavigatorParamList, "payment">
> = ({route, navigation}) => {

  /* props */
  const offerId = route.params?.offerId ?? "OFFER_ID";

  const {colors} = useTheme();
  const dispatch = useAppDispatch();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo<Array<string>>(() => ["80%"], []);
  const [payment_methodsViewOn, setPayment_MethodsViewOn] =
    useState<boolean>(false);
  const [snapState, setSnapState] = useState<number>(0);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  /* React Hook Form Start */
  const CARD_NUMBER_MIN_LENGTH = 8;
  const CARD_NUMBER_MAX_LENGTH = 19;
  const REGEXP = {
    cardNumber:
      /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/,
    cardHolderName: /^[a-zA-Z\s]*$/i,
    expDate: /^\d{4}\-(0[1-9]|1[012])$/,
    cvv: /^[0-9]{3,4}$/,
  };

  const ERROR_MESSAGES = {
    CARD_NUMBER_INVALID: "Not a Valid Card Number",
    CARD_HOLDER_NAME_INVALID: "Not a Valid Cardholder Name",
    CARD_EXP_DATE_INVALID: "Not a Valid Card Date",
    CARD_CVV_INVALID: "Not a Valid Card CVV",
    REQUIRED: "This Field Is Required",
  };

  const {
    control: paymentControl,
    formState: paymentFormState,
    handleSubmit: paymentHandleSubmit,
  } = useForm<PaymentFormData>({mode: "onChange"});

  /* React Hook Form end */

  const [creditCardLogoState, setCreditCardLogoState] = useState<string>("credit-card");

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: colors.mint, paddingHorizontal: 25}}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}>
        <TouchableHighlight
          //   onPress={() => navigation.goBack()}
          underlayColor={"transparent"}>
          <View style={PAYMENT_SCREEN_BACK_BUTTON}>
            <ButtonWithColorBg
              size={25}
              color={colors.black}
              iconName={"chevron-left"}
              iconProvider={"Entypo"}
              backgroundColor={colors.white}
                onPress={() => navigation.goBack()}
            />
          </View>
        </TouchableHighlight>
        <View style={PAYMENT_SCREEN_TITLE}>
          <PaperText style={PAYMENT_SCREEN_TITLE_TEXT}>
            ADD PAYMENT CARD
          </PaperText>
        </View>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        style={PAYMENT_SCREEN_BOTTOM_SHEET}
        handleComponent={null}
      >
        {/* Card Holder Row */}
        <View>
          <View style={CARD_HOLDER_NAME}>
            <PaperText style={CARD_HOLDER_NAME_TEXT}>Card Holder</PaperText>
          </View>

          <FormController
            control={paymentControl}
            name="cardHolderName"
            defaultValue=""
            rules={{
              required: {message: ERROR_MESSAGES.REQUIRED, value: true},
              pattern: {
                value: REGEXP.cardHolderName,
                message: ERROR_MESSAGES.CARD_HOLDER_NAME_INVALID,
              },
            }}
            render={({field: {onChange, onBlur, value, ref}}) => (
              <View style={INPUT_CARD_NAME_ROW}>
                <PaperTextInput
                  ref={ref}
                  // label={"cardHolderName"}
                  right={<PaperTextInput.Icon icon="camera" size={18} />}
                  value={value}
                  onChangeText={value => {
                    onChange(value);
                  }}
                  underlineColor={"transparent"}
                  placeholder={"Enter cardholder's Name"}
                  autoCapitalize="none"
                  onBlur={onBlur}
                  selectionColor={"#4D94A0"}
                  outlineColor={"#c6c6c6"}
                  activeOutlineColor={"#4D94A0"}
                  activeUnderlineColor={colors.mint}
                  error={paymentFormState.errors.cardHolderName && true}
                />
                <PaperHelperText type="error">
                  {paymentFormState.errors.cardHolderName?.message}
                </PaperHelperText>
              </View>
            )}
          />
        </View>

        {/* Card Number Row */}
        <View>
          <View style={CARD_NUMBER}>
            <PaperText style={CARD_NUMBER_TEXT}>Card Number</PaperText>
          </View>
          <FormController
            control={paymentControl}
            name="cardNumber"
            // defaultValue={}
            rules={{
              required: {message: ERROR_MESSAGES.REQUIRED, value: true},
              pattern: {
                value: REGEXP.cardNumber,
                message: ERROR_MESSAGES.CARD_NUMBER_INVALID,
              },
            }}
            render={({field: {onChange, onBlur, value, ref}}) => (
              <View style={INPUT_CARD_NAME_ROW}>
                <PaperTextInput
                  ref={ref}
                  right={
                    <PaperTextInput.Icon name={creditCardLogoState} size={18} />
                  }
                  value={value}
                  onChangeText={value => {
                    let validatedCardType = validateCardNumber(value);
                    if(validatedCardType !== ""){
                      setCreditCardLogoState(validatedCardType)
                    }else{
                      setCreditCardLogoState("credit-card")
                    }
                    onChange(value);
                  }}
                  underlineColor={"transparent"}
                  placeholder={"Enter Card Number"}
                  autoCapitalize="none"
                  textContentType="creditCardNumber"
                  onBlur={onBlur}
                  selectionColor={colors.mint}
                  outlineColor={colors.greyLight}
                  activeOutlineColor={colors.mint}
                  activeUnderlineColor={colors.mint}
                  keyboardType={"number-pad"}
                  maxLength={20}
                  error={paymentFormState.errors.cardNumber && true}
                />
                <PaperHelperText type="error">
                  {paymentFormState.errors.cardNumber?.message}
                </PaperHelperText>
              </View>
            )}
          />
        </View>

        {/* Expiry Date and CVV */}
        <View style={EXP_DATE_CVV}>
          {/* Left Row */}
          <View style={CARD_EXP_DATE}>
            <View style={{marginBottom: 10}}>
              <PaperText style={CARD_EXP_DATE_TEXT}>Exp.Date</PaperText>
            </View>
            <View style={EXP_DATE_INPUT_TEXT}>
              <FormController
                control={paymentControl}
                name="expDate"
                defaultValue=""
                rules={{
                  required: {message: ERROR_MESSAGES.REQUIRED, value: true},
                  pattern: {
                    value: REGEXP.expDate,
                    message: ERROR_MESSAGES.CARD_EXP_DATE_INVALID,
                  },
                }}
                render={({field: {onChange, onBlur, value, ref}}) => (
                  <View style={INPUT_CARD_NAME_ROW}>
                    <PaperTextInput
                      ref={ref}
                      right={<PaperTextInput.Icon icon="calendar" size={18} />}
                      value={value}
                      onChangeText={value => {
                        onChange(value);
                      }}
                      underlineColor={"transparent"}
                      placeholder={"yyyy-MM"}
                      autoCapitalize="none"
                      keyboardType="numbers-and-punctuation"
                      onBlur={onBlur}
                      maxLength={7}
                      selectionColor={"#4D94A0"}
                      outlineColor={"#c6c6c6"}
                      activeOutlineColor={"#4D94A0"}
                      activeUnderlineColor={colors.mint}
                      error={paymentFormState.errors.expDate && true}
                    />
                    <PaperHelperText type="error">
                      {paymentFormState.errors.expDate?.message}
                    </PaperHelperText>
                  </View>
                )}
              />
            </View>
          </View>

          {/* Right Row */}
          <View style={CARD_CVV}>
            <View style={{marginBottom: 10}}>
              <PaperText style={CARD_CVV_TEXT}>CVV</PaperText>
            </View>
            <View style={EXP_DATE_INPUT_TEXT}>
              <FormController
                control={paymentControl}
                name="cvv"
                // defaultValue=""
                rules={{
                  required: {message: ERROR_MESSAGES.REQUIRED, value: true},
                  pattern: {
                    message: ERROR_MESSAGES.CARD_CVV_INVALID,
                    value: REGEXP.cvv,
                  },
                }}
                render={({field: {onChange, onBlur, value, ref}}) => (
                  <View style={INPUT_CARD_NAME_ROW}>
                    <PaperTextInput
                      ref={ref}
                      right={<PaperTextInput.Icon icon="locked" size={18} />}
                      value={value}
                      onChangeText={value => onChange(value)}
                      underlineColor={"transparent"}
                      placeholder={"CVV"}
                      maxLength={4}
                      keyboardType="number-pad"
                      textContentType="oneTimeCode"
                      autoCapitalize="none"
                      onBlur={onBlur}
                      secureTextEntry={true}
                      selectionColor={colors.mint}
                      outlineColor={colors.greyLight}
                      activeOutlineColor={colors.mint}
                      activeUnderlineColor={colors.mint}
                      error={paymentFormState.errors.cvv && true}
                    />
                    <PaperHelperText type="error">
                      {paymentFormState.errors.cvv?.message}
                    </PaperHelperText>
                  </View>
                )}
              />
            </View>
          </View>
        </View>
      </BottomSheet>

      <KeyboardAvoidingView
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={20}
        style={PAYMENT_SCREEN_BOTTOM_BUTTON_ROW_WRAPPER}>
        <TouchableHighlight
          style={PAYMENT_SCREEN_BOTTOM_BUTTON_TOUCHABLE}
          onPress={paymentHandleSubmit(value => {
            console.log("paymentHandleSubmit value: ", value);
          })}
          underlayColor={"transparent"}>
          <View style={PAYMENT_SCREEN_BOTTOM_BUTTON_WRAPPER}>
            <View style={PAYMENT_SCREEN_BOTTOM_BUTTON}>
              <PaperText style={PAYMENT_SCREEN_BOTTOM_BUTTON_TEXT}>
                ADD PAYMENT
              </PaperText>
            </View>
          </View>
        </TouchableHighlight>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
