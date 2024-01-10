import styled from "styled-components";
import { Heading } from "../../ui";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useDarkMode } from "../../contexts/DarkModeContext";

const ChartBox = styled.div`
  /* Box */
  display: flex;
  width: 100%;
  flex-direction: column;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  min-width: 50rem;
  padding: 2.4rem 3.2rem;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const startDataLight = [
  {
    duration: "1 night",
    value: 0,
    color: "#ef4444",
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#f97316",
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#eab308",
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#84cc16",
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#22c55e",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#14b8a6",
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "#3b82f6",
  },
  {
    duration: "21+ nights",
    value: 0,
    color: "#a855f7",
  },
];

const startDataDark = [
  {
    duration: "1 night",
    value: 0,
    color: "#b91c1c",
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#c2410c",
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#a16207",
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#4d7c0f",
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#15803d",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#0f766e",
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "#1d4ed8",
  },
  {
    duration: "21+ nights",
    value: 0,
    color: "#7e22ce",
  },
];

interface IStartData {
  duration: string;
  value: number;
  color: string;
}

function incArrayValue(arr: IStartData[], field: string) {
  return arr.map((obj) => (obj.duration === field ? { ...obj, value: obj.value + 1 } : obj));
}

function prepareData(
  startData: IStartData[],
  stays: IBookingData<null, Pick<IGuestData, "fullName">>[]
) {
  // A bit ugly code, but sometimes this is what it takes when working with real data 😅

  const data = stays
    .reduce((arr: IStartData[], cur: IBookingData<null, Pick<IGuestData, "fullName">>) => {
      const num = cur.numNights;
      if (num === 1) return incArrayValue(arr, "1 night");
      if (num < 4) return incArrayValue(arr, `${num} nights`);
      if (num < 6) return incArrayValue(arr, "4-5 nights");
      if (num < 8) return incArrayValue(arr, "6-7 nights");
      if (num < 15) return incArrayValue(arr, "8-14 nights");
      if (num < 22) return incArrayValue(arr, "15-21 nights");
      return incArrayValue(arr, "21+ nights");
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

const DurationChart = ({
  confirmedStays,
}: {
  confirmedStays: IBookingData<null, Pick<IGuestData, "fullName">>[];
}): JSX.Element => {
  const { isDarkMode } = useDarkMode();
  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(startData, confirmedStays);
  return (
    <ChartBox>
      <Heading as={"h2"}>Stay duration summmary</Heading>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            nameKey={"duration"}
            dataKey={"value"}
            innerRadius={80}
            outerRadius={110}
            cx={"40%"}
            cy={"50%"}
            paddingAngle={3}
          >
            {data.map((entry) => (
              <Cell fill={entry.color} stroke={entry.color} key={entry.duration} />
            ))}
          </Pie>
          <Legend
            verticalAlign="middle"
            align="right"
            iconSize={15}
            iconType="circle"
            layout="vertical"
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
};

export default DurationChart;
