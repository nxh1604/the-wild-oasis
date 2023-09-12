import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { ButtonIcon, SpinnerMini } from "../../ui";
import { useLogout } from "./hooks/useLogout";

const Logout = (): JSX.Element => {
  const { logout, isLoading } = useLogout();

  return (
    <ButtonIcon disabled={isLoading} onClick={() => logout()}>
      {isLoading ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
};

export default Logout;
