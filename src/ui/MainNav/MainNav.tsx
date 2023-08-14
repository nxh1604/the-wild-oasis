import { NavLink } from "react-router-dom";
import {
  HiOutlineHome as HomeIcon,
  HiOutlineCalendarDays as CalendarIcon,
  HiOutlineHomeModern as CabinIcon,
  HiOutlineUsers as UsersIcon,
  HiOutlineCog6Tooth as SettingIcon,
} from "react-icons/hi2";
import styled from "styled-components";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-900);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

const MainNav = (): JSX.Element => {
  return (
    <NavList>
      <li>
        <StyledNavLink to="/dashboard">
          <HomeIcon /> <span>Home</span>
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/bookings">
          <CalendarIcon /> <span>Bookings</span>
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/cabins">
          <CabinIcon />
          <span>Cabins</span>
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/users">
          <UsersIcon />
          <span>Users</span>
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/settings">
          <SettingIcon />
          <span>Settings</span>
        </StyledNavLink>
      </li>
    </NavList>
  );
};

export default MainNav;
