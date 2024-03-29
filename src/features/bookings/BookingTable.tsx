import { Empty, Menus, Spinner, Table } from "../../ui";
import BookingRow from "./BookingRow";
import { useBookings } from "./hooks/useBookings";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  const { bookings, count, isLoading } = useBookings();

  if (isLoading)
    return (
      <Table role="table" columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header role="row" as="header">
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>
        <Spinner />
      </Table>
    );

  if (!bookings?.length || !count) return <Empty resource="bookings" />;

  return (
    <Menus>
      <Table role="table" columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header role="row" as="header">
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Content
          data={bookings}
          render={(booking: IBookingData<ICabinData, IGuestData>) => {
            return <BookingRow key={booking.id} booking={booking} />;
          }}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
