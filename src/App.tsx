import { Navigate, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import { AppLayout, Empty, ProtectedRoute, Spinner } from "./ui";

import GlobalStyles from "./styles/GlobalStyles";

const Account = lazy(() => import("./pages/Account"));
const Bookings = lazy(() => import("./pages/Bookings/Bookings"));
const Cabins = lazy(() => import("./pages/Cabins/Cabins"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Settings = lazy(() => import("./pages/Settings"));
const Users = lazy(() => import("./pages/Users"));
const BookingPage = lazy(() => import("./pages/Booking/BookingPage"));
const CheckinPage = lazy(() => import("./pages/Checkin/CheckinPage"));

import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import ErrorFallback from "./ui/ErrorFallback";
import { bookingsPageLoader } from "./pages/Bookings/loader";
import { bookingLoader } from "./pages/Booking/loader";
import { checkinPageLoader } from "./pages/Checkin/loader";
import { cabinsPageLoader } from "./pages/Cabins/loader";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import BookingsSkeleton from "./pages/Bookings/BookingsSkeleton";
import CabinsSkeletonLoading from "./pages/Cabins/CabinsSkeletonLoading";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorFallback />}>
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to={"/dashboard"} />} />
        <Route
          path="dashboard"
          element={
            <Suspense fallback={<Spinner />}>
              <Dashboard />
            </Suspense>
          }
        />
        <Route path="bookings">
          <Route
            index
            element={
              <Suspense fallback={<BookingsSkeleton />}>
                <Bookings />
              </Suspense>
            }
            loader={bookingsPageLoader(queryClient)}
          />
          <Route
            path=":bookingId"
            element={
              <Suspense fallback={<Spinner />}>
                <BookingPage />
              </Suspense>
            }
            errorElement={<Empty resource="booking" />}
            loader={bookingLoader(queryClient)}
          />
          <Route
            path="checkin/:bookingId"
            element={
              <Suspense fallback={<Spinner />}>
                <CheckinPage />
              </Suspense>
            }
            loader={checkinPageLoader(queryClient)}
          />
          <Route
            path="checkout/:bookingId"
            element={
              <Suspense fallback={<Spinner />}>
                <CheckinPage />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="cabins"
          element={
            <Suspense fallback={<CabinsSkeletonLoading />}>
              <Cabins />
            </Suspense>
          }
          loader={cabinsPageLoader(queryClient)}
        />
        <Route
          path="settings"
          element={
            <Suspense fallback={<Spinner />}>
              <Settings />
            </Suspense>
          }
        />
        <Route
          path="users"
          element={
            <Suspense fallback={<Spinner />}>
              <Users />
            </Suspense>
          }
        />
        <Route
          path="account"
          element={
            <Suspense fallback={<Spinner />}>
              <Account />
            </Suspense>
          }
        />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <RouterProvider router={router} />
        <Toaster />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
