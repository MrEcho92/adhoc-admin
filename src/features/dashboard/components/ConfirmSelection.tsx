import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import SendIcon from "@mui/icons-material/Send";
import { CategoryData } from "../../../types";

type ConfirmSelectionProps = {
  movingDate: Date | null;
  prevAddress: string;
  newAddress: string;
  selectedCategories: ReadonlyArray<CategoryData>;
  closeModal: () => void;
  handleSubmit: () => void;
  isLoading: boolean;
};

export function ConfirmSelection({
  movingDate,
  prevAddress,
  newAddress,
  selectedCategories,
  closeModal,
  handleSubmit,
  isLoading,
}: ConfirmSelectionProps) {
  return (
    <Box
      sx={{
        p: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 1,
        }}
      >
        <CheckCircleSharpIcon fontSize="medium" />
        <Typography fontSize={25} fontWeight={600}>
          You're almost done!{" "}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, py: 2 }}>
        <Typography>Please confirm your details are correct.</Typography>
        <Typography>
          You're moving on the <span>{movingDate?.toLocaleString()}</span> from{" "}
          <br />
          <span>{prevAddress}</span> to <span>{newAddress}</span>.
        </Typography>
        <Typography>Selected categories: </Typography>
        <Grid container spacing={0.5}>
          {selectedCategories.map((item, index) => (
            <Grid key={index} item>
              <Chip label={item.name} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box display="flex" justifyContent="flex-end" pt={2}>
        <Stack direction={"row"} spacing={2}>
          <Button variant="text" size="small" onClick={closeModal}>
            Cancel
          </Button>
          <LoadingButton
            onClick={handleSubmit}
            endIcon={<SendIcon />}
            loading={isLoading}
            loadingPosition="end"
            variant="contained"
          >
            <span>Submit</span>
          </LoadingButton>
        </Stack>
      </Box>
    </Box>
  );
}
