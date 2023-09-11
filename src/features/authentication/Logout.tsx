import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { ButtonIcon } from "../../ui";
import { useLogout } from "./useLogout";

const Logout = (): JSX.Element => {
  const { logout, isLoading } = useLogout();

  return (
    <ButtonIcon disabled={isLoading} onClick={() => logout()}>
      <HiArrowRightOnRectangle />
    </ButtonIcon>
  );
};

export default Logout;
