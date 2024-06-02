import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";
import { PublicLayout } from "./Layout";

export function PublicBaseLayout() {
  return (
    <PublicLayout>
      <Suspense fallback={<CircularProgress />}>
        <Outlet />
      </Suspense>
    </PublicLayout>
  );
}
