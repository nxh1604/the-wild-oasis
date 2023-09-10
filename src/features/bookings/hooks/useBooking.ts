import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../../services/apiBookings";

export const useBooking = (bookingId?: number | string) => {
  if (!bookingId) throw new Error("can't get booking without it's Id");

  const { data: booking, isLoading } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });

  return { booking, isLoading };
};
