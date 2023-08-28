import { Table } from "../../ui";
import BookingRow from "./BookingRow";
import { useBookings } from "./hooks/useBookings";

function BookingTable() {
  const { bookings } = useBookings();

  if (!bookings?.length) return null;

  // return null

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

      <Table.Content
        data={bookings}
        render={(booking: IBookingData<ICabinData, IGuestData>) => {
          return <BookingRow key={booking.id} booking={booking} />;
        }}
      />
    </Table>
  );
}

export default BookingTable;
