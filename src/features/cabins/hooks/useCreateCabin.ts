import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrUpdateCabin } from "../../../services/apiCabins";
import toast from "react-hot-toast";

export const useCreateCabin = () => {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createOrUpdateCabin,
    onSuccess: async () => {
      toast.success("New cabin successfully created");
      await queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err: { message: string }) => toast.error(err.message),
  });

  return { isCreating, createCabin };
};
