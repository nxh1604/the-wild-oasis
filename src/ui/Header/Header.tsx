import { styled } from "styled-components";
import Logout from "../../features/authentication/Logout";
import { ButtonIcon, DarkModeToggle } from "..";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import UserAvatar from "../../features/authentication/UserAvatar";
import LogoInHeader from "../LogoInHeader";

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
`;

const Header = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <StyledHeader>
      <LogoInHeader />
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
