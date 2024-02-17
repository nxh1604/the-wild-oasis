import styled from "styled-components";
import { Heading, Row, Table } from "../../ui";
import { LoadingSkeleton } from "../../ui/Loading";
const BookingsSkeleton = ({ array = [1, 2, 3, 4, 5, 6, 7, 8] }): JSX.Element => {
  return (
    <StyledContainer>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
      </Row>

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
          render={(_, index) => (
            <Table.Row key={index}>
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
            </Table.Row>
          )}
        />
        <Table.Footer>
          <StyledPagination>
            <Wrapper>
              <LoadingSkeleton />
            </Wrapper>
            <Wrapper>
              <LoadingSkeleton />
            </Wrapper>
          </StyledPagination>
        </Table.Footer>
      </Table>
    </StyledContainer>
  );
};

export default BookingsSkeleton;

const StyledContainer = styled.div`
  max-width: 200rem;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const StyledPagination = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: space-between;
  padding: 0 1.2rem;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 30rem;
`;
