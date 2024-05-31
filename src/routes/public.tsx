import { RouteObject } from "react-router-dom";
import { LandingRoutes } from "../features/landing/routes";
import { AuthRoutes } from "../features/auth/routes";

export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <LandingRoutes />,
    children: [
      {
        path: "about",
        element: <div>About page</div>,
      },
      {
        path: "how",
        element: <div>How does it work</div>,
      },
    ],
  },
  {
    path: "/auth/*",
    element: <AuthRoutes />,
  },
  {
    path: "*",
    element: <div>Not found</div>,
  },
];
