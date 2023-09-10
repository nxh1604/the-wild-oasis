import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { AppLayout, Empty } from "./ui";
import GlobalStyles from "./styles/GlobalStyles";

import {
  Account,
  Bookings,
  Cabins,
  Dashboard,
  Login,
  PageNotFound,
  Settings,
  Users,
  BookingPage,
  CheckinPage,
} from "./pages";

import { bookingLoader } from "./pages/Booking";
import { checkinPageLoader } from "./pages/Checkin";
import { cabinsPageLoader } from "./pages/Cabins";
import { bookingsPageLoader } from "./pages/Bookings";

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
            loader={bookingsPageLoader(queryClient)}
          />
          <Route
            path=":bookingId"
            element={<BookingPage />}
            errorElement={<Empty resource="booking" />}
            loader={bookingLoader(queryClient)}
          />
          <Route
            path="checkin/:bookingId"
            element={<CheckinPage />}
            loader={checkinPageLoader(queryClient)}
          />
          {/* <Route path="checkout/:bookingId" element={<CheckinPage />} /> */}
        </Route>
        <Route
          path="cabins"
          element={<Cabins />}
          loader={cabinsPageLoader(queryClient)}
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
