import { PostgrestMaybeSingleResponse, PostgrestResponse } from "@supabase/supabase-js";
import { getToday } from "../../utils/helpers";
import supabase from "../supaBase";
import { PAGE_SIZE } from "../../utils/constant";

export const getAllBookings = async ({
  filters,
  sort,
  page,
}: {
  filters:
    | ""
    | null
    | false
    | Array<{
        field: string;
        value: unknown;
        method: "eq" | "gt" | "lt" | "lte" | "gte" | "is" | "neq";
      }>;
  sort: {
    field: string;
    direction: string;
  };
  page: number;
}) => {
  let query = supabase.from("bookings").select(
    `
    *,
    cabins (
      name
    ),
    guests (
      fullName,email
    )
  `,
    { count: "exact" }
  );
  if (filters) {
    const arrayMethod = ["eq", "gt", "lt", "lte", "gte", "is", "neq"] as const;
    filters.forEach((filter) => {
      if (!arrayMethod.includes(filter.method)) throw new Error("invalid filther method");

      query = query[filter.method](filter.field, filter.value);
    });
  }

  if (sort) {
    query = query.order(sort.field, {
      ascending: sort.direction === "asc",
    });
  }

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    query = query.range(from, to);
  }
  const { data, error, count } = (await query) as PostgrestResponse<
    IBookingData<Pick<ICabinData, "name">, Pick<IGuestData, "fullName" | "email">>
  >;

  if (error) {
    console.error(error);
    throw new Error("Bookings not found");
  }

  return { data, count };
};

export async function getBooking(id: number | string) {
  const { data, error } = (await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single()) as PostgrestMaybeSingleResponse<IBookingData<ICabinData, IGuestData>>;

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

export async function getBookingsAfterDate(date: string) {
  const { data, error } = (await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }))) as PostgrestResponse<
    Pick<IBookingData<null, null>, "created_at" | "totalPrice" | "extrasPrice">
  >;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

export async function getStaysAfterDate(date: string) {
  const { data, error } = (await supabase
    .from("bookings")
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday())) as PostgrestResponse<
    IBookingData<null, Pick<IGuestData, "fullName">>
  >;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

export async function getStaysTodayActivity() {
  const { data, error } = (await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at")) as PostgrestResponse<
    IBookingData<null, Pick<IGuestData, "fullName" | "nationality" | "countryFlag">>
  >;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id: number | string, obj: Partial<IBookingData<null, null>>) {
  const { data, error } = (await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single()) as PostgrestMaybeSingleResponse<IBookingData<null, null>>;

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id: number | string) {
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return { data, id };
}
