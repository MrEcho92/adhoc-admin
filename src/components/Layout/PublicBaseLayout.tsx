import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { PublicLayout } from "./BaseLayout";

export function PublicBaseLayout() {
  return (
    <PublicLayout>
      <Suspense fallback={<CircularProgress />}>
        <Outlet />
      </Suspense>
    </PublicLayout>
  );
}
