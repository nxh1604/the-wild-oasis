import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/hooks/useBooking";
import { useNavigate, useParams } from "react-router-dom";
import { Checkbox, ConfirmDelete, Empty, Modal } from "../../ui";
import { useState } from "react";
import { useCheckin } from "./useCheckin";
import { formatCurrency } from "../../utils/helpers";
import { useSettings } from "../settings/hooks";
import { useDeleteBooking } from "../bookings/hooks/useDeleteBooking";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const { bookingId } = useParams();

  const [confirmPaid, setConfirmPaid] = useState<boolean>(false);
  const [hasBreakfast, setHasBreakfast] = useState<boolean>(false);
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const { updateCheckin, loadingUpdate } = useCheckin();
  const { booking } = useBooking(bookingId);
  const { settings } = useSettings();
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (!booking) return <Empty resource="booking" />;

  const optionalBreakfast = settings
    ? settings.breakfastPrice * booking.numGuests * booking.numNights
    : 0;

  function handleCheckin() {
    if (!bookingId || !booking) return;

    if (hasBreakfast) {
      updateCheckin(
        {
          bookingId,
          breakfast: {
            isPaid: true,
            hasBreakfast,
            extrasPrice: optionalBreakfast,
            totalPrice: booking.totalPrice + optionalBreakfast,
          },
        },
        {
          onSuccess: () => {
            navigate(-1);
          },
        }
      );
    } else {
      updateCheckin(
        {
          bookingId,
        },
        {
          onSuccess: () => {
            navigate(-1);
          },
        }
      );
    }
  }

  const handleBreakfast = () => {
    setHasBreakfast((breakfast) => !breakfast);
    if (!hasBreakfast || booking.isPaid) setConfirmPaid(false);
  };

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox
        breakfastPrice={optionalBreakfast}
        breakfast={hasBreakfast}
        booking={booking}
      />
      {!booking.hasBreakfast && (
        <Box>
          <Checkbox
            checked={booking.hasBreakfast || hasBreakfast}
            onChange={handleBreakfast}
            id={"breakfast"}>
            Want to add breakfast for {formatCurrency(optionalBreakfast)}?
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          id={"confirm"}
          checked={booking.isPaid || confirmPaid}
          disabled={booking.isPaid || false || loadingUpdate}
          onChange={() => setConfirmPaid((confirm) => !confirm)}>
          I confirm that <strong>{booking.guests.fullName}</strong> has paid
          total amount of{" "}
          {formatCurrency(
            hasBreakfast
              ? booking.totalPrice + optionalBreakfast
              : booking.totalPrice
          )}{" "}
          {hasBreakfast &&
            `(${formatCurrency(booking.totalPrice)} + ${formatCurrency(
              optionalBreakfast
            )})`}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          disabled={(!booking.isPaid && !confirmPaid) || loadingUpdate}>
          Check in booking #{bookingId}
        </Button>
        <Modal>
          <Modal.Open openWindowName="deleting-booking">
            <Button disabled={loadingUpdate} variation="danger">
              Delete booking #{bookingId}
            </Button>
          </Modal.Open>
          <Modal.Window windowName="deleting-booking">
            <ConfirmDelete
              disabled={isDeleting}
              onConfirm={() => {
                if (!bookingId) return;
                deleteBooking(bookingId, {
                  onSuccess: () => {
                    navigate("/bookings");
                  },
                });
              }}
              resourceName={`booking #${bookingId}`}
            />
          </Modal.Window>
        </Modal>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
