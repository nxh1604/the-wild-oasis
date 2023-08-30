import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";

import { useMoveBack } from "../../hooks/useMoveBack";
import {
  Button,
  ButtonGroup,
  ButtonText,
  Empty,
  Heading,
  Row,
  Tag,
} from "../../ui";
import { LoaderFunctionArgs, useLoaderData, useParams } from "react-router-dom";
import { useBooking } from "./hooks/useBooking";
import { QueryClient } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  useLoaderData();
  const { bookingId } = useParams();
  const { booking } = useBooking(bookingId);
  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (!booking) return <Empty resource="booking" />;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[booking.status]}>
            {booking.status.replace("-", " ")}
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const { bookingId } = params;

    return await queryClient.ensureQueryData({
      queryKey: ["booking", bookingId],
      queryFn: () => getBooking(bookingId || "0"),
    });
  };
