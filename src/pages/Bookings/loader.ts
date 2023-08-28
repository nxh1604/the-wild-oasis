import { QueryClient } from "@tanstack/react-query";
import { defer } from "react-router-dom";
import { getAllBookings } from "../../services/apiBookings";

export const loader = (queryClient: QueryClient) => () => {
  return defer({
    bookings: queryClient.ensureQueryData({
      queryKey: ["bookings"],
      queryFn: getAllBookings,
    }),
  });
};
