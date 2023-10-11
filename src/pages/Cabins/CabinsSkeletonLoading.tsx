import { Spinner, Table } from "../../ui";

const array = [0, 1];

const CabinsSkeletonLoading = (): JSX.Element => {
  return (
    <Table role="table" columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header role="row" as="header">
        <div></div>
        <div>cabin</div>
        <div>capacity</div>
        <div>price</div>
        <div>discount</div>
        <div></div>
      </Table.Header>
      <Table.Content
        data={array}
        render={(_, index) => (
          <Table.Row key={index}>
            <Spinner />
          </Table.Row>
        )}
      />
    </Table>
  );
};

export default CabinsSkeletonLoading;
