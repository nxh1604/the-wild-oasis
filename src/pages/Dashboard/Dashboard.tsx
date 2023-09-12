import { useUser } from "../../features/authentication/hooks/useUser";
import { Heading, Row } from "../../ui";

function Dashboard() {
  const { user } = useUser();

  const { fullName, avatar } = user ? user.user_metadata : {};

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <p>TEST</p>
      </Row>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}>
        <img src={avatar} alt={fullName} />
      </div>
    </>
  );
}

export default Dashboard;
