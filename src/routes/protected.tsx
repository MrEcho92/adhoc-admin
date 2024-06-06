import { Suspense } from "react";
import { Navigate, RouteObject, Outlet } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { ProtectedLayout } from "../components/layout";
import { Dashboard } from "../features/dashboard";

export function App() {
  return (
    <ProtectedLayout>
      <Suspense fallback={<CircularProgress />}>
        <div>Header</div>
        <div>Sidebar</div>
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
        element: <Dashboard />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
];
