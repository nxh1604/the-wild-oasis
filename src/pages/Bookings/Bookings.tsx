import BookingTable from "../../features/bookings/BookingTable";
import BookingTableOperations from "../../features/bookings/BookingTableOperations";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import { StyledContainer } from "../Cabins/Cabins";

function Bookings() {
  return (
    <StyledContainer>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
      </Row>
      <Row type="vertical">
        <BookingTable />
      </Row>
    </StyledContainer>
  );
}

export default Bookings;
