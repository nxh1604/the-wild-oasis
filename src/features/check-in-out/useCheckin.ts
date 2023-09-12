import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export const useCheckin = () => {
  const queryClient = useQueryClient();

  const { mutate: updateCheckin, isLoading: loadingUpdate } = useMutation({
    mutationFn: ({
      bookingId,
      breakfast = {},
    }: {
      bookingId: number | string;
      breakfast?: Partial<IBookingData<null, null>>;
    }) =>
      updateBooking(bookingId, {
        isPaid: true,
        status: "checked-in",
        ...breakfast,
      }),
    onSuccess: async (data) => {
      if (!data) {
        return;
      }

      toast.success(`successfully updated booking ${data.id}`);
      await queryClient.invalidateQueries({
        queryKey: ["booking", data.id],
      });
    },
    onError: () => {
      toast.error("failed to checked-in guest");
    },
  });

  return { updateCheckin, loadingUpdate };
};
