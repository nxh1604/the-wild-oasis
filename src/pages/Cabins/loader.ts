import { QueryClient } from "@tanstack/react-query";
import { defer } from "react-router-dom";
import { getCabins } from "../../services/apiCabins";

export const loader = (queryClient: QueryClient) => () => {
  return defer({
    cabins: queryClient.ensureQueryData({
      queryKey: ["cabins"],
      queryFn: getCabins,
    }),
  });
};
