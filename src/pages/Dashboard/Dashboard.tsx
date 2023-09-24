import DashboardFilter from "../../features/dashboard/DashboardFilter";
import { Heading, Row } from "../../ui";

function Dashboard() {
  return (
    <Row type="horizontal">
      <Heading as="h1">Dashboard</Heading>
      <DashboardFilter />
    </Row>
  );
}

export default Dashboard;
