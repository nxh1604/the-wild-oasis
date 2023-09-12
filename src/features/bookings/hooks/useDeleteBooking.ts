import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingAPI } from "../../../services/apiBookings";
import toast from "react-hot-toast";

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteBooking, isLoading: isDeleting } = useMutation({
    mutationFn: (bookingId: number | string) => deleteBookingAPI(bookingId),
    onSuccess: async ({ id }) => {
      toast.success(`successfully delete booking ID: ${id}`);
      await queryClient.invalidateQueries(["bookings"]);
    },
    onError: () => {
      toast.error(`can not delete selected booking`);
    },
  });

  return { deleteBooking, isDeleting };
};
