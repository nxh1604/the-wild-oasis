import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export const useCheckout = () => {
  const queryClient = useQueryClient();

  const { mutate: updateCheckout, isLoading: loadingUpdate } = useMutation({
    mutationFn: ({ bookingId }: { bookingId: number | string }) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: async (data) => {
      if (!data) {
        return;
      }

      toast.success(`successfully updated booking ${data.id}`);
      await queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: () => {
      toast.error("failed to checked-out guest");
    },
  });

  return { updateCheckout, loadingUpdate };
};
