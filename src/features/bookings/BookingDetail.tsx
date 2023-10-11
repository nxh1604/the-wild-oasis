import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";

import { useMoveBack } from "../../hooks/useMoveBack";
import {
  Button,
  ButtonGroup,
  ButtonText,
  ConfirmDelete,
  Empty,
  Heading,
  Modal,
  Row,
  Tag,
} from "../../ui";
import { useNavigate, useParams } from "react-router-dom";
import { useBooking } from "./hooks/useBooking";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./hooks/useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { bookingId } = useParams();
  const { booking } = useBooking(bookingId);
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const { updateCheckout, loadingUpdate } = useCheckout();
  const navigate = useNavigate();
  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (!booking) return <Empty resource={`booking #${bookingId}`} />;

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
          <>
            <Button
              disabled={isDeleting || loadingUpdate}
              onClick={() => navigate(`/bookings/checkin/${bookingId}`)}>
              Check in
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
          </>
        )}
        {booking.status === "checked-in" && (
          <Button
            disabled={loadingUpdate}
            onClick={() => {
              if (!bookingId) return;

              updateCheckout(
                { bookingId },
                {
                  onSettled: () => navigate(`/bookings`),
                }
              );
            }}>
            Check out
          </Button>
        )}
        <Button variation="secondary" onClick={() => navigate("/bookings")}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
