import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { styled } from "styled-components";

import { Heading, Row, StyledErrorFallback } from "../../ui";
import { BookingTable, BookingTableOperations } from "../../features/bookings";
import BookingsSkeleton from "./BookingsSkeleton";

function Bookings() {
  const { bookings } = useLoaderData() as {
    bookings: IBookingData<number, number>[];
  };

  return (
    <StyledContainer>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
      </Row>
      <Row type="vertical">
        <Suspense fallback={<BookingsSkeleton array={[1, 2, 3, 4]} />}>
          <Await resolve={bookings} errorElement={<StyledErrorFallback />}>
            <BookingTable />
          </Await>
        </Suspense>
      </Row>
    </StyledContainer>
  );
}

export default Bookings;

const StyledContainer = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;
