import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";

export const useCheckout = () => {
  const queryClient = useQueryClient();

  const { mutate: updateCheckout, isLoading: loadingUpdate } = useMutation({
    mutationFn: ({ bookingId }: { bookingId: number | string }) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: async (data) => {
      if (!data) {
        console.log("successfully update null");
        return;
      }

      alert(`successfully updated booking ${data.id}`);
      await queryClient.invalidateQueries({
        queryKey: ["booking", data.id],
      });
    },
    onError: () => {
      console.log("failed to checked-out guest");
      alert("failed to checked-out guest");
    },
  });

  return { updateCheckout, loadingUpdate };
};
