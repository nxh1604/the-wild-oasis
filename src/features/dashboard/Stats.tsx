import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";
import styled from "styled-components";

const Stats = ({
  bookings,
  confirmedStays,
  cabinCount,
  numDays,
}: {
  bookings: Array<
    Pick<IBookingData<null, null>, "created_at" | "totalPrice" | "extrasPrice">
  >;
  confirmedStays: Array<IBookingData<null, Pick<IGuestData, "fullName">>>;
  cabinCount: number;
  numDays: number;
}): JSX.Element => {
  const numberOfBookings = bookings.length;

  const sales = bookings.reduce((prev: number, booking) => {
    return prev + booking.totalPrice;
  }, 0);

  const totalCheckins = confirmedStays.length;

  const occupation =
    confirmedStays.reduce((prev, stay) => {
      return prev + stay.numNights;
    }, 0) /
    (cabinCount * numDays);

  return (
    <StatWrapper>
      <Stat
        title="bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numberOfBookings}
      />
      <Stat
        title="sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />{" "}
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={totalCheckins}
      />{" "}
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </StatWrapper>
  );
};

const StatWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.6rem;
  flex-wrap: wrap;
`;

export default Stats;
