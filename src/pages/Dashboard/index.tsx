import styled from "styled-components";
import DashboardFilter from "../../features/dashboard/DashboardFilter";
import { DashBoardLayout } from "../../features/dashboard/DashboardLayout";
import { Heading, Row } from "../../ui";

function Dashboard() {
  return (
    <>
      <StyledRow type="horizontal" style={{ marginBottom: "10px" }}>
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </StyledRow>
      <DashBoardLayout />
    </>
  );
}

const StyledRow = styled(Row)`
  flex-wrap: wrap;
`;

export default Dashboard;
