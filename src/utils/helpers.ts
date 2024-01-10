import { formatDistance, parseISO } from "date-fns";
import { differenceInDays } from "date-fns/esm";

export const subtractDates = (dateStr1: Date | string, dateStr2: Date | string) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr: Date | string) =>
  formatDistance(parseISO(dateStr as string), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");

export const getToday = function (options: { end?: boolean } = {}) {
  const today = new Date();
  if (options?.end) {
    today.setUTCHours(23, 59, 59, 999);
  } else today.setUTCHours(0, 0, 0, 0);
  // console.log(today);
  return today.toISOString();
};

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(value);
