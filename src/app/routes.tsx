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

import RiderDashboard from "./pages/RiderDashboard";
import RestaurantDashboard from "./pages/RestaurantDashboard";

import ZomatoDemo from "./pages/platforms/ZomatoDemo";
import SwiggyDemo from "./pages/platforms/SwiggyDemo";
import UberDemo from "./pages/platforms/UberDemo";
import BlinkitDemo from "./pages/platforms/BlinkitDemo";
import ZeptoDemo from "./pages/platforms/ZeptoDemo";

import PlatformDashboard from "./pages/PlatformDashboard";
import RiderProfile from "./pages/RiderProfile";

import DeliveryHistory from "./pages/DeliveryHistory";

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

      {
  path: "/delivery-history",
  element: <DeliveryHistory />,
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


  {
    path: "/rider-dashboard",
    Component: RiderDashboard,
  },

  {
  path: "/rider-profile",
  Component: RiderProfile,
},

  {
  path: "/platform-dashboard",
  Component: PlatformDashboard,
},

  {
    path: "/restaurant-dashboard",
    Component: RestaurantDashboard,
  },

  {
  path: "/zomato-demo",
  Component: ZomatoDemo,
},

{
  path: "/swiggy-demo",
  Component: SwiggyDemo,
},

{
  path: "/uber-demo",
  Component: UberDemo,
},

{
  path: "/blinkit-demo",
  Component: BlinkitDemo,
},

{
  path: "/zepto-demo",
  Component: ZeptoDemo,
},

]);