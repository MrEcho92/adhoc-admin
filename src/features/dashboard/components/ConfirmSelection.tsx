import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";

type ConfirmSelectionProps = {
  movingDate: Date | null;
  prevAddress: string;
  newAddress: string;
  selectedCategories: ReadonlyArray<string>;
  closeModal: () => void;
  handleSubmit: () => void;
};

export function ConfirmSelection({
  movingDate,
  prevAddress,
  newAddress,
  selectedCategories,
  closeModal,
  handleSubmit,
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
          <span>{prevAddress}</span> to <span>{newAddress}</span>.
        </Typography>
        <Typography>Selected categories: </Typography>
        <Grid container spacing={0.5}>
          {selectedCategories.map((item, index) => (
            <Grid key={index} item>
              <Chip label={item} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box display="flex" justifyContent="flex-end" pt={2}>
        <Stack direction={"row"} spacing={2}>
          <Button variant="text" size="small" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="contained" size="small" onClick={handleSubmit}>
            Submit
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
