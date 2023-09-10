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
import { useNavigate, useParams } from "react-router-dom";
import { useBooking } from "./hooks/useBooking";
import { useCheckout } from "../check-in-out/useCheckout";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { bookingId } = useParams();
  const { booking } = useBooking(bookingId);
  const { updateCheckout, loadingUpdate } = useCheckout();
  const navigate = useNavigate();
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
        {booking.status === "unconfirmed" && (
          <Button onClick={() => navigate(`/bookings/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}
        {booking.status === "checked-in" && (
          <Button
            disabled={loadingUpdate}
            onClick={() => {
              if (!bookingId) return;

              updateCheckout(
                { bookingId },
                {
                  onSuccess: () => navigate("/bookings"),
                }
              );
            }}>
            Check out
          </Button>
        )}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
