import { ModelInit, MutableModel, __modelMeta__, CustomIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";



type EagerHotelBookingsStakeholder = {
  readonly title?: string | null;
  readonly firstName: string;
  readonly lastName: string;
  readonly phone: string;
  readonly email: string;
}

type LazyHotelBookingsStakeholder = {
  readonly title?: string | null;
  readonly firstName: string;
  readonly lastName: string;
  readonly phone: string;
  readonly email: string;
}

export declare type HotelBookingsStakeholder = LazyLoading extends LazyLoadingDisabled ? EagerHotelBookingsStakeholder : LazyHotelBookingsStakeholder

export declare const HotelBookingsStakeholder: (new (init: ModelInit<HotelBookingsStakeholder>) => HotelBookingsStakeholder)

type EagerHotelBookingsPayment = {
  readonly method: string;
  readonly cardVendorCode?: string | null;
  readonly cardNumber?: string | null;
  readonly expiryDate?: string | null;
}

type LazyHotelBookingsPayment = {
  readonly method: string;
  readonly cardVendorCode?: string | null;
  readonly cardNumber?: string | null;
  readonly expiryDate?: string | null;
}

export declare type HotelBookingsPayment = LazyLoading extends LazyLoadingDisabled ? EagerHotelBookingsPayment : LazyHotelBookingsPayment

export declare const HotelBookingsPayment: (new (init: ModelInit<HotelBookingsPayment>) => HotelBookingsPayment)

type EagerHotel = {
  readonly hotelId?: string | null;
  readonly name?: string | null;
  readonly cityCode?: string | null;
  readonly chainCode?: string | null;
  readonly dupeId?: string | null;
  readonly latitude?: number | null;
  readonly longitude?: number | null;
  readonly brandCode?: string | null;
  readonly rating?: number | null;
}

type LazyHotel = {
  readonly hotelId?: string | null;
  readonly name?: string | null;
  readonly cityCode?: string | null;
  readonly chainCode?: string | null;
  readonly dupeId?: string | null;
  readonly latitude?: number | null;
  readonly longitude?: number | null;
  readonly brandCode?: string | null;
  readonly rating?: number | null;
}

export declare type Hotel = LazyLoading extends LazyLoadingDisabled ? EagerHotel : LazyHotel

export declare const Hotel: (new (init: ModelInit<Hotel>) => Hotel)

type EagerHotelOffer = {
  readonly offerId?: string | null;
  readonly checkInDate?: string | null;
  readonly checkOutDate?: string | null;
  readonly rateCode?: string | null;
  readonly roomCategory?: string | null;
  readonly roomQuantity?: string | null;
  readonly roomBeds?: number | null;
  readonly roomBedType?: string | null;
  readonly roomDescription?: string | null;
  readonly adults?: number | null;
  readonly commissionPercentage?: number | null;
  readonly commissionAmount?: number | null;
  readonly boardType?: string | null;
  readonly priceCurrency?: string | null;
  readonly priceBase?: number | null;
  readonly priceTotal?: number | null;
  readonly priceSellingTotal?: number | null;
  readonly priceTaxes?: (HotelOfferTax | null)[] | null;
  readonly priceMarkup?: number | null;
  readonly priceVariationAverageBase?: number | null;
  readonly priceVariationAverageTotal?: number | null;
}

type LazyHotelOffer = {
  readonly offerId?: string | null;
  readonly checkInDate?: string | null;
  readonly checkOutDate?: string | null;
  readonly rateCode?: string | null;
  readonly roomCategory?: string | null;
  readonly roomQuantity?: string | null;
  readonly roomBeds?: number | null;
  readonly roomBedType?: string | null;
  readonly roomDescription?: string | null;
  readonly adults?: number | null;
  readonly commissionPercentage?: number | null;
  readonly commissionAmount?: number | null;
  readonly boardType?: string | null;
  readonly priceCurrency?: string | null;
  readonly priceBase?: number | null;
  readonly priceTotal?: number | null;
  readonly priceSellingTotal?: number | null;
  readonly priceTaxes?: (HotelOfferTax | null)[] | null;
  readonly priceMarkup?: number | null;
  readonly priceVariationAverageBase?: number | null;
  readonly priceVariationAverageTotal?: number | null;
}

export declare type HotelOffer = LazyLoading extends LazyLoadingDisabled ? EagerHotelOffer : LazyHotelOffer

export declare const HotelOffer: (new (init: ModelInit<HotelOffer>) => HotelOffer)

type EagerHotelOfferTax = {
  readonly code?: string | null;
  readonly amount?: number | null;
  readonly currency?: string | null;
  readonly included?: boolean | null;
  readonly percentage?: number | null;
  readonly description?: string | null;
  readonly pricingFrequency?: string | null;
  readonly pricingMode?: string | null;
}

type LazyHotelOfferTax = {
  readonly code?: string | null;
  readonly amount?: number | null;
  readonly currency?: string | null;
  readonly included?: boolean | null;
  readonly percentage?: number | null;
  readonly description?: string | null;
  readonly pricingFrequency?: string | null;
  readonly pricingMode?: string | null;
}

export declare type HotelOfferTax = LazyLoading extends LazyLoadingDisabled ? EagerHotelOfferTax : LazyHotelOfferTax

export declare const HotelOfferTax: (new (init: ModelInit<HotelOfferTax>) => HotelOfferTax)

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: CustomIdentifier<User, 'username'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly username: string;
  readonly email: string;
  readonly emailVerified: boolean;
  readonly name: string;
  readonly authProvider?: string | null;
  readonly phoneNumber?: string | null;
  readonly image?: string | null;
  readonly hotelOrder?: (HotelBooking | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: CustomIdentifier<User, 'username'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly username: string;
  readonly email: string;
  readonly emailVerified: boolean;
  readonly name: string;
  readonly authProvider?: string | null;
  readonly phoneNumber?: string | null;
  readonly image?: string | null;
  readonly hotelOrder: AsyncCollection<HotelBooking>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerHotelBooking = {
  readonly [__modelMeta__]: {
    identifier: CustomIdentifier<HotelBooking, 'bookingId'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly username: string;
  readonly user: User;
  readonly bookingId: string;
  readonly providerConfirmationId: string;
  readonly associatedRecordReference?: string | null;
  readonly guests?: (HotelBookingsStakeholder | null)[] | null;
  readonly payments?: (HotelBookingsPayment | null)[] | null;
  readonly hotel: Hotel;
  readonly offer: HotelOffer;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyHotelBooking = {
  readonly [__modelMeta__]: {
    identifier: CustomIdentifier<HotelBooking, 'bookingId'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly username: string;
  readonly user: AsyncItem<User>;
  readonly bookingId: string;
  readonly providerConfirmationId: string;
  readonly associatedRecordReference?: string | null;
  readonly guests?: (HotelBookingsStakeholder | null)[] | null;
  readonly payments?: (HotelBookingsPayment | null)[] | null;
  readonly hotel: Hotel;
  readonly offer: HotelOffer;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type HotelBooking = LazyLoading extends LazyLoadingDisabled ? EagerHotelBooking : LazyHotelBooking

export declare const HotelBooking: (new (init: ModelInit<HotelBooking>) => HotelBooking) & {
  copyOf(source: HotelBooking, mutator: (draft: MutableModel<HotelBooking>) => MutableModel<HotelBooking> | void): HotelBooking;
}