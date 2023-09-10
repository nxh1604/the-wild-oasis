import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";

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
        console.log("successfully update null");
        return;
      }

      alert(`successfully updated booking ${data.id}`);
      await queryClient.invalidateQueries({
        queryKey: ["booking", data.id],
      });
    },
    onError: () => {
      console.log("failed to checked-in guest");
      alert("failed to checked-in guest");
    },
  });

  return { updateCheckin, loadingUpdate };
};
