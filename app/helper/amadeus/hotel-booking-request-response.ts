// Request
export interface HotelBookingsRequest {
  data: {
    offerId: string
    guests: HotelBookingsStakeholder[]
    payments: HotelBookingsPayment[]
    rooms?: [
      {
        guestIds?: number[]
        paymentId?: number,
        specialRequest?: string
      }
    ]
  };
}

export interface HotelBookingsStakeholder {
  id?: number;
  name: HotelBookingsName;
  contact: HotelBookingsContact;
  hotelRewardsMember?: string;
}

export interface HotelBookingsName {
  title?: string
  firstName: string
  lastName: string
}

export interface HotelBookingsContact {
  phone: string
  email: string
}

export interface HotelBookingsPayment {
  id?: number
  method: string
  card?: HotelBookingsPaymentCard
}

export interface HotelBookingsPaymentCard {
  vendorCode: string
  cardNumber: string
  expiryDate: string
}

// Response
export interface HotelBookingsResponse {
  status: number | string;
  data: Array<HotelBookingsResponseData>;
}

export interface HotelBookingsResponseData {
  type: string
  id: string
  providerConfirmationId: string
  self?: string
  associatedRecords: {
    reference: string
    originSystemCode: string
  }[]
}
