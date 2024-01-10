import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { Spinner } from "../../ui";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useCabins } from "../cabins/hooks";
import { SalesChart } from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: flex;
  flex-direction: column;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const WrapperTodayAndChart = styled.div`
  display: flex;
  gap: 2.4rem;
  @media (max-width: 1280px) {
    flex-direction: column;
  }
`;

export const DashBoardLayout = () => {
  const { isLoading, bookings } = useRecentBookings();
  const {
    isLoading: isLoadingStays,
    confirmedStays,
    numDays,
  } = useRecentStays();
  const { cabins, isLoading: isLoadingCabins } = useCabins();
  if (isLoading || isLoadingStays || isLoadingCabins) return <Spinner />;
  if (!bookings || !confirmedStays || !cabins) return null;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        cabinCount={cabins.length}
        numDays={Number(numDays)}
      />
      <WrapperTodayAndChart>
        <TodayActivity />
        <DurationChart confirmedStays={confirmedStays} />
      </WrapperTodayAndChart>
      <SalesChart bookings={bookings} numDays={Number(numDays)} />
    </StyledDashboardLayout>
  );
};
