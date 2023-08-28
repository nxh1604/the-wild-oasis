import { styled } from "styled-components";
import { Logo } from "..";
import MainNav from "../MainNav";
import Uploader from "../../data/Uploader";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  grid-row: 1 / -1;
  border-right: 1px solid var(--color-grey-100);
  padding: 3.2rem 2.4rem;

  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const Sidebar = (): JSX.Element => {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
      <Uploader />
    </StyledSidebar>
  );
};

export default Sidebar;
