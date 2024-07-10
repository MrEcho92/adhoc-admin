import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";

type ConfirmSelectionProps = {
  movingDate: Date | null;
  prevAddress: string;
  newAddress: string;
};

export function ConfirmSelection({
  movingDate,
  prevAddress,
  newAddress,
}: ConfirmSelectionProps) {
  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      <Typography fontSize={22} fontWeight={600}>
        <IconButton>
          <CheckCircleSharpIcon />
        </IconButton>{" "}
        You're almost done!{" "}
      </Typography>
    </Box>
  );
}
