import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Controller as FormController, useForm } from "react-hook-form";
import { StackScreenProps } from "@react-navigation/stack";
import { StackNavigatorParamList } from "../../navigators";
import {
  Divider as PaperDivider,
  HelperText as PaperHelperText,
  Modal as PaperModal,
  Portal as PaperPortal,
  Snackbar as PaperSnackbar,
  Text as PaperText,
  TextInput as PaperTextInput,
  useTheme,
} from "react-native-paper";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableHighlight,
  useWindowDimensions,
  View,
} from "react-native";
import {
  HOTEL_ROOM_SELECT_SCREEN_BACK_BUTTON_ROW,
  HOTEL_ROOM_SELECT_SCREEN_DIVIDER_LINE,
  HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_CONTAINER,
  HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_FIRST_ROW,
  HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_FIRST_ROW_LEFT_COLUMN,
  HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_SUBTEXT,
  HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_TEXT,
  HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_THIRD_ROW,
  HOTEL_ROOM_SELECT_SCREEN_IMAGE,
  HOTEL_ROOM_SELECT_SCREEN_PRICE_TEXT, HOTEL_ROOM_SELECT_SCREEN_TITLE_TEXT,
  HOTEL_SCREEN_MODAL_CONTENT_CONTAINER,
  HOTEL_SCREEN_MODAL_CONTENT_VIEW,
  HOTEL_SEARCH_BOTTOM_BUTTON,
  HOTEL_SEARCH_BOTTOM_BUTTON_TOUCHABLE,
  HOTEL_SEARCH_BOTTOM_BUTTON_WRAPPER,
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
import {
  amadeusHotelBookingThunk,
  changeHotelBookingStatus,
  HotelState,
  RootState,
  setHotelBookingsRequest,
  useAppDispatch,
  UserState,
} from "../../redux";
import ButtonWithColorBg from "../../components/ButtonWithColorBg";
import BottomSheet from "@gorhom/bottom-sheet";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import {
  capitalizeString,
  HotelBookingsRequest,
  HotelBookingsResponse,
  HotelCreditCardType,
  hotelCreditCardTypes,
  HotelOffer,
  HotelOffersResponse,
  validateCardNumber,
} from "../../helper";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { useSelector } from "react-redux";
import moment from "moment";
import FontistoIcon from "react-native-vector-icons/Fontisto";
import { saveHotelBookingThunk } from "../../redux/hotel/thunk/saveHotelBookingThunk";

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

export const PaymentScreen: FC<
  StackScreenProps<StackNavigatorParamList, "payment">
> = ({route, navigation}) => {
  /* props */
  const offerId = route.params?.offerId ?? "OFFER_ID";

  const {colors} = useTheme();
  const dispatch = useAppDispatch();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo<Array<string>>(() => ["80%"], []);
  const [snapState, setSnapState] = useState<number>(0);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  const [paymentFormData, setPaymentFormData] = useState<PaymentFormData>();

  let initialCreditCardType = { cardCode: "credit-card", cardName: "Credit Card", shortCode: "", regExp: /^$/}
  const [creditCardTypeState, setCreditCardTypeState] = useState<HotelCreditCardType>(initialCreditCardType);
  const [contactFormData, setContactFormData] = useState<ContactFormData>();
  const [hotelOffer, setHotelOffer] = useState<HotelOffer>();
  const [nights, setNights] = useState<number>(1);
  const [basePrice, setBasePrice] = useState<number>(0);
  const [serviceOrTax, setServiceOrTax] = useState<number>(0);
  const [modalStatus, setModalStatus] =
    useState<HotelState["hotelBookingStatus"]>("none");

  let dimension = useWindowDimensions();

  // global variables
  let signInResult = useSelector<RootState>(
    (state) => state.user.signInResult,
  ) as UserState["signInResult"] | undefined;

  let hotelListAndOffersResponse = useSelector<RootState>(
    (state) => state.hotel.hotelListAndOffersResponse,
  ) as HotelOffersResponse | undefined;

  const hotelBookingsRequest = useSelector<RootState>(
    state => state.hotel.hotelBookingRequest,
  ) as HotelBookingsRequest | null;

  const hotelBookingsResponse = useSelector<RootState>(
    state => state.hotel.hotelBookingResponse,
  ) as HotelBookingsResponse | null;

  const hotelBookingStatus = useSelector<RootState>(
    state => state.hotel.hotelBookingStatus,
  ) as HotelState["hotelBookingStatus"];

  /* React Hook Form Start */
  const CARD_NUMBER_MIN_LENGTH = 8;
  const CARD_NUMBER_MAX_LENGTH = 19;
  const REGEXP = {
    cardNumber:
      /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))|\b(?:\d[ -]*?){13,16}\b$/,
    cardHolderName: /^[a-zA-Z\s]*$/i,
    expDate: /^\d{4}\-(0[1-9]|1[012])$/,
    cvv: /^[0-9]{3,4}$/,

    email:
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
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
  } = useForm<PaymentFormData>({mode: "onSubmit"});

  const {
    control: contactControl,
    formState: contactFormState,
    handleSubmit: contactHandleSubmit,
  } = useForm<ContactFormData>({mode: "onSubmit"});

  /* React Hook Form end */

  // scroll view start
  const {height, width} = useWindowDimensions();
  const carouselRef = useRef<ICarouselInstance>(null);
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  // scroll view end

  // hotel booking and payment API Call
  const hotelBookingApiCall = () => {
    if (!contactFormData || !paymentFormData) {
      onToggleSnackBar("Please review payment form and contact form again");
      return
    }

    dispatch(setHotelBookingsRequest({
      data: {
        offerId: offerId,
        guests: [
          {
            name: {
              // title: "MR",
              firstName: contactFormData.firstName,
              lastName: contactFormData.lastName,
            },
            contact: {
              phone: "+852".concat(contactFormData.phoneNumber),
              email: contactFormData.email
            }
          }
        ],
        payments: [
          {
            method: "creditCard",
            card: {
              vendorCode: creditCardTypeState.shortCode === "" ? "VI" : creditCardTypeState.shortCode,
              cardNumber: paymentFormData.cardNumber.split(" ").join(""),
              expiryDate: paymentFormData.expDate
            }
          }
        ]
      }
    }));
  };

  const closeModalCallback = () => {
    setModalStatus("none");
    dispatch(changeHotelBookingStatus("none"));
    if (modalStatus === "completed" && hotelBookingsResponse && hotelBookingsResponse.data.length > 0) {
      navigation.navigate("paymentComplete" as any, { bookingId: hotelBookingsResponse?.data[0].id });
    }
  };

  /* Bottom Snackbar start */
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const onToggleSnackBar = (message: string) => {
    setSnackbarVisible(!snackbarVisible);
    setSnackbarMessage(message)
  }
  const onDismissSnackBar = () => setSnackbarVisible(false);
  /* Bottom Snackbar end */

  useEffect(()=>{
    if (hotelBookingStatus === "loading") {
      setModalStatus("loading");
      if (hotelBookingsRequest) {
        dispatch(amadeusHotelBookingThunk(hotelBookingsRequest));
      }
    } else if (hotelBookingStatus === "completed") {
      setModalStatus("completed");
      if (signInResult &&
        hotelListAndOffersResponse &&
        hotelBookingsRequest &&
        hotelBookingsResponse
      ) {
        dispatch(saveHotelBookingThunk({
          username: signInResult.username,
          hotelListAndOffersResponse: hotelListAndOffersResponse.data[0],
          hotelBookingsRequest: hotelBookingsRequest,
          hotelBookingsResponse: hotelBookingsResponse.data[0],
        }));
      }
    } else if (hotelBookingStatus === "failed") {
      setModalStatus("failed");
    }
  }, [hotelBookingStatus, hotelBookingsResponse])


  useEffect(() => {
    console.log("offerId: ", offerId);

    if (hotelListAndOffersResponse) {
      hotelListAndOffersResponse.data.forEach((hotelOfferResponse) => {
        let offer = hotelOfferResponse.offers?.find((offer) => {
          return offer.id === offerId;
        });
        if (offer) {
          console.log('offer price: ', offer.price)
          setHotelOffer(offer);

          // calculate check in and check out date difference to get number of nights
          let checkInDate = offer.checkInDate ? moment(offer.checkInDate, "YYYY-MM-DD") : moment();
          let checkOutDate = offer.checkOutDate ? moment(offer.checkOutDate, "YYYY-MM-DD") : moment();
          let duration = moment.duration(checkOutDate.diff(checkInDate));
          let night = duration.asDays();
          setNights(night);

          // calculate base night price
          let newBasePrice = offer.price.base ?
            parseInt(offer.price.base)
            : offer.price.variations?.average?.base ?
              parseInt(offer.price.variations?.average?.base) * night
              : offer.price.total && offer.price.taxes![0]?.percentage ?
                (parseInt(offer.price.total) - (parseInt(offer.price.total)
                    * parseInt(offer.price.taxes![0].percentage) / 100)
                ) / night
                : 0;

          setBasePrice(newBasePrice);

          // calculate tax percentage
          let tax =
            offer.price.taxes && offer.price.taxes.length > 0 && offer.price.taxes[0].percentage && offer.price.base
              ? (parseInt(offer.price.taxes![0]?.percentage) / 100) *
                parseInt(offer.price.base)
              : offer.price.total && offer.price.base
              ? parseInt(offer.price.total) - parseInt(offer.price.base)
              : 0;

          setServiceOrTax(tax);
        }
      });
    }
  }, [hotelListAndOffersResponse]);

  return (
    <SafeAreaView style={PAYMENT_SCREEN}>

      {/* Header Row Back Button */}
      <View style={PAYMENT_SCREEN_HEADER_ROW}>
        <View style={{...PAYMENT_SCREEN_BACK_BUTTON, width: "20%"}}>
          <TouchableHighlight
            //   onPress={() => navigation.goBack()}
            underlayColor={"transparent"}>
            <ButtonWithColorBg
              size={25}
              color={colors.black}
              iconName={"chevron-left"}
              iconProvider={"Entypo"}
              backgroundColor={colors.white}
              onPress={() => navigation.goBack()}
            />
          </TouchableHighlight>
        </View>
        <View style={{...PAYMENT_SCREEN_TITLE, width: "60%"}}>
          <PaperText style={PAYMENT_SCREEN_TITLE_TEXT}>
            {carouselIndex == 0
              ? "PAYMENT METHODS"
              : carouselIndex == 1
                ? "ADD PAYMENT CARD"
                : carouselIndex == 2
                  ? "ADD CONTACT"
                  : "CONFIRM PAYMENT"}
          </PaperText>
        </View>
        <View style={{ width: "20%" }} />
      </View>


      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        style={PAYMENT_SCREEN_BOTTOM_SHEET}
        handleComponent={null}>
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
          renderItem={({index, animationValue}) => {
            switch (index) {
              case 0:
                // Payment Methods
                return (
                  <View style={{height: "100%"}}>
                    {/* My Payment Methods Upper Part */}
                    <PaperText style={PAYMENT_SCREEN_PAYMENT_METHOD_TITLE}>
                      My Payment Methods
                    </PaperText>

                    <View style={PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER}>
                      {/* My Payment Methods Container */}
                      <View style={PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_ROW}>
                        <View
                          style={
                            PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_ROW_LEFT_COLUMN
                          }>
                          {/* Default Apple / Google Pay */}
                          {Platform.OS === "ios" ? (
                            <View
                              style={
                                PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_TEXT_VIEW
                              }>
                              <FontAwesome5Icon name={"apple"} size={18} />
                              <PaperText
                                style={
                                  PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_TEXT
                                }
                                numberOfLines={3}
                                ellipsizeMode="tail">
                                Apple Pay
                              </PaperText>
                            </View>
                          ) : (
                            <View
                              style={
                                PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_TEXT_VIEW
                              }>
                              <FontAwesome5Icon name={"google"} size={18} />
                              <PaperText
                                style={
                                  PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_TEXT
                                }
                                numberOfLines={3}
                                ellipsizeMode="tail">
                                Google Pay
                              </PaperText>
                            </View>
                          )}
                        </View>

                        <View
                          style={{flexDirection: "row", alignItems: "center"}}>
                          <PaperText
                            style={{color: colors.mint, fontWeight: "bold"}}>
                            DEFAULT
                          </PaperText>
                        </View>
                      </View>
                    </View>

                    <PaperDivider
                      style={PAYMENT_SCREEN_PAYMENT_METHOD_DIVIDER_LINE}
                    />

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
                        underlayColor={"transparent"}>
                        <View
                          style={PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_ROW}>
                          <View
                            style={
                              PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_ROW_LEFT_COLUMN
                            }>
                            {/* Add Credit Card Title */}
                            <View
                              style={
                                PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_TEXT_VIEW
                              }>
                              <FontAwesome5Icon
                                name={"credit-card"}
                                size={18}
                              />
                              <PaperText
                                style={
                                  PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_TEXT
                                }
                                numberOfLines={3}
                                ellipsizeMode="tail">
                                Add Credit Card
                              </PaperText>
                            </View>
                          </View>

                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}>
                            <MaterialIcon
                              name={"arrow-forward-ios"}
                              size={18}
                              color={colors.grey}
                            />
                          </View>
                        </View>
                      </TouchableHighlight>

                      <PaperDivider
                        style={PAYMENT_SCREEN_PAYMENT_METHOD_DIVIDER_LINE}
                      />

                      {/* Add Paypal Container */}
                      <View style={PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_ROW}>
                        <View
                          style={
                            PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_ROW_LEFT_COLUMN
                          }>
                          {/* Add Paypal */}
                          <View
                            style={
                              PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_TEXT_VIEW
                            }>
                            <FontAwesome5Icon name={"paypal"} size={18} />
                            <PaperText
                              style={
                                PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_TEXT
                              }
                              numberOfLines={3}
                              ellipsizeMode="tail">
                              Paypal
                            </PaperText>
                          </View>
                        </View>

                        <View
                          style={{flexDirection: "row", alignItems: "center"}}>
                          <MaterialIcon
                            name={"arrow-forward-ios"}
                            size={18}
                            color={colors.grey}
                          />
                        </View>
                      </View>

                      <PaperDivider
                        style={PAYMENT_SCREEN_PAYMENT_METHOD_DIVIDER_LINE}
                      />

                      {/* Add Alipay Container */}
                      <View style={PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_ROW}>
                        <View
                          style={
                            PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_ROW_LEFT_COLUMN
                          }>
                          {/* Add Alipay */}
                          <View
                            style={
                              PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_TEXT_VIEW
                            }>
                            <FontAwesome5Icon name={"alipay"} size={18} />
                            <PaperText
                              style={
                                PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_TEXT
                              }
                              numberOfLines={3}
                              ellipsizeMode="tail">
                              Alipay
                            </PaperText>
                          </View>
                        </View>

                        <View
                          style={{flexDirection: "row", alignItems: "center"}}>
                          <MaterialIcon
                            name={"arrow-forward-ios"}
                            size={18}
                            color={colors.grey}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                );
              case 1:
                // Add Payment Card
                return (
                  <View style={{height: "100%"}}>
                    {/* Card Holder Row */}
                    <View>
                      <View style={PAYMENT_SCREEN_INPUT_TITLE}>
                        <PaperText style={PAYMENT_SCREEN_INPUT_TITLE_TEXT}>
                          Card Holder
                        </PaperText>
                      </View>

                      <FormController
                        control={paymentControl}
                        name="cardHolderName"
                        defaultValue=""
                        rules={{
                          required: {
                            message: ERROR_MESSAGES.REQUIRED,
                            value: true,
                          },
                          pattern: {
                            value: REGEXP.cardHolderName,
                            message: ERROR_MESSAGES.CARD_HOLDER_NAME_INVALID,
                          },
                        }}
                        render={({field: {onChange, onBlur, value, ref}}) => (
                          <View style={PAYMENT_SCREEN_INPUT_VIEW}>
                            <PaperTextInput
                              ref={ref}
                              // label={"cardHolderName"}
                              right={
                                <PaperTextInput.Icon icon="camera" size={18} />
                              }
                              value={value}
                              onChangeText={value => {
                                onChange(value);
                              }}
                              placeholder={"Enter cardholder's Name"}
                              autoCapitalize="none"
                              onBlur={onBlur}
                              mode={"outlined"}
                              returnKeyType={"done"}
                              selectionColor={colors.mint}
                              outlineColor={"transparent"}
                              activeOutlineColor={colors.mint}
                              style={PAYMENT_SCREEN_INPUT}
                              // underlineColor={"transparent"}
                              // activeUnderlineColor={colors.mint}
                              error={
                                paymentFormState.errors.cardHolderName && true
                              }
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
                        <PaperText style={PAYMENT_SCREEN_INPUT_TITLE_TEXT}>
                          Card Number
                        </PaperText>
                      </View>
                      <FormController
                        control={paymentControl}
                        name="cardNumber"
                        // defaultValue={}
                        rules={{
                          required: {
                            message: ERROR_MESSAGES.REQUIRED,
                            value: true,
                          },
                          pattern: {
                            value: REGEXP.cardNumber,
                            message: ERROR_MESSAGES.CARD_NUMBER_INVALID,
                          },
                        }}
                        render={({field: {onChange, onBlur, value, ref}}) => (
                          <View style={PAYMENT_SCREEN_INPUT_VIEW}>
                            <PaperTextInput
                              ref={ref}
                              right={
                                <PaperTextInput.Icon name={creditCardTypeState.cardCode} size={18} />
                              }
                              value={value}
                              onChangeText={value => {
                                // change icon of input field if valid
                                let validatedCardType = validateCardNumber(
                                  value,
                                  hotelCreditCardTypes,
                                );
                                if (validatedCardType !== undefined) {
                                  setCreditCardTypeState(validatedCardType);
                                } else {
                                  setCreditCardTypeState(initialCreditCardType);
                                }
                                // onChange(value);

                                // change "42424242" to "4242 4242"
                                let spacedNumberString = value.split(" ").join("");
                                if (spacedNumberString.length > 0) {
                                  spacedNumberString = spacedNumberString.match(new RegExp(".{1,4}", "g"))?.join(" ") ?? value;
                                }
                                onChange(spacedNumberString);
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
                              returnKeyType={"done"}
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
                          <PaperText style={PAYMENT_SCREEN_INPUT_TITLE_TEXT}>
                            Exp.Date
                          </PaperText>
                        </View>
                        <FormController
                          control={paymentControl}
                          name="expDate"
                          defaultValue=""
                          rules={{
                            required: {
                              message: ERROR_MESSAGES.REQUIRED,
                              value: true,
                            },
                            pattern: {
                              value: REGEXP.expDate,
                              message: ERROR_MESSAGES.CARD_EXP_DATE_INVALID,
                            },
                          }}
                          render={({field: {onChange, onBlur, value, ref}}) => (
                            <View style={PAYMENT_SCREEN_INPUT_VIEW}>
                              <PaperTextInput
                                ref={ref}
                                right={
                                  <PaperTextInput.Icon
                                    icon="calendar"
                                    size={18}
                                  />
                                }
                                value={value}
                                onChangeText={value => {
                                  // change "202211" to "2022-11"
                                  let hyphenNumberString = value.split("-").join("");
                                  if (hyphenNumberString.length > 0) {
                                    hyphenNumberString = hyphenNumberString.match(new RegExp(".{1,4}", "g"))?.join("-") ?? value;
                                  }
                                  onChange(hyphenNumberString);
                                  // onChange(value);
                                }}
                                underlineColor={"transparent"}
                                placeholder={"yyyy-MM"}
                                autoCapitalize="none"
                                keyboardType="numbers-and-punctuation"
                                returnKeyType={"done"}
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
                          <PaperText style={PAYMENT_SCREEN_INPUT_TITLE_TEXT}>
                            CVV
                          </PaperText>
                        </View>
                        <FormController
                          control={paymentControl}
                          name="cvv"
                          // defaultValue=""
                          rules={{
                            required: {
                              message: ERROR_MESSAGES.REQUIRED,
                              value: true,
                            },
                            pattern: {
                              message: ERROR_MESSAGES.CARD_CVV_INVALID,
                              value: REGEXP.cvv,
                            },
                          }}
                          render={({field: {onChange, onBlur, value, ref}}) => (
                            <View style={PAYMENT_SCREEN_INPUT_VIEW}>
                              <PaperTextInput
                                ref={ref}
                                right={
                                  <PaperTextInput.Icon
                                    icon="locked"
                                    size={18}
                                  />
                                }
                                value={value}
                                onChangeText={value => onChange(value)}
                                placeholder={"CVV"}
                                maxLength={4}
                                keyboardType="number-pad"
                                returnKeyType={"done"}
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
                        <View
                          style={{
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
                          setPaymentFormData(value);
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
                  <View style={{height: "100%"}}>
                    {/* Title and First Name Row */}
                    <View>
                      <View style={{...PAYMENT_SCREEN_INPUT_TITLE, paddingVertical: dimension.height/1000}}>
                        <PaperText style={PAYMENT_SCREEN_INPUT_TITLE_TEXT}>
                          First Name
                        </PaperText>
                      </View>

                      <FormController
                        control={contactControl}
                        name="firstName"
                        defaultValue=""
                        rules={{
                          required: {
                            message: ERROR_MESSAGES.REQUIRED,
                            value: true,
                          },
                          pattern: {
                            value: REGEXP.name,
                            message: ERROR_MESSAGES.NAME_INVALID,
                          },
                        }}
                        render={({field: {onChange, onBlur, value, ref}}) => (
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
                              returnKeyType={"done"}
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
                      <View style={{...PAYMENT_SCREEN_INPUT_TITLE, paddingVertical: dimension.height/1000}}>
                        <PaperText style={PAYMENT_SCREEN_INPUT_TITLE_TEXT}>
                          Last Name
                        </PaperText>
                      </View>

                      <FormController
                        control={contactControl}
                        name="lastName"
                        defaultValue=""
                        rules={{
                          required: {
                            message: ERROR_MESSAGES.REQUIRED,
                            value: true,
                          },
                          pattern: {
                            value: REGEXP.name,
                            message: ERROR_MESSAGES.NAME_INVALID,
                          },
                        }}
                        render={({field: {onChange, onBlur, value, ref}}) => (
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
                              returnKeyType={"done"}
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
                      <View style={{...PAYMENT_SCREEN_INPUT_TITLE, paddingVertical: dimension.height/1000}}>
                        <PaperText style={PAYMENT_SCREEN_INPUT_TITLE_TEXT}>
                          Email Address
                        </PaperText>
                      </View>

                      <FormController
                        control={contactControl}
                        name="email"
                        defaultValue={signInResult?.email ?? ""}
                        rules={{
                          required: {
                            message: ERROR_MESSAGES.REQUIRED,
                            value: true,
                          },
                          pattern: {
                            value: REGEXP.email,
                            message: ERROR_MESSAGES.EMAIL_ADDRESS_INVALID,
                          },
                        }}
                        render={({field: {onChange, onBlur, value, ref}}) => (
                          <View style={PAYMENT_SCREEN_INPUT_VIEW}>
                            <PaperTextInput
                              ref={ref}
                              // label={"cardHolderName"}
                              right={
                                <PaperTextInput.Icon icon="email" size={18} />
                              }
                              value={value}
                              onChangeText={value => {
                                onChange(value);
                              }}
                              placeholder={"Enter your email address"}
                              autoCapitalize="none"
                              onBlur={onBlur}
                              returnKeyType={"done"}
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
                      <View style={{...PAYMENT_SCREEN_INPUT_TITLE, paddingVertical: dimension.height/1000}}>
                        <PaperText style={PAYMENT_SCREEN_INPUT_TITLE_TEXT}>
                          Phone Number
                        </PaperText>
                      </View>

                      <FormController
                        control={contactControl}
                        name="phoneNumber"
                        defaultValue=""
                        rules={{
                          required: {
                            message: ERROR_MESSAGES.REQUIRED,
                            value: true,
                          },
                          pattern: {
                            value: REGEXP.phoneNumber,
                            message: ERROR_MESSAGES.PHONE_NUMBER_INVALID,
                          },
                        }}
                        render={({field: {onChange, onBlur, value, ref}}) => (
                          <View style={PAYMENT_SCREEN_INPUT_VIEW}>
                            <PaperTextInput
                              ref={ref}
                              // label={"cardHolderName"}
                              right={
                                <PaperTextInput.Icon
                                  icon="mobile-alt"
                                  size={18}
                                />
                              }
                              value={value}
                              onChangeText={value => {
                                onChange(value);
                              }}
                              placeholder={"Enter your phone number"}
                              autoCapitalize="none"
                              onBlur={onBlur}
                              mode={"outlined"}
                              returnKeyType={"done"}
                              selectionColor={colors.mint}
                              outlineColor={"transparent"}
                              activeOutlineColor={colors.mint}
                              style={PAYMENT_SCREEN_INPUT}
                              keyboardType={"phone-pad"}
                              // underlineColor={"transparent"}
                              // activeUnderlineColor={colors.mint}
                              error={
                                contactFormState.errors.phoneNumber && true
                              }
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
                        <View
                          style={{
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
                  <View style={{height: "100%"}}>
                    <View style={HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_CONTAINER}>
                      {/* Room Title and Image Row */}
                      <View
                        style={HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_FIRST_ROW}>
                        <View
                          style={
                            HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_FIRST_ROW_LEFT_COLUMN
                          }>
                          {/* Room Name */}
                          <View>
                            <PaperText
                              style={HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_TEXT}
                              numberOfLines={1}
                              ellipsizeMode="tail"
                            >
                              {capitalizeString(hotelOffer?.room.typeEstimated?.category ?? "Room")}
                            </PaperText>
                          </View>

                          {/* Room Attribute 1 */}
                          <View>
                            <PaperText
                              style={HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_SUBTEXT}
                              numberOfLines={2}
                              ellipsizeMode="tail"
                            >
                              Adults: {hotelOffer?.guests?.adults ?? 0}
                            </PaperText>
                          </View>
                          {/* Room Attribute 2 */}
                          <View>
                            <PaperText
                              style={HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_SUBTEXT}
                              numberOfLines={3}
                              ellipsizeMode="tail"
                            >
                              {capitalizeString(hotelOffer?.room.description?.text ?? "")}
                            </PaperText>
                          </View>
                        </View>

                        <View style={{width: "30%", flexDirection: "row", justifyContent: "center"}}>
                          <Image
                            style={HOTEL_ROOM_SELECT_SCREEN_IMAGE}
                            source={
                              hotelOffer?.roomImageFilePath ? {uri: hotelOffer.roomImageFilePath} :
                                require("@travelasset/images/crown-hotel.jpeg")
                            }
                          />
                        </View>
                      </View>

                      <PaperDivider
                        style={HOTEL_ROOM_SELECT_SCREEN_DIVIDER_LINE}
                      />

                      {/* Check in Row */}
                      <View style={HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_THIRD_ROW}>
                        {/* Check in text */}
                        <View style={{ flexGrow: 1 }}>
                          <PaperText style={HOTEL_ROOM_SELECT_SCREEN_PRICE_TEXT}>
                            Check - in:
                          </PaperText>
                        </View>

                        {/* Check in date */}
                        <View style={{ flexGrow: 1 }}>
                          <PaperText style={{
                            ...HOTEL_ROOM_SELECT_SCREEN_PRICE_TEXT,
                            fontWeight: "bold",
                            textAlign: "right",
                          }}>
                            {hotelOffer?.checkInDate}
                          </PaperText>
                        </View>
                      </View>

                      {/* Check out Row */}
                      <View style={{ ...HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_THIRD_ROW, paddingTop: 0 }}>
                        {/* Check out text */}
                        <View style={{ flexGrow: 1 }}>
                          <PaperText style={HOTEL_ROOM_SELECT_SCREEN_PRICE_TEXT}>
                            Check - out:
                          </PaperText>
                        </View>

                        {/* Check in date */}
                        <View style={{ flexGrow: 1 }}>
                          <PaperText style={{
                            ...HOTEL_ROOM_SELECT_SCREEN_PRICE_TEXT,
                            fontWeight: "bold",
                            textAlign: "right",
                          }}>
                            {hotelOffer?.checkOutDate}
                          </PaperText>
                        </View>
                      </View>
                    </View>

                    <View style={HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_CONTAINER}>

                      {/* Nights and Room Fee Row */}
                      <View style={HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_THIRD_ROW}>
                        {/* Nights text */}
                        <View style={{ flexGrow: 1 }}>
                          <PaperText style={HOTEL_ROOM_SELECT_SCREEN_PRICE_TEXT}>
                            {nights} Night(s)
                          </PaperText>
                        </View>

                        {/* Nights base */}
                        <View style={{ flexGrow: 1 }}>
                          <PaperText style={{
                            ...HOTEL_ROOM_SELECT_SCREEN_PRICE_TEXT,
                            fontWeight: "bold",
                            textAlign: "right",
                          }}>
                            {hotelOffer?.price.currency} {basePrice}
                          </PaperText>
                        </View>
                      </View>

                      {/* Service and Tax Row */}
                      <View style={{ ...HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_THIRD_ROW, paddingTop: 0 }}>
                        {/* Service and Tax text */}
                        <View style={{ flexGrow: 1 }}>
                          <PaperText style={HOTEL_ROOM_SELECT_SCREEN_PRICE_TEXT}>
                            Service(Taxes & fees):
                          </PaperText>
                        </View>

                        {/* Service and Tax */}
                        <View style={{ flexGrow: 1 }}>
                          <PaperText style={{
                            ...HOTEL_ROOM_SELECT_SCREEN_PRICE_TEXT,
                            fontWeight: "bold",
                            textAlign: "right",
                          }}>
                            {hotelOffer?.price.currency} {serviceOrTax}
                          </PaperText>
                        </View>
                      </View>

                      <PaperDivider style={PAYMENT_SCREEN_PAYMENT_METHOD_DIVIDER_LINE} />

                      {/* Total Row */}
                      <View style={HOTEL_ROOM_SELECT_SCREEN_FLAT_LIST_THIRD_ROW}>
                        {/* Total text */}
                        <View style={{ flexGrow: 1 }}>
                          <PaperText style={{...HOTEL_ROOM_SELECT_SCREEN_PRICE_TEXT, fontSize: 16}}>
                            Total
                          </PaperText>
                        </View>

                        {/* Total price */}
                        <View style={{ flexGrow: 1 }}>
                          <PaperText style={{
                            ...HOTEL_ROOM_SELECT_SCREEN_PRICE_TEXT,
                            fontWeight: "bold",
                            textAlign: "right",
                            fontSize: 16
                          }}>
                            {hotelOffer?.price.currency} {hotelOffer?.price.total}
                          </PaperText>
                        </View>
                      </View>

                    </View>

                    <View style={PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER}>
                      {/* Added Payment Method Container */}
                      <View style={PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_ROW}>
                        <View style={PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_ROW_LEFT_COLUMN}>
                            <View style={PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_TEXT_VIEW}>
                              <FontistoIcon name={creditCardTypeState.cardCode} size={18} />
                              <PaperText
                                style={PAYMENT_SCREEN_PAYMENT_METHOD_CONTAINER_TEXT}
                                numberOfLines={3}
                                ellipsizeMode="tail"
                              >
                                {creditCardTypeState.cardName}
                              </PaperText>
                            </View>
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                          <PaperText style={{ color: colors.mint, fontWeight: "bold" }}>CREDIT CARD</PaperText>
                        </View>
                      </View>
                    </View>

                    <KeyboardAvoidingView
                      // behavior={Platform.OS === "ios" ? "padding" : "height"}
                      keyboardVerticalOffset={20}
                      style={{...PAYMENT_SCREEN_BOTTOM_BUTTON_ROW_WRAPPER, bottom: dimension.height/13}}>
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
                        <View
                          style={{
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
                          hotelBookingApiCall();
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

      {/* Error Snackbar for not fulfilling the form fields */}
      <PaperSnackbar
        style={{
          backgroundColor: colors.red
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
        {snackbarMessage}
      </PaperSnackbar>

      {/* Modal when loading */}
      <PaperPortal>
        <PaperModal
          visible={
            modalStatus === "loading" ||
            modalStatus === "completed" ||
            modalStatus === "failed"
          }
          onDismiss={closeModalCallback}
          contentContainerStyle={HOTEL_SCREEN_MODAL_CONTENT_CONTAINER}>
          <View
            style={HOTEL_SCREEN_MODAL_CONTENT_VIEW}>
            {/* Image */}
            <View
              style={{
                height: "40%",
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
              }}>
              <Image
                source={
                  modalStatus === "loading" ?
                    require("@travelasset/images/loading.jpeg") :
                    modalStatus === "completed" ?
                      require("@travelasset/images/success.jpeg") :
                      modalStatus === "failed" ?
                        require("@travelasset/images/fail.jpeg") : undefined
                }
                style={{
                  height: dimension.width/2,
                  width: dimension.width/2,
                }}
                resizeMode="cover"
              />
            </View>
            <View>
              <PaperText style={{fontSize: 32, textAlign: "center"}}>
                { modalStatus === "loading" ?  "Booking Selected Hotel Offer..." :
                  modalStatus === "completed" ? "Successfully Booked Hotel Offer !" :
                    modalStatus === "failed" ? "Cannot Book Hotel Offer ..." : ""
                }
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
