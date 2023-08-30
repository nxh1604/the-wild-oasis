import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import {
  Account,
  Bookings,
  Cabins,
  Dashboard,
  Login,
  PageNotFound,
  Settings,
  Users,
} from "./pages";

import { loader as cabinsLoader } from "./pages/Cabins/Loader";
import { loader as bookingsLoader } from "./pages/Bookings/loader";
import { loader as bookingLoader } from "./features/bookings/BookingDetail";

import { AppLayout, Empty } from "./ui";

import GlobalStyles from "./styles/GlobalStyles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import BookingDetail from "./features/bookings/BookingDetail";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to={"/dashboard"} />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="bookings">
          <Route
            index
            element={<Bookings />}
            loader={bookingsLoader(queryClient)}
          />
          <Route
            path=":bookingId"
            element={<BookingDetail />}
            errorElement={<Empty resource="booking" />}
            loader={bookingLoader(queryClient)}
          />
        </Route>
        <Route
          path="cabins"
          element={<Cabins />}
          loader={cabinsLoader(queryClient)}
        />
        <Route path="settings" element={<Settings />} />
        <Route path="users" element={<Users />} />
        <Route path="account" element={<Account />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<PageNotFound />} />
    </>
  )
);

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
