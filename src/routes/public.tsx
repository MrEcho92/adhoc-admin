import { RouteObject } from "react-router-dom";
import { LandingRoutes } from "../features/landing/routes";
import { AuthRoutes } from "../features/auth/routes";
import { PublicBaseLayout } from "../components";

export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <PublicBaseLayout />,
    children: [
      {
        index: true,
        element: <LandingRoutes />,
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
