/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
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

import GlobalStyles from "./styles/GlobalStyles";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const router = createBrowserRouter([
  {
    index: true,
    element: <Navigate replace to={"dashboard"} />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "bookings",
    element: <Bookings />,
  },
  {
    path: "cabins",
    element: <Cabins />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "setting",
    element: <Settings />,
  },
  {
    path: "users",
    element: <Users />,
  },
  {
    path: "account",
    element: <Account />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
