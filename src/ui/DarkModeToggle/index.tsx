import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { ButtonIcon } from "..";
import { useDarkMode } from "../../contexts/DarkModeContext";

const DarkModeToggle = (): JSX.Element => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {!isDarkMode ? <HiOutlineMoon /> : <HiOutlineSun />}
    </ButtonIcon>
  );
};

export default DarkModeToggle;
