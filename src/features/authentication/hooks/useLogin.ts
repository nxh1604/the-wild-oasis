import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export const useLogin = () => {
  const navigate = useNavigate();
  // dung de reference den query client cache
  const queryClient = useQueryClient();

  // xay dung ham login voi' mutate cua useMutation
  const { mutate: login, isLoading: isLogingIn } = useMutation({
    // se~ gui data user len supa base, vi mutationFn chi nhan 1 argument nen dung object
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      // goi den login o service de login
      loginApi({ email, password }),
    // khi login thanh cong se tro ve trang dashboard
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard");
    },
    // khi login ko thanh cong se hien thi error
    onError: (error) => {
      console.log("Error", error);
      toast.error("provided Email or password are incorrect");
    },
  });

  return { login, isLogingIn };
};
