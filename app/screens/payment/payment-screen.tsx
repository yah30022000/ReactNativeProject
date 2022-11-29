import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Controller as FormController, useForm } from "react-hook-form";
import { StackScreenProps } from "@react-navigation/stack";
import { StackNavigatorParamList } from "../../navigators";
import {
  Divider as PaperDivider,
  HelperText as PaperHelperText,
  Text as PaperText,
  TextInput as PaperTextInput,
  useTheme,
} from "react-native-paper";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableHighlight,
  useWindowDimensions,
  View,
} from "react-native";
import {
  HOTEL_DETAIL_SCREEN_HOTEL_INFO_FLAT_LIST_CONTAINER, HOTEL_ROOM_SELECT_SCREEN_BOTTOM_BUTTON_TEXT,
  HOTEL_ROOM_SELECT_SCREEN_BOTTOM_BUTTON_TOUCHABLE,
  HOTEL_ROOM_SELECT_SCREEN_BOTTOM_BUTTON_WRAPPER,
  HOTEL_ROOM_SELECT_SCREEN_DIVIDER_LINE,
  HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_BUTTON_ROW,
  HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_CONTAINER,
  HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_FIRST_ROW,
  HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_FIRST_ROW_LEFT_COLUMN,
  HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_SECOND_ROW,
  HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_SUBTEXT,
  HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_TEXT,
  HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_THIRD_ROW,
  HOTEL_ROOM_SELECT_SCREEN_IMAGE,
  HOTEL_ROOM_SELECT_SCREEN_PRICE_TEXT,
  PAYMENT_SCREEN,
  PAYMENT_SCREEN_BACK_BUTTON,
  PAYMENT_SCREEN_BOTTOM_BUTTON_ROW_WRAPPER,
  PAYMENT_SCREEN_BOTTOM_BUTTON_TEXT,
  PAYMENT_SCREEN_BOTTOM_BUTTON_TOUCHABLE,
  PAYMENT_SCREEN_BOTTOM_BUTTON_WRAPPER,
  PAYMENT_SCREEN_BOTTOM_SHEET,
  PAYMENT_SCREEN_EXP_DATE_CVV_ROW,
  PAYMENT_SCREEN_HALF_COLUMN,
  PAYMENT_SCREEN_HEADER_ROW,
  PAYMENT_SCREEN_INPUT,
  PAYMENT_SCREEN_INPUT_TITLE,
  PAYMENT_SCREEN_INPUT_TITLE_TEXT,
  PAYMENT_SCREEN_INPUT_VIEW,
  PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER,
  PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_ROW,
  PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_ROW_LEFT_COLUMN,
  PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_TEXT,
  PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_TEXT_VIEW,
  PAYMENT_SCREEN_PAYMENT_METHOD_DIVIDER_LINE,
  PAYMENT_SCREEN_PAYMENT_METHOD_TITLE,
  PAYMENT_SCREEN_TITLE,
  PAYMENT_SCREEN_TITLE_TEXT,
} from "../../theme";
import { useAppDispatch } from "../../redux/hooks";
import ButtonWithColorBg from "../../components/ButtonWithColorBg";
import BottomSheet from "@gorhom/bottom-sheet";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { validateCardNumber } from "../../helper/validateCardNumber";
import { hotelCreditCardTypes } from "../../helper/amadeus/hotel-credit-card-types";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { UserState } from "../../redux/user/userSlice";
import { capitalizeString } from "../../helper/capitalizeString";

export interface PaymentFormData {
  cardHolderName: string;
  cardNumber: string;
  expDate: string;
  cvv: string;
}

