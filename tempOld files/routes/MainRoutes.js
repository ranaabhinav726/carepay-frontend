import { lazy } from "react";
import Loadable from "../compponents/Loadable";

const Home = Loadable(lazy(() => import("../pages/Home")));
const About = Loadable(lazy(() => import("../pages/About")));

const MainRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "about",
    element: <About />,
  },
];

export default MainRoutes;