import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking as toUpdateBooking } from "../../../services/apiBookings";

export const useUpdateBooking = () => {
  const queryClient = useQueryClient();

  const { mutate: updateBooking, isLoading: isUpdating } = useMutation({
    mutationFn: ({
      bookingId,
      bookingUpdate,
    }: {
      bookingId: number | string;
      bookingUpdate: Partial<IBookingData<null, null>>;
    }) => toUpdateBooking(bookingId, bookingUpdate),
    onSuccess: async () => {
      alert("update booking successfully");
      await queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: () => {
      alert("update booking failed");
    },
  });
  return { updateBooking, isUpdating };
};
