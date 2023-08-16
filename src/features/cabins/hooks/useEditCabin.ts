import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cabinCreateOrEdit } from "../../../services/apiCabins";
import { ICabinData } from "../../../services/apiCabins/apiCabins";

export const useEditCabin = () => {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({
      editedCabin,
      editId,
    }: {
      editedCabin: ICabinData;
      editId: number;
    }) => cabinCreateOrEdit(editedCabin, editId),
    onSuccess: async () => {
      alert("Cabin successfully edited");
      await queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err: { message: string }) => alert(err.message),
  });

  return { isEditing, editCabin };
};
