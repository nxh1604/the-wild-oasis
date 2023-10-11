import { QueryClient } from "@tanstack/react-query";
import { LoaderFunctionArgs, defer } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

export const loader =
  (queryClient: QueryClient) =>
  ({ params }: LoaderFunctionArgs) => {
    const { bookingId } = params;
    if (!bookingId) return null;

    return defer({
      booking: queryClient.ensureQueryData({
        queryKey: ["booking", bookingId],
        queryFn: () => getBooking(bookingId),
      }),
    });
  };
