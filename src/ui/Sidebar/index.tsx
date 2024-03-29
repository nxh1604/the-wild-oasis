import { css, styled } from "styled-components";
import { ButtonIcon, Logo } from "..";
import MainNav from "../MainNav";
import { useContext } from "react";
import { SidebarContext } from "../../contexts/SidebarContext";
import { HiXMark } from "react-icons/hi2";
import Uploader from "../../data/Uploader";

const srOnly = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

const StyledSidebar = styled.aside<{ $open: boolean }>`
  background-color: var(--color-grey-0);
  grid-row: 1 / -1;
  border-right: 1px solid var(--color-grey-100);
  padding: 3.2rem 2.4rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  @media (max-width: 1280px) {
    ${({ $open }) => !$open && srOnly}
    position: absolute;
    width: 300px;
    min-height: 100vh;
    z-index: 1000;
  }
  @media (max-width: 500px) {
    ${({ $open }) => !$open && srOnly}
    width: 100vw;
  }
`;

const Wrapper = styled.div`
  position: absolute;
  top: 2.3rem;
  right: 1.3rem;

  & svg {
    width: 2.8rem;
    height: 2.8rem;
  }

  @media (min-width: 1281px) {
    display: none;
  }
`;

const StyledOverLay = styled.div<{ $open: boolean }>`
  @media (max-width: 1280px) {
    ${({ $open }) =>
      $open &&
      css`
        overflow: auto;
        position: fixed;
        min-height: 100vh;
        min-width: 100vw;
        background-color: var(--backdrop-color);
        backdrop-filter: blur(4px);
        z-index: 1000;
        transition: all 0.5s;
      `}
  }
`;

const Sidebar = (): JSX.Element => {
  const { isOpen, onClose } = useContext(SidebarContext);

  return (
    <StyledOverLay $open={isOpen} onClick={onClose}>
      <StyledSidebar $open={isOpen} onClick={(e) => e.stopPropagation()}>
        <Wrapper>
          <ButtonIcon onClick={onClose}>
            <HiXMark />
          </ButtonIcon>
        </Wrapper>
        <Logo />
        <MainNav />
        <Uploader />
      </StyledSidebar>
    </StyledOverLay>
  );
};

export default Sidebar;
