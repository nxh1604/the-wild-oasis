import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingAPI } from "../../../services/apiBookings";

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteBooking, isLoading: isDeleting } = useMutation({
    mutationFn: (bookingId: number | string) => deleteBookingAPI(bookingId),
    onSuccess: async ({ id }) => {
      console.log("successfully deleted booking");
      alert(`successfully delete booking ID: ${id}`);
      await queryClient.invalidateQueries(["bookings"]);
    },
    onError: () => {
      console.log("can not deleted booking");
      alert(`can not delete selected booking`);
    },
  });

  return { deleteBooking, isDeleting };
};
