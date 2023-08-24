import { Outlet } from "react-router-dom";
import { Header, Sidebar } from "..";
import { styled } from "styled-components";

const AppLayout = (): JSX.Element => {
  return (
    <StyledAppLayout>
      <Sidebar />
      <MainContainer>
        <Header />
        <Main>
          <Outlet />
        </Main>
      </MainContainer>
    </StyledAppLayout>
  );
};

const MainContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: max-content;
  max-height: 100vh;
  overflow: auto;
`;

const StyledAppLayout = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: grid;
  grid-template-columns: min-content 1fr;
`;

const Main = styled.main`
  padding: 4rem 4.8rem 6.4rem;
`;

export default AppLayout;
