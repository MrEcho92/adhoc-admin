import { Link as RouterLink } from "react-router-dom";
import { Avatar, Box, Link, Stack } from "@mui/material";

export function Header() {
  return (
    <Box
      component="header"
      sx={{
        backgroundColor: "blue",
        color: "white",
        position: "fixed",
        width: "100%",
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          minHeight: "64px",
          px: 3,
        }}
      >
        <Stack alignItems="center" direction="row" spacing={3}>
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: "inline-flex",
              height: 24,
              width: 24,
            }}
          >
            Logo
          </Box>
        </Stack>
        <Stack alignItems="center" direction="row" spacing={2}>
          <Avatar
            src="/assets/avatars/avatar-chen-simmons.jpg"
            variant="rounded"
          />
        </Stack>
      </Stack>
    </Box>
  );
}
