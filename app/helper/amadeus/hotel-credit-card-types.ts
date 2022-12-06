export interface HotelCreditCardType {
  cardCode: string
  cardName: string
  shortCode: string
  regExp: RegExp
}

export const hotelCreditCardTypes: Array<HotelCreditCardType> = [
  { cardCode: "visa", cardName: "Visa", shortCode: "VI", regExp: /^4[0-9]{12}(?:[0-9]{3})?$/},
  { cardCode: "mastercard", cardName: "MasterCard", shortCode: "CA", regExp: /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/},
  { cardCode: "discover", cardName: "Discover", shortCode: "DS", regExp: /(^6(?:011|5[0-9]{2})[0-9]{12}$)/},
  { cardCode: "american-express", cardName: "American Express", shortCode: "AX", regExp: /(^3(?:0[0-5]|[68][0-9])[0-9]{11}$)/},
  { cardCode: "cc-diners-club", cardName: "Diners Club", shortCode: "DC", regExp: /(3(?:0[0-5]|[68][0-9])0-9]{11})/},
  { cardCode: "jcb", cardName: "JCB", shortCode: "JC", regExp: /((?:2131|1800|35[0-9]{3})[0-9]{11})/},
]
