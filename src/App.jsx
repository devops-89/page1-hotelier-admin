import AppLayout from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UpcomingBooking from "./pages/UpcomingBooking.jsx";
import CompleteBooking from "./pages/CompleteBooking.jsx";
import CancelledBooking from "./pages/CancelledBooking.jsx";
import AddHotel from './pages/AddHotel.jsx';
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import AllHotel from "./pages/AllHotel.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/dashboard/",
          element: <Dashboard />,
        },
        {
          path: "/dashboard/booking/upcoming",
          element: <UpcomingBooking />,
        },
        {
          path: "/dashboard/booking/complete",
          element: <CompleteBooking />,
        },
        {
          path: "/dashboard/booking/cancelled",
          element: <CancelledBooking />,
        },
        {
          path: "/dashboard/hotel/allhotels",
          element: <AllHotel />,
        },
        {
          path: "/dashboard/hotel/add-hotel",
          element: <AddHotel />,
        },
      ],
    },

    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
