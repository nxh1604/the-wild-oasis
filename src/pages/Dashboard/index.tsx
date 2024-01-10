import DashboardFilter from "../../features/dashboard/DashboardFilter";
import { DashBoardLayout } from "../../features/dashboard/DashboardLayout";
import { Heading, Row } from "../../ui";

function Dashboard() {
  return (
    <>
      <Row type="horizontal" style={{ marginBottom: "10px" }}>
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>
      <DashBoardLayout />
    </>
  );
}

export default Dashboard;
