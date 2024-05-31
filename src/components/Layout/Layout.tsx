import React from "react";
import Box from "@mui/material/Box";
import { CssBaseline } from "@mui/material";

type ContentProps = {
  children: React.ReactNode;
};

export function PublicLayout({ children }: ContentProps) {
  return (
    <Box>
      <CssBaseline />
      <Box>{children}</Box>
    </Box>
  );
}

export function ProtectedLayout({ children }: ContentProps) {
  return (
    <Box>
      <CssBaseline />
      <Box>{children}</Box>
    </Box>
  );
}
