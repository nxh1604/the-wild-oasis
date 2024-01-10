import { QueryClient } from "@tanstack/react-query";
import { createSearchParams, defer } from "react-router-dom";
import { getAllBookings } from "../../services/apiBookings";

const loader = (queryClient: QueryClient) => () => {
  const queryString =
    window.location.pathname === "/bookings" ? window.location.search : "?page=1&status=all";

  const searchParams = createSearchParams(queryString);
  // filter
  const filters = !!searchParams.get("status") &&
    searchParams.get("status") !== "all" && [
      {
        method: "eq" as const,
        field: "status",
        value: searchParams.get("status") as string,
      },
    ];
  // sort
  const sortQuery = searchParams.get("sort") || "startDate-desc";
  const [field, direction] = sortQuery.split("-");
  const sort = { field, direction };

  // pagination

  const curPage = Number(searchParams.get("page"));

  const page = curPage || 1;
  return defer({
    bookings: queryClient.ensureQueryData({
      queryKey: ["bookings", filters, sort, page],
      queryFn: () =>
        getAllBookings({
          filters,
          sort,
          page,
        }),
    }),
  });
};

export { loader as bookingsPageLoader };
