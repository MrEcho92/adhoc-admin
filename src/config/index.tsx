import { SvgIcon } from "@mui/material";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

export const SidePanelItems = [
  {
    href: "/app",
    icon: (
      <SvgIcon>
        <AddHomeOutlinedIcon />
      </SvgIcon>
    ),
    label: "Home",
  },
  {
    href: "/moving",
    icon: (
      <SvgIcon>
        <LocalShippingIcon />
      </SvgIcon>
    ),
    label: "Moving",
  },
];
