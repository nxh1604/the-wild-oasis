import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking as toUpdateBooking } from "../../../services/apiBookings";
import toast from "react-hot-toast";

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
      toast.success("update booking successfully");
      await queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: () => {
      toast.error("update booking failed");
    },
  });
  return { updateBooking, isUpdating };
};
