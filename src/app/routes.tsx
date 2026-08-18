import { createBrowserRouter } from "react-router";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import HowItWorks from "./pages/HowItWorks";
import FindDeliveries from "./pages/FindDeliveries";
import BecomeRider from "./pages/BecomeRider";
import AboutUs from "./pages/AboutUs";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "how-it-works",
        Component: HowItWorks,
      },
      {
        path: "find-deliveries",
        Component: FindDeliveries,
      },
      {
        path: "become-a-rider",
        Component: BecomeRider,
      },
      {
        path: "about",
        Component: AboutUs,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "signup",
        Component: SignUp,
      },
    ],
  },
]);
