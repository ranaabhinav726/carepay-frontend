import { lazy } from "react";
import Loadable from "../compponents/Loadable";

const Home = Loadable(lazy(() => import("../pages/Home")));
const About = Loadable(lazy(() => import("../pages/About")));
const ContactUs = Loadable(lazy(() => import("../pages/Contact")));

const MainRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "about",
    element: <About />,
  },
  {
    path: "contactUs",
    element: <ContactUs />,
  },
];

export default MainRoutes;
