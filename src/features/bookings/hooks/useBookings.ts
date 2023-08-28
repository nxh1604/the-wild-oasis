import { useQuery } from "@tanstack/react-query";
import { getAllBookings } from "../../../services/apiBookings/apiBookings";

export const useBookings = () => {
  const { data: bookings } = useQuery({
    queryKey: ["bookings"],
    queryFn: getAllBookings,
  });

  return { bookings };
};
