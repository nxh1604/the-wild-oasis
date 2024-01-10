import styled from "styled-components";
import { useDarkMode } from "../../contexts/DarkModeContext";
import { HiBars3BottomLeft } from "react-icons/hi2";
import { useContext } from "react";
import { SidebarContext } from "../../contexts/SidebarContext";
import { ButtonIcon } from "..";

const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  & svg {
    width: 2.8rem;
    height: 2.8rem;
  }

  @media (min-width: 1281px) {
    display: none;
  }
`;

const Img = styled.img`
  width: 8rem;
`;

function LogoInHeader() {
  const { isDarkMode } = useDarkMode();

  const { onOpen } = useContext(SidebarContext);

  const src = isDarkMode ? "/logo-dark.png" : "/logo-light.png";
  return (
    <StyledLogo>
      <ButtonIcon onClick={onOpen}>
        <HiBars3BottomLeft />
      </ButtonIcon>
      <Img src={src} alt="Logo" />
    </StyledLogo>
  );
}

export default LogoInHeader;
