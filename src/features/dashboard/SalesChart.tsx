import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import { Heading } from "../../ui";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkMode } from "../../contexts/DarkModeContext";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

const darkColors = {
  totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
  extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
  text: "#e5e7eb",
  background: "#18212f",
};

const brightColors = {
  totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
  extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
  text: "#374151",
  background: "#fff",
};

export const SalesChart = ({
  bookings,
  numDays,
}: {
  bookings: Pick<
    IBookingData<null, null>,
    "created_at" | "extrasPrice" | "totalPrice"
  >[];
  numDays: number;
}) => {
  const { isDarkMode } = useDarkMode();
  const colors = isDarkMode ? darkColors : brightColors;

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    const allBookingAtSameDay = bookings.filter((booking) =>
      isSameDay(date, new Date(booking.created_at))
    );

    return {
      label: format(date, "MMM dd"),
      totalSales: allBookingAtSameDay.reduce((prev, cur) => {
        return prev + cur.totalPrice;
      }, 0),
      extrasSales: allBookingAtSameDay.reduce(
        (prev, cur) => prev + cur.extrasPrice,
        0
      ),
    };
  });

  return (
    <StyledSalesChart>
      <Heading as="h2">
        Sales {"from " + format(allDates[0], " MMM dd yyyy")} &mdash;{" "}
        {format(allDates[allDates.length - 1], "MMM dd yyyy")}
      </Heading>
      <ResponsiveContainer width={"100%"} height={300}>
        <AreaChart data={data}>
          <XAxis
            dataKey={"label"}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit={"$"}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey={"totalSales"}
            type={"monotone"}
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total sales"
            unit={"$"}
          />
          <Area
            dataKey={"extrasSales"}
            type={"monotone"}
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="Extras sales"
            unit={"$"}
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
};
