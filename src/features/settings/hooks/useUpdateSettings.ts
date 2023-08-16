import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../../services/apiSettings";

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();
  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: async () => {
      alert("Settings successfully updated");
      await queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (err: { message: string }) => alert(err.message),
  });

  return { isUpdating, updateSetting };
};
