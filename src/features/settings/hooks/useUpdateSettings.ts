import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../../services/apiSettings";
import toast from "react-hot-toast";

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();
  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: async () => {
      toast.success("Settings successfully updated");
      await queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (err: { message: string }) => toast.error(err.message),
  });

  return { isUpdating, updateSetting };
};
