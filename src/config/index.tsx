import { SvgIcon } from "@mui/material";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";

export const SidePanelItems = [
  {
    href: "/",
    icon: (
      <SvgIcon>
        <AddHomeOutlinedIcon />
      </SvgIcon>
    ),
    label: "Home",
  },
  {
    href: "/orders",
    icon: (
      <SvgIcon>
        <AddHomeOutlinedIcon />
      </SvgIcon>
    ),
    label: "Orders",
  },
];
