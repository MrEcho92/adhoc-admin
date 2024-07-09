import { Dispatch, SetStateAction } from "react";
import { Typography, Box, Button } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const LargeWidth = "400px" as const;
const categoriesData = [
  { title: "DLVA" },
  { title: "Vehicle log book" },
  { title: "Council tax" },
  { title: "HM Revenue & Customs (HMRC)" },
  { title: "Electoral" },
  { title: "Department of Works and Pensions (DWP)" },
  { title: "Energy" },
  {
    title: "Water",
  },
  { title: "NHS" },
  { title: "TV" },
  {
    title: "Charity",
  },
  {
    title: "Mobile",
  },
  { title: "Pharmacy" },
  { title: "GP" },
  {
    title: "Dentist",
  },
  { title: "Hospital" },
  { title: "Opticians" },
  { title: "Breakdown" },
  { title: "Pets" },
  {
    title: "Lottery cards",
  },
  { title: "Gyms" },
  { title: "Royal Mail" },
  { title: "Schools & Colleges" },
  { title: "Home insurance" },
  { title: "Banks" },
  { title: "Inform family & friends" },
];

type SelectCategoriesProps = {
  categories: ReadonlyArray<string>;
  setCategories: Dispatch<SetStateAction<readonly string[]>>;
};

export function SelectCategories({
  categories,
  setCategories,
}: SelectCategoriesProps) {
  function handleSearch(event: any) {}

  return (
    <Box p={2}>
      <Typography variant="h4">
        Select the relevant categories in which you would like your address to
        be updated
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: LargeWidth,
          m: "auto",
          pt: 10,
          height: "100%",
        }}
      >
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography>{categories.length} selected</Typography>
          <Button variant="text" size="small">
            Clear
          </Button>
        </Box>
        <TextField
          fullWidth
          label="Choose categories"
          placeholder="Search category"
          onChange={(event) => handleSearch(event)}
          value={""}
        />
        <Box
          sx={{
            maxHeight: 350,
            overflowY: "scroll",
            px: 2,
          }}
        >
          <FormGroup>
            {categoriesData.map((item) => (
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={item.title}
              />
            ))}
          </FormGroup>
        </Box>
      </Box>
    </Box>
  );
}
