import { Suspense } from "react";
import { Navigate, RouteObject, Outlet } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { ProtectedLayout } from "../components/layout";

export function App() {
  return (
    <ProtectedLayout>
      <Suspense fallback={<CircularProgress />}>
        <Outlet />
      </Suspense>
    </ProtectedLayout>
  );
}

export const protectRoutes: RouteObject[] = [
  {
    path: "/app",
    element: <App />,
    children: [
      {
        index: true,
        element: <div>Dashboard</div>,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
];
