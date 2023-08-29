import styled from "styled-components";
import { format, isToday } from "date-fns";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { Menus, Table, Tag } from "../../ui";

import {
  HiCheckCircle,
  HiEllipsisVertical,
  HiEye,
  HiMiniTrash,
  HiXCircle,
} from "react-icons/hi2";

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
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guestId: { fullName: guestName, email },
    cabinId: { name: cabinName },
  },
}: {
  booking: IBookingData<ICabinData, IGuestData>;
}) {
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Menus.Menu>
        <Menus.Open menuId={bookingId}>
          <HiEllipsisVertical />
        </Menus.Open>
        <Menus.Content menuId={bookingId}>
          <Menus.Item>
            <HiEye /> Booking details
          </Menus.Item>
          <Menus.Item>
            <HiCheckCircle /> Checked-in
          </Menus.Item>
          <Menus.Item>
            <HiXCircle /> Checked-out
          </Menus.Item>
          <Menus.Item>
            <HiMiniTrash /> Remove booking
          </Menus.Item>
        </Menus.Content>
      </Menus.Menu>
    </Table.Row>
  );
}

export default BookingRow;