export interface ContactFormData {
  // title: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

export interface PaymentScreenProps {
  offerId?: string;
}

export const PaymentScreen: FC<StackScreenProps<StackNavigatorParamList, "payment">> = ({ route, navigation }) => {

  /* props */
  const offerId = route.params?.offerId ?? "OFFER_ID";

  const { colors } = useTheme();
  const dispatch = useAppDispatch();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo<Array<string>>(() => ["80%"], []);
  const [snapState, setSnapState] = useState<number>(0);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  const [paymentFormData, setPaymentFormData] = useState<PaymentFormData>();
  const [creditCardShortCodeState, setCreditCardShortCodeState] = useState<string>("");
  const [creditCardLogoState, setCreditCardLogoState] = useState<string>("credit-card");
  const [contactFormData, setContactFormData] = useState<ContactFormData>();

  // global variables
  let signInResult = useSelector<RootState>(
    (state) => state.user.signInResult
  ) as UserState["signInResult"] | undefined;

  /* React Hook Form Start */
  const CARD_NUMBER_MIN_LENGTH = 8;
  const CARD_NUMBER_MAX_LENGTH = 19;
  const REGEXP = {
    cardNumber:
      /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/,
    cardHolderName: /^[a-zA-Z\s]*$/i,
    expDate: /^\d{4}\-(0[1-9]|1[012])$/,
    cvv: /^[0-9]{3,4}$/,

    email: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    name: /^[a-zA-Z\s]*$/i,
    phoneNumber: /^[^0-3][0-9]{7}/gm,
  };

  const ERROR_MESSAGES = {
    CARD_NUMBER_INVALID: "Not a Valid Card Number",
    CARD_HOLDER_NAME_INVALID: "Not a Valid Cardholder Name",
    CARD_EXP_DATE_INVALID: "Not a Valid Card Date",
    CARD_CVV_INVALID: "Not a Valid Card CVV",
    REQUIRED: "This Field Is Required",

    // TITLE_INVALID: "Not a Valid Title",
    NAME_INVALID: "Not a Valid Name",
    PHONE_NUMBER_INVALID: "Not a Valid Phone Number",
    EMAIL_ADDRESS_INVALID: "Not a Valid Email Address",
  };

  const {
    control: paymentControl,
    formState: paymentFormState,
    handleSubmit: paymentHandleSubmit,
  } = useForm<PaymentFormData>({ mode: "onSubmit" });

  const {
    control: contactControl,
    formState: contactFormState,
    handleSubmit: contactHandleSubmit,
  } = useForm<ContactFormData>({ mode: "onSubmit" });

  /* React Hook Form end */


  // scroll view start
  const { height, width } = useWindowDimensions();
  const carouselRef = useRef<ICarouselInstance>(null);
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  // scroll view end

  // useEffect(() => {
  //   console.log("carouselIndex: ", carouselIndex);
  // }, [carouselIndex]);

  return (
    <SafeAreaView
      style={PAYMENT_SCREEN}>
      <View
        style={PAYMENT_SCREEN_HEADER_ROW}>
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
            {
              carouselIndex == 0 ? "PAYMENT METHODS"
                : carouselIndex == 1 ? "ADD PAYMENT CARD"
                  : carouselIndex == 2 ? "ADD CONTACT"
                    : "CONFIRM PAYMENT"
            }

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

        <Carousel
          ref={carouselRef}
          vertical={false}
          // height={height}
          width={width * 0.85}
          defaultIndex={0}
          // windowSize={0}
          enabled={false}
          loop={false}
          withAnimation={{
            type: "spring",
            config: {
              damping: 20,
            },
          }}
          data={[0, 1, 2, 3]}
          // style={{ backgroundColor: "grey" }}
          renderItem={({ index, animationValue }) => {
            switch (index) {
              case 0:
                // Payment Methods
                return (
                  <View style={{ height: "100%" }}>

                    {/* My Payment Methods Upper Part */}
                    <PaperText style={PAYMENT_SCREEN_PAYMENT_METHOD_TITLE}>
                      My Payment Methods
                    </PaperText>

                    <View style={PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER}>
                      {/* My Payment Methods Container */}
                      <View style={PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_ROW}>
                        <View style={PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_ROW_LEFT_COLUMN}>

                          {/* Default Apple / Google Pay */}
                          {Platform.OS === "ios" ? (
                            <View style={PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_TEXT_VIEW}>
                              <FontAwesome5Icon name={"apple"} size={18} />
                              <PaperText
                                style={PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_TEXT}
                                numberOfLines={3}
                                ellipsizeMode="tail"
                              >
                                Apple Pay
                              </PaperText>
                            </View>
                          ) : (
                            <View style={PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_TEXT_VIEW}>
                              <FontAwesome5Icon name={"google"} size={18} />
                              <PaperText
                                style={PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_TEXT}
                                numberOfLines={3}
                                ellipsizeMode="tail"
                              >
                                Google Pay
                              </PaperText>
                            </View>
                          )
                          }
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                          <PaperText style={{ color: colors.mint, fontWeight: "bold" }}>DEFAULT</PaperText>
                        </View>
                      </View>

                    </View>

                    <PaperDivider style={PAYMENT_SCREEN_PAYMENT_METHOD_DIVIDER_LINE} />

                    {/* Add Payment Method Lower Part */}
                    <PaperText style={PAYMENT_SCREEN_PAYMENT_METHOD_TITLE}>
                      Add Payment Method
                    </PaperText>
                    <View style={PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER}>

                      {/* Add Credit Card Container */}
                      <TouchableHighlight
                        onPress={() => {
                          carouselRef.current?.scrollTo({
                            animated: true,
                            index: index + 1,
                          });
                          setCarouselIndex(index + 1);
                        }}
                        underlayColor={"transparent"}
                      >
                        <View style={PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_ROW}>
                          <View style={PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_ROW_LEFT_COLUMN}>

                            {/* Add Credit Card Title */}
                            <View style={PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_TEXT_VIEW}>
                              <FontAwesome5Icon name={"credit-card"} size={18} />
                              <PaperText
                                style={PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_TEXT}
                                numberOfLines={3}
                                ellipsizeMode="tail"
                              >
                                Add Credit Card
                              </PaperText>
                            </View>

                          </View>

                          <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <MaterialIcon name={"arrow-forward-ios"} size={18} color={colors.grey} />
                          </View>
                        </View>
                      </TouchableHighlight>


                      <PaperDivider style={PAYMENT_SCREEN_PAYMENT_METHOD_DIVIDER_LINE} />

                      {/* Add Paypal Container */}
                      <View style={PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_ROW}>
                        <View style={PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_ROW_LEFT_COLUMN}>

                          {/* Add Paypal */}
                          <View style={PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_TEXT_VIEW}>
                            <FontAwesome5Icon name={"paypal"} size={18} />
                            <PaperText
                              style={PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_TEXT}
                              numberOfLines={3}
                              ellipsizeMode="tail"
                            >
                              Paypal
                            </PaperText>
                          </View>

                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                          <MaterialIcon name={"arrow-forward-ios"} size={18} color={colors.grey} />
                        </View>
                      </View>

                      <PaperDivider style={PAYMENT_SCREEN_PAYMENT_METHOD_DIVIDER_LINE} />

                      {/* Add Alipay Container */}
                      <View style={PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_ROW}>
                        <View style={PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_ROW_LEFT_COLUMN}>

                          {/* Add Alipay */}
                          <View style={PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_TEXT_VIEW}>
                            <FontAwesome5Icon name={"alipay"} size={18} />
                            <PaperText
                              style={PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_TEXT}
                              numberOfLines={3}
                              ellipsizeMode="tail"
                            >
                              Alipay
                            </PaperText>
                          </View>

                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                          <MaterialIcon name={"arrow-forward-ios"} size={18} color={colors.grey} />
                        </View>
                      </View>

                    </View>

                  </View>);
              case 1:
                // Add Payment Card
                return (
                  <View style={{ height: "100%" }}>

                    {/* Card Holder Row */}
                    <View>
                      <View style={PAYMENT_SCREEN_INPUT_TITLE}>
                        <PaperText style={PAYMENT_SCREEN_INPUT_TITLE_TEXT}>Card Holder</PaperText>
                      </View>

                      <FormController
                        control={paymentControl}
                        name="cardHolderName"
                        defaultValue=""
                        rules={{
                          required: { message: ERROR_MESSAGES.REQUIRED, value: true },
                          pattern: {
                            value: REGEXP.cardHolderName,
                            message: ERROR_MESSAGES.CARD_HOLDER_NAME_INVALID,
                          },
                        }}
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                          <View style={PAYMENT_SCREEN_INPUT_VIEW}>
                            <PaperTextInput
                              ref={ref}
                              // label={"cardHolderName"}
                              right={<PaperTextInput.Icon icon="camera" size={18} />}
                              value={value}
                              onChangeText={value => {
                                onChange(value);
                              }}
                              placeholder={"Enter cardholder's Name"}
                              autoCapitalize="none"
                              onBlur={onBlur}
                              mode={"outlined"}
                              selectionColor={colors.mint}
                              outlineColor={"transparent"}
                              activeOutlineColor={colors.mint}
                              style={PAYMENT_SCREEN_INPUT}
                              // underlineColor={"transparent"}
                              // activeUnderlineColor={colors.mint}
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
                      <View style={PAYMENT_SCREEN_INPUT_TITLE}>
                        <PaperText style={PAYMENT_SCREEN_INPUT_TITLE_TEXT}>Card Number</PaperText>
                      </View>
                      <FormController
                        control={paymentControl}
                        name="cardNumber"
                        // defaultValue={}
                        rules={{
                          required: { message: ERROR_MESSAGES.REQUIRED, value: true },
                          pattern: {
                            value: REGEXP.cardNumber,
                            message: ERROR_MESSAGES.CARD_NUMBER_INVALID,
                          },
                        }}
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                          <View style={PAYMENT_SCREEN_INPUT_VIEW}>
                            <PaperTextInput
                              ref={ref}
                              right={
                                <PaperTextInput.Icon name={creditCardLogoState} size={18} />
                              }
                              value={value}
                              onChangeText={(value) => {
                                // change icon of input field if valid
                                let validatedCardType = validateCardNumber(value, hotelCreditCardTypes);
                                if (validatedCardType !== undefined) {
                                  setCreditCardLogoState(validatedCardType.cardCode);
                                  setCreditCardShortCodeState(validatedCardType.shortCode);
                                } else {
                                  setCreditCardLogoState("credit-card");
                                }
                                onChange(value);

                                // change "42424242" to "4242 4242"
                                // let spacedNumberString = value.split(' ').join('');
                                // if (spacedNumberString.length > 0) {
                                //   spacedNumberString = spacedNumberString.match(new RegExp('.{1,4}', 'g'))?.join(' ') ?? value;
                                // }
                                // onChange(spacedNumberString);
                              }}
                              underlineColor={"transparent"}
                              placeholder={"Enter Card Number"}
                              autoCapitalize="none"
                              textContentType="creditCardNumber"
                              onBlur={onBlur}
                              selectionColor={colors.mint}
                              outlineColor={"transparent"}
                              activeOutlineColor={colors.mint}
                              keyboardType={"number-pad"}
                              maxLength={20}
                              mode={"outlined"}
                              style={PAYMENT_SCREEN_INPUT}
                              // underlineColor={"transparent"}
                              // activeUnderlineColor={colors.mint}
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
                    <View style={PAYMENT_SCREEN_EXP_DATE_CVV_ROW}>
                      {/* Left Row */}
                      <View style={PAYMENT_SCREEN_HALF_COLUMN}>
                        <View style={PAYMENT_SCREEN_INPUT_TITLE}>
                          <PaperText style={PAYMENT_SCREEN_INPUT_TITLE_TEXT}>Exp.Date</PaperText>
                        </View>
                        <FormController
                          control={paymentControl}
                          name="expDate"
                          defaultValue=""
                          rules={{
                            required: { message: ERROR_MESSAGES.REQUIRED, value: true },
                            pattern: {
                              value: REGEXP.expDate,
                              message: ERROR_MESSAGES.CARD_EXP_DATE_INVALID,
                            },
                          }}
                          render={({ field: { onChange, onBlur, value, ref } }) => (
                            <View style={PAYMENT_SCREEN_INPUT_VIEW}>
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
                                textContentType="oneTimeCode"
                                selectionColor={colors.mint}
                                outlineColor={"transparent"}
                                activeOutlineColor={colors.mint}
                                mode={"outlined"}
                                style={PAYMENT_SCREEN_INPUT}
                                error={paymentFormState.errors.expDate && true}
                              />
                              <PaperHelperText type="error">
                                {paymentFormState.errors.expDate?.message}
                              </PaperHelperText>
                            </View>
                          )}
                        />
                      </View>

                      {/* Right Row */}
                      <View style={PAYMENT_SCREEN_HALF_COLUMN}>
                        <View style={PAYMENT_SCREEN_INPUT_TITLE}>
                          <PaperText style={PAYMENT_SCREEN_INPUT_TITLE_TEXT}>CVV</PaperText>
                        </View>
                        <FormController
                          control={paymentControl}
                          name="cvv"
                          // defaultValue=""
                          rules={{
                            required: { message: ERROR_MESSAGES.REQUIRED, value: true },
                            pattern: {
                              message: ERROR_MESSAGES.CARD_CVV_INVALID,
                              value: REGEXP.cvv,
                            },
                          }}
                          render={({ field: { onChange, onBlur, value, ref } }) => (
                            <View style={PAYMENT_SCREEN_INPUT_VIEW}>
                              <PaperTextInput
                                ref={ref}
                                right={<PaperTextInput.Icon icon="locked" size={18} />}
                                value={value}
                                onChangeText={value => onChange(value)}
                                placeholder={"CVV"}
                                maxLength={4}
                                keyboardType="number-pad"
                                textContentType="oneTimeCode"
                                autoCapitalize="none"
                                onBlur={onBlur}
                                secureTextEntry={true}
                                selectionColor={colors.mint}
                                outlineColor={"transparent"}
                                activeOutlineColor={colors.mint}
                                // underlineColor={"transparent"}
                                // activeUnderlineColor={colors.mint}
                                mode={"outlined"}
                                style={PAYMENT_SCREEN_INPUT}
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

                    <KeyboardAvoidingView
                      // behavior={Platform.OS === "ios" ? "padding" : "height"}
                      keyboardVerticalOffset={20}
                      style={PAYMENT_SCREEN_BOTTOM_BUTTON_ROW_WRAPPER}>
                      {/* Back Button */}
                      <TouchableHighlight
                        style={PAYMENT_SCREEN_BOTTOM_BUTTON_TOUCHABLE}
                        onPress={() => {
                          carouselRef.current?.scrollTo({
                            animated: true,
                            index: index - 1,
                          });
                          setCarouselIndex(index - 1);
                        }}
                        underlayColor={"transparent"}>
                        <View style={{
                          ...PAYMENT_SCREEN_BOTTOM_BUTTON_WRAPPER,
                          backgroundColor: colors.grey,
                        }}>
                          <PaperText style={PAYMENT_SCREEN_BOTTOM_BUTTON_TEXT}>
                            BACK
                          </PaperText>
                        </View>
                      </TouchableHighlight>

                      {/* Add Payment Button */}
                      <TouchableHighlight
                        style={PAYMENT_SCREEN_BOTTOM_BUTTON_TOUCHABLE}
                        onPress={paymentHandleSubmit(value => {
                          console.log("paymentHandleSubmit value: ", value);
                          setPaymentFormData(value)
                          carouselRef.current?.scrollTo({
                            animated: true,
                            index: index + 1,
                          });
                          setCarouselIndex(index + 1);
                        })}
                        underlayColor={"transparent"}>
                        <View style={PAYMENT_SCREEN_BOTTOM_BUTTON_WRAPPER}>
                          <PaperText style={PAYMENT_SCREEN_BOTTOM_BUTTON_TEXT}>
                            ADD PAYMENT
                          </PaperText>
                        </View>
                      </TouchableHighlight>
                    </KeyboardAvoidingView>
                  </View>
                );
              case 2:
                // Add Contact
                return (
                  <View style={{ height: "100%" }}>

                    {/* Title and First Name Row */}
                    <View>
                      <View style={PAYMENT_SCREEN_INPUT_TITLE}>
                        <PaperText style={PAYMENT_SCREEN_INPUT_TITLE_TEXT}>First Name</PaperText>
                      </View>


                      <FormController
                        control={contactControl}
                        name="firstName"
                        defaultValue=""
                        rules={{
                          required: { message: ERROR_MESSAGES.REQUIRED, value: true },
                          pattern: {
                            value: REGEXP.name,
                            message: ERROR_MESSAGES.NAME_INVALID,
                          },
                        }}
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                          <View style={PAYMENT_SCREEN_INPUT_VIEW}>
                            <PaperTextInput
                              ref={ref}
                              // label={"cardHolderName"}
                              // right={<PaperTextInput.Icon icon="camera" size={18} />}
                              value={value}
                              onChangeText={value => {
                                onChange(value);
                              }}
                              placeholder={"Enter your first name"}
                              autoCapitalize="none"
                              onBlur={onBlur}
                              mode={"outlined"}
                              selectionColor={colors.mint}
                              outlineColor={"transparent"}
                              activeOutlineColor={colors.mint}
                              style={PAYMENT_SCREEN_INPUT}
                              // underlineColor={"transparent"}
                              // activeUnderlineColor={colors.mint}
                              error={contactFormState.errors.firstName && true}
                            />
                            <PaperHelperText type="error">
                              {contactFormState.errors.firstName?.message}
                            </PaperHelperText>
                          </View>
                        )}
                      />
                    </View>

                    {/* Last Name Row */}
                    <View>
                      <View style={PAYMENT_SCREEN_INPUT_TITLE}>
                        <PaperText style={PAYMENT_SCREEN_INPUT_TITLE_TEXT}>Last Name</PaperText>
                      </View>

                      <FormController
                        control={contactControl}
                        name="lastName"
                        defaultValue=""
                        rules={{
                          required: { message: ERROR_MESSAGES.REQUIRED, value: true },
                          pattern: {
                            value: REGEXP.name,
                            message: ERROR_MESSAGES.NAME_INVALID,
                          },
                        }}
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                          <View style={PAYMENT_SCREEN_INPUT_VIEW}>
                            <PaperTextInput
                              ref={ref}
                              // label={"cardHolderName"}
                              // right={<PaperTextInput.Icon icon="person" size={18} />}
                              value={value}
                              onChangeText={value => {
                                onChange(value);
                              }}
                              placeholder={"Enter your last name"}
                              autoCapitalize="none"
                              onBlur={onBlur}
                              mode={"outlined"}
                              selectionColor={colors.mint}
                              outlineColor={"transparent"}
                              activeOutlineColor={colors.mint}
                              style={PAYMENT_SCREEN_INPUT}
                              // underlineColor={"transparent"}
                              // activeUnderlineColor={colors.mint}
                              error={contactFormState.errors.lastName && true}
                            />
                            <PaperHelperText type="error">
                              {contactFormState.errors.lastName?.message}
                            </PaperHelperText>
                          </View>
                        )}
                      />
                    </View>

                    {/* Email Row */}
                    <View>
                      <View style={PAYMENT_SCREEN_INPUT_TITLE}>
                        <PaperText style={PAYMENT_SCREEN_INPUT_TITLE_TEXT}>Email Address</PaperText>
                      </View>

                      <FormController
                        control={contactControl}
                        name="email"
                        defaultValue=""
                        rules={{
                          required: { message: ERROR_MESSAGES.REQUIRED, value: true },
                          pattern: {
                            value: REGEXP.email,
                            message: ERROR_MESSAGES.EMAIL_ADDRESS_INVALID,
                          },
                        }}
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                          <View style={PAYMENT_SCREEN_INPUT_VIEW}>
                            <PaperTextInput
                              ref={ref}
                              // label={"cardHolderName"}
                              right={<PaperTextInput.Icon icon="email" size={18} />}
                              value={value}
                              onChangeText={value => {
                                onChange(value);
                              }}
                              placeholder={"Enter your email address"}
                              autoCapitalize="none"
                              onBlur={onBlur}
                              mode={"outlined"}
                              selectionColor={colors.mint}
                              outlineColor={"transparent"}
                              activeOutlineColor={colors.mint}
                              style={PAYMENT_SCREEN_INPUT}
                              defaultValue={signInResult?.email ?? ""}
                              // underlineColor={"transparent"}
                              // activeUnderlineColor={colors.mint}
                              error={contactFormState.errors.email && true}
                            />
                            <PaperHelperText type="error">
                              {contactFormState.errors.email?.message}
                            </PaperHelperText>
                          </View>
                        )}
                      />
                    </View>

                    {/* Phone Number Row */}
                    <View>
                      <View style={PAYMENT_SCREEN_INPUT_TITLE}>
                        <PaperText style={PAYMENT_SCREEN_INPUT_TITLE_TEXT}>Phone Number</PaperText>
                      </View>

                      <FormController
                        control={contactControl}
                        name="phoneNumber"
                        defaultValue=""
                        rules={{
                          required: { message: ERROR_MESSAGES.REQUIRED, value: true },
                          pattern: {
                            value: REGEXP.phoneNumber,
                            message: ERROR_MESSAGES.PHONE_NUMBER_INVALID,
                          },
                        }}
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                          <View style={PAYMENT_SCREEN_INPUT_VIEW}>
                            <PaperTextInput
                              ref={ref}
                              // label={"cardHolderName"}
                              right={<PaperTextInput.Icon icon="mobile-alt" size={18} />}
                              value={value}
                              onChangeText={value => {
                                onChange(value);
                              }}
                              placeholder={"Enter your phone number"}
                              autoCapitalize="none"
                              onBlur={onBlur}
                              mode={"outlined"}
                              selectionColor={colors.mint}
                              outlineColor={"transparent"}
                              activeOutlineColor={colors.mint}
                              style={PAYMENT_SCREEN_INPUT}
                              keyboardType={"phone-pad"}
                              // underlineColor={"transparent"}
                              // activeUnderlineColor={colors.mint}
                              error={contactFormState.errors.phoneNumber && true}
                            />
                            <PaperHelperText type="error">
                              {contactFormState.errors.phoneNumber?.message}
                            </PaperHelperText>
                          </View>
                        )}
                      />
                    </View>


