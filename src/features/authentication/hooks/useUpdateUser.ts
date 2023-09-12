import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "../../../services/apiAuth/apiAuth";
import toast from "react-hot-toast";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading } = useMutation({
    mutationFn: ({
      password,
      fullName,
      avatar,
    }: {
      password?: string;
      fullName?: string;
      avatar?: File;
    }) => updateUserApi({ password, fullName, avatar }),
    onSuccess: async (user) => {
      console.log(user);

      toast.success("update success");
      await queryClient.invalidateQueries(["user"]);
    },
    onError: () => {
      toast.error("update error");
    },
  });

  return { updateUser, isLoading };
};
