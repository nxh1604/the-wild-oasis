import { useMutation } from "@tanstack/react-query";
import { signUp as singUpApi } from "../../../services/apiAuth/apiAuth";
import toast from "react-hot-toast";

export const useSignUp = () => {
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: ({
      fullName,
      email,
      password,
    }: {
      fullName: string;
      email: string;
      password: string;
    }) => singUpApi({ fullName, email, password }),
    onSuccess: () => {
      toast.success(
        "Succesfullly created new account! Please verify new account from the user's email address "
      );
    },
    onError: () => {
      console.log("can not create new user");
      toast.error("can not create new user");
    },
  });

  return { signUp, isLoading };
};
