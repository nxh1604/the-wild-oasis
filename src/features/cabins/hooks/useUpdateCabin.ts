import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrUpdateCabin } from "../../../services/apiCabins";

export const useUpdateCabin = () => {
  const queryClient = useQueryClient();

  const { mutate: updateCabin, isLoading: isUpdating } = useMutation({
    mutationFn: ({ updatedCabin, updateId }: { updatedCabin: ICabinData; updateId: number }) =>
      createOrUpdateCabin(updatedCabin, updateId),
    onSuccess: async () => {
      alert("Cabin successfully edited");
      await queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err: { message: string }) => alert(err.message),
  });

  return { isUpdating, updateCabin };
};
