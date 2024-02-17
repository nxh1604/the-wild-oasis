import { css, styled } from "styled-components";
import Logout from "../../features/authentication/Logout";
import { ButtonIcon, DarkModeToggle, SpinnerMini } from "..";
import { HiArrowRightOnRectangle, HiOutlineCog6Tooth, HiOutlineMoon, HiOutlineSun, HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import UserAvatar from "../../features/authentication/UserAvatar";
import LogoInHeader from "../LogoInHeader";
import { useEffect, useState } from "react";
import { useDarkMode } from "../../contexts/DarkModeContext";
import { useLogout } from "../../features/authentication/hooks/useLogout";

const StyledHeader = styled.header`
  padding: 3.2rem 4rem;
  border-bottom: 1px solid;
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-100);

  @media (max-width: 1280px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const StyledUl = styled.ul`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;

  @media (max-width: 500px) {
    display: none;
  }
`;

const StyledDiv = styled.div`
  display: none;
  gap: 1rem;
  & svg {
    width: 25px;
    height: 25px;
  }
  @media (max-width: 500px) {
    display: flex;
  }
`;

const StyledUlMobile = styled.ul<{ $open: boolean }>`
  display: none;
  @media (max-width: 500px) {
    ${({ $open }) =>
      $open &&
      css`
        display: block;
      `}
    background-color: var(--color-grey-0);
    position: absolute;
    right: -15px;
    width: max-content;
    border-radius: 2px;
    padding: 1rem 2rem 1rem 1rem;
    box-shadow: var(--shadow-lg);
    top: calc(100% + 16px);
  }
`;

const StyledMobileItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 8px;
  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-brand-600);
  }
`;

const Wrapper = styled.div`
  position: relative;
`;

const Header = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleUserAction = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleCloseUserAction = () => {
    setIsOpen(false);
  };

  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const { logout, isLoading } = useLogout();

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleCloseUserAction);
    }

    return () => document.removeEventListener("click", handleCloseUserAction);
  });

  return (
    <StyledHeader>
      <LogoInHeader />
      <StyledDiv>
        <UserAvatar noName />
        <Wrapper>
          <ButtonIcon onClick={handleUserAction}>
            <HiOutlineCog6Tooth />
          </ButtonIcon>
          <StyledUlMobile $open={isOpen}>
            <StyledMobileItem
              onClick={(e) => {
                e.stopPropagation();
                navigate("/account");
                handleCloseUserAction();
              }}
            >
              <ButtonIcon>
                <HiOutlineUser />
              </ButtonIcon>
              Account setting
            </StyledMobileItem>
            <StyledMobileItem
              onClick={(e) => {
                e.stopPropagation();
                toggleDarkMode();
                handleCloseUserAction();
              }}
            >
              <ButtonIcon>{!isDarkMode ? <HiOutlineMoon /> : <HiOutlineSun />}</ButtonIcon>
              change theme
            </StyledMobileItem>
            <StyledMobileItem
              onClick={(e) => {
                e.stopPropagation();
                logout();
                handleCloseUserAction();
              }}
            >
              <ButtonIcon disabled={isLoading}>{isLoading ? <SpinnerMini /> : <HiArrowRightOnRectangle />}</ButtonIcon> Log out
            </StyledMobileItem>
          </StyledUlMobile>
        </Wrapper>
      </StyledDiv>

      <StyledUl>
        <li>
          <UserAvatar />
        </li>
        <li>
          <ButtonIcon onClick={() => navigate("/account")}>
            <HiOutlineUser />
          </ButtonIcon>
        </li>
        <li>
          <DarkModeToggle />
        </li>
        <li>
          <Logout />
        </li>
      </StyledUl>
    </StyledHeader>
  );
};

export default Header;
