import { Outlet } from "react-router-dom";
import { Header, Sidebar } from "..";
import { styled } from "styled-components";

const AppLayout = (): JSX.Element => {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
};

const StyledAppLayout = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
`;

const Main = styled.main`
  padding: 4rem 4.8rem 6.4rem;
`;

export default AppLayout;
