import { Suspense } from "react";
import { Await, useLoaderData, useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import { Button, Heading, Row } from "../../ui";
import { BookingTable, BookingTableOperations } from "../../features/bookings";
import BookingsSkeleton from "./BookingsSkeleton";

function Bookings() {
  const { bookings } = useLoaderData() as {
    bookings: IBookingData<number, number>[];
  };
  const navigate = useNavigate();

  return (
    <Suspense fallback={<BookingsSkeleton array={[1, 2, 3, 4]} />}>
      <Await
        resolve={bookings}
        errorElement={
          <div>
            <h1>Some thing went wrong! 😥</h1>
            <br />
            <p>
              Go back ? <br />
              <br />
              <Button onClick={() => navigate(-1)}>Go back &larr;</Button>
            </p>
          </div>
        }>
        <StyledContainer>
          <StyledRow type="horizontal">
            <StyledHeading as="h1">All bookings</StyledHeading>
            <BookingTableOperations />
          </StyledRow>
          <Row type="vertical">
            <BookingTable />
          </Row>
        </StyledContainer>
      </Await>
    </Suspense>
  );
}

export default Bookings;

export const StyledHeading = styled(Heading)`
  flex-grow: 1;
`;

export const StyledRow = styled(Row)`
  flex-wrap: wrap;
  gap: 1.6rem;
`;

const StyledContainer = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;
