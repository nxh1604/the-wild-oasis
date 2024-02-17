import styled from "styled-components";
import { format, isToday } from "date-fns";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { ButtonIcon, ConfirmDelete, Menus, Modal, Table, Tag } from "../../ui";

import { HiCheckCircle, HiEllipsisVertical, HiEye, HiMiniTrash, HiXCircle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./hooks/useDeleteBooking";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

//create Menus action for booking row

function BookingRow({
  booking: {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}: {
  booking: IBookingData<ICabinData, IGuestData>;
}) {
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const { updateCheckout, loadingUpdate } = useCheckout();
  const navigate = useNavigate();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Table.Row>
        <Cabin>{cabinName}</Cabin>

        <Stacked>
          <span>{guestName}</span>
          <span>{email}</span>
        </Stacked>

        <Stacked>
          <span>
            {isToday(new Date(startDate)) ? "Today" : formatDistanceFromNow(startDate)} &rarr;{" "}
            {numNights} night stay
          </span>
          <span>
            {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
            {format(new Date(endDate), "MMM dd yyyy")}
          </span>
        </Stacked>

        <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

        <Amount>{formatCurrency(totalPrice)}</Amount>
        <Menus.Menu>
          <Modal>
            <Menus.Open menuId={bookingId}>
              <HiEllipsisVertical />
            </Menus.Open>
            <Menus.Content menuId={bookingId}>
              <ButtonIcon
                onClick={() => {
                  navigate(`${bookingId}`);
                }}>
                <HiEye /> Booking details
              </ButtonIcon>
              {status === "unconfirmed" && (
                <Menus.Item onClick={() => navigate(`checkin/${bookingId}`)}>
                  <HiCheckCircle /> Check in
                </Menus.Item>
              )}
              {status === "checked-in" && (
                <Menus.Item disabled={loadingUpdate} onClick={() => updateCheckout({ bookingId })}>
                  <HiXCircle /> Check out
                </Menus.Item>
              )}
              {status === "unconfirmed" && (
                <Modal.Open openWindowName="removeBooking">
                  <Menus.Item>
                    <HiMiniTrash /> Remove booking
                  </Menus.Item>
                </Modal.Open>
              )}
            </Menus.Content>
            <Modal.Window windowName="removeBooking">
              <ConfirmDelete
                resourceName="booking"
                onConfirm={() => {
                  if (!bookingId) return;
                  deleteBooking(bookingId);
                }}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Modal>
        </Menus.Menu>
      </Table.Row>
    </>
  );
}

export default BookingRow;
