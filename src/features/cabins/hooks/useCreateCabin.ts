import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrUpdateCabin } from "../../../services/apiCabins";

export const useCreateCabin = () => {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createOrUpdateCabin,
    onSuccess: async () => {
      alert("New cabin successfully created");
      await queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err: { message: string }) => alert(err.message),
  });

  return { isCreating, createCabin };
};
