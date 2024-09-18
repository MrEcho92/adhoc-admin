import { Suspense } from "react";
import { Navigate, RouteObject, Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import { CircularProgress } from "@mui/material";
import { ProtectedLayout } from "../components/Layout";
import {
  Dashboard,
  ChangeAddress,
  MplanDetailPage,
} from "../features/dashboard";
import { Header } from "../components";
import { SidePanel } from "../components/sections/side-panel";

export function App() {
  return (
    <ProtectedLayout>
      <Suspense fallback={<CircularProgress />}>
        <Header />
        <SidePanel />
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            maxWidth: "100%",
            paddingTop: "64px",
            paddingLeft: "73px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flex: "1 1 auto",
              flexDirection: "column",
              width: "100%",
              padding: "25px",
            }}
          >
            <Outlet />
          </Box>
        </Box>
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
        path: "/app/create",
        element: <ChangeAddress />,
      },
      {
        path: "/app/mplan/:mplanId",
        element: <MplanDetailPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
];
