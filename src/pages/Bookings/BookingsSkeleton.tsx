import { Spinner, Table } from "../../ui";
const BookingsSkeleton = ({ array = [1, 2] }): JSX.Element => {
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
        data={array}
        render={(data, index) => (
          <Table.Row key={index}>
            <Spinner />
          </Table.Row>
        )}
      />
    </Table>
  );
};

export default BookingsSkeleton;
