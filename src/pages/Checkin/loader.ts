import { QueryClient } from "@tanstack/react-query";
import { LoaderFunctionArgs } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const { bookingId } = params;
    if (!bookingId) return null;

    await queryClient.ensureQueryData({
      queryKey: ["booking", bookingId],
      queryFn: () => getBooking(bookingId),
    });

    return null;
  };
