/// <reference types="vite/client" />

declare module "uuid";

declare interface ICabinData {
  id?: number;
  created_at?: Date;
  name: string;
  regularPrice: number | "";
  maxCapacity: number | "";
  discount: number | "";
  description: string;
  image: string | File;
}

declare interface IBookingData<CabinType, GuestType> {
  id: number;
  created_at: Date;
  startDate: Date;
  endDate: Date;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status: "unconfirmed" | "checked-out" | "checked-in";
  isPaid: boolean;
  observations: string;
  cabinId: CabinType;
  guestId: GuestType;
  hasBreakfast: boolean;
}

declare interface ISettingData {
  id: number;
  created_at: Date;
  minBookLength: number;
  maxBookLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
}

declare interface IGuestData {
  id: number;
  created_at: Date;
  fullName: string;
  email: string;
  nationality: string;
  countryFlag: string;
  nationalID: number;
}