                    <KeyboardAvoidingView
                      // behavior={Platform.OS === "ios" ? "padding" : "height"}
                      keyboardVerticalOffset={20}
                      style={PAYMENT_SCREEN_BOTTOM_BUTTON_ROW_WRAPPER}>
                      {/* Back Button */}
                      <TouchableHighlight
                        style={PAYMENT_SCREEN_BOTTOM_BUTTON_TOUCHABLE}
                        onPress={() => {
                          carouselRef.current?.scrollTo({
                            animated: true,
                            index: index - 1,
                          });
                          setCarouselIndex(index - 1);
                        }}
                        underlayColor={"transparent"}>
                        <View style={{
                          ...PAYMENT_SCREEN_BOTTOM_BUTTON_WRAPPER,
                          backgroundColor: colors.grey,
                        }}>
                          <PaperText style={PAYMENT_SCREEN_BOTTOM_BUTTON_TEXT}>
                            BACK
                          </PaperText>
                        </View>
                      </TouchableHighlight>

                      {/* Add Payment Button */}
                      <TouchableHighlight
                        style={PAYMENT_SCREEN_BOTTOM_BUTTON_TOUCHABLE}
                        onPress={contactHandleSubmit(value => {
                          console.log("contactHandleSubmit value: ", value);
                          setContactFormData(value);
                          carouselRef.current?.scrollTo({
                            animated: true,
                            index: index + 1,
                          });
                          setCarouselIndex(index + 1);
                        })}
                        underlayColor={"transparent"}>
                        <View style={PAYMENT_SCREEN_BOTTOM_BUTTON_WRAPPER}>
                          <PaperText style={PAYMENT_SCREEN_BOTTOM_BUTTON_TEXT}>
                            ADD CONTACT
                          </PaperText>
                        </View>
                      </TouchableHighlight>
                    </KeyboardAvoidingView>
                  </View>
                );
              case 3:
              default:
                return (
                  <View style={{ height: "100%" }}>

                    <View style={HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_CONTAINER}>
                      {/* Room Title and Image Row */}
                      <View style={HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_FIRST_ROW}>
                        <View style={HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_FIRST_ROW_LEFT_COLUMN}>

                          {/* Room Name */}
                          <View>
                            <PaperText
                              style={HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_TEXT}
                              numberOfLines={1}
                              ellipsizeMode="tail"
                            >
                              {/*{capitalizeString(item.room.typeEstimated?.category ?? "Room")}*/}
                              Room
                            </PaperText>
                          </View>

                          {/* Room Attribute 1 */}
                          <View>
                            <PaperText
                              style={HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_SUBTEXT}
                              numberOfLines={2}
                              ellipsizeMode="tail"
                            >
                              {/*Adults: {item.guests?.adults ?? 0}*/}
                              Adults:
                            </PaperText>
                          </View>
                          {/* Room Attribute 2 */}
                          <View>
                            <PaperText
                              style={HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_SUBTEXT}
                              numberOfLines={3}
                              ellipsizeMode="tail"
                            >
                              {/*{capitalizeString(item.room.description?.text ?? "")}*/}
                              Description
                            </PaperText>
                          </View>
                        </View>

                        <View>
                          <Image
                            style={HOTEL_ROOM_SELECT_SCREEN_IMAGE}
                            source={require("@travelasset/images/crown-hotel.jpeg")}
                          />
                        </View>

                      </View>

                      <PaperDivider style={HOTEL_ROOM_SELECT_SCREEN_DIVIDER_LINE} />

                      {/* Price Row */}
                      <View style={HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_THIRD_ROW}>
                        {/* Average Price */}
                        <View style={{ flexGrow: 1 }}>
                          <PaperText style={HOTEL_ROOM_SELECT_SCREEN_PRICE_TEXT}>
                            {/*{*/}
                            {/*  item?.price.variations?.average?.total ?*/}
                            {/*    `${item?.price.currency} ${item?.price.variations.average.total}`*/}
                            {/*    : item?.price.variations?.average?.base ?*/}
                            {/*      `${item?.price.currency}  ${item?.price.variations.average.base}`*/}
                            {/*      :*/}
                            {/*      "-"*/}
                            {/*}*/}
                            /night
                          </PaperText>
                        </View>

                        {/* Total Price */}
                        <View style={{ flexGrow: 1 }}>
                          <PaperText style={{
                            ...HOTEL_ROOM_SELECT_SCREEN_PRICE_TEXT,
                            fontWeight: "bold",
                          }}>
                            {/*{*/}
                            {/*  item?.price.total ?*/}
                            {/*    `${item?.price.currency} ${item?.price.total}`*/}
                            {/*    : item?.price.base ?*/}
                            {/*      `${item?.price.currency}  ${item?.price.base}`*/}
                            {/*      :*/}
                            {/*      "-"*/}
                            {/*}*/}
                            /total
                          </PaperText>
                        </View>

                      </View>

                    </View>


                    <KeyboardAvoidingView
                      // behavior={Platform.OS === "ios" ? "padding" : "height"}
                      keyboardVerticalOffset={20}
                      style={PAYMENT_SCREEN_BOTTOM_BUTTON_ROW_WRAPPER}>
                      {/* Back Button */}
                      <TouchableHighlight
                        style={PAYMENT_SCREEN_BOTTOM_BUTTON_TOUCHABLE}
                        onPress={() => {
                          carouselRef.current?.scrollTo({
                            animated: true,
                            index: index - 1,
                          });
                          setCarouselIndex(index - 1);
                        }}
                        underlayColor={"transparent"}>
                        <View style={{
                          ...PAYMENT_SCREEN_BOTTOM_BUTTON_WRAPPER,
                          backgroundColor: colors.grey,
                        }}>
                          <PaperText style={PAYMENT_SCREEN_BOTTOM_BUTTON_TEXT}>
                            BACK
                          </PaperText>
                        </View>
                      </TouchableHighlight>

                      {/* Add Payment Button */}
                      <TouchableHighlight
                        style={PAYMENT_SCREEN_BOTTOM_BUTTON_TOUCHABLE}
                        onPress={() => {
                          if(index < 5){
                            carouselRef.current?.scrollTo({
                              animated: true,
                              index: index + 1,
                            });
                            setCarouselIndex(index + 1);
                          }

                        }}
                        underlayColor={"transparent"}>
                        <View style={PAYMENT_SCREEN_BOTTOM_BUTTON_WRAPPER}>
                          <PaperText style={PAYMENT_SCREEN_BOTTOM_BUTTON_TEXT}>
                            CONFIRM
                          </PaperText>
                        </View>
                      </TouchableHighlight>
                    </KeyboardAvoidingView>
                  </View>
                );
            }
          }}
        />

      </BottomSheet>

    </SafeAreaView>
  );
}
