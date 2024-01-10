import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllBookings } from "../../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../../utils/constant";

export const useBookings = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  // filter
  const filters = !!searchParams.get("status") &&
    searchParams.get("status") !== "all" && [
      {
        method: "eq" as const,
        field: "status",
        value: searchParams.get("status") as string,
      },
      // {
      //   method: "gt" as const,
      //   field: "totalPrice",
      //   value: 5000,
      // },
    ];
  // sort
  const sortQuery = searchParams.get("sort") || "startDate-desc";
  const [field, direction] = sortQuery.split("-");
  const sort = { field, direction };

  // pagination

  const curPage = Number(searchParams.get("page")) || 1;

  const page = curPage <= 0 ? 1 : curPage > PAGE_SIZE ? PAGE_SIZE : curPage;

  const { data: { data: bookings, count } = {}, isLoading } = useQuery({
    queryKey: ["bookings", filters, sort, page],
    queryFn: () => {
      return getAllBookings({ filters, sort, page });
    },
  });

  if (curPage <= 0) return {};

  // prefecthing next page
  if (count && page < count / PAGE_SIZE)
    void queryClient.prefetchQuery({
      queryKey: ["bookings", filters, sort, page + 1],
      queryFn: () => getAllBookings({ filters, sort, page: page + 1 }),
    });

  if (count && page > 1)
    void queryClient.prefetchQuery({
      queryKey: ["bookings", filters, sort, page - 1],
      queryFn: () => getAllBookings({ filters, sort, page: page - 1 }),
    });

  return { bookings, count, isLoading };
};
