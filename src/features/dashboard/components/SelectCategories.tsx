import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
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
type Category = {
  title: string;
};

type SelectCategoriesProps = {
  categories: ReadonlyArray<string>;
  setCategories: Dispatch<SetStateAction<readonly string[]>>;
  setIsCompleted: Dispatch<SetStateAction<boolean>>;
};

export function SelectCategories({
  categories,
  setCategories,
}: SelectCategoriesProps) {
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredCategories, setFilteredCategories] = useState<
    ReadonlyArray<Category>
  >([]);
  const [selectedCategories, setSelectedCategories] = useState<
    ReadonlyArray<Category>
  >([]);

  useEffect(() => {
    if (filteredCategories.length === 0) {
      setFilteredCategories(categoriesData);
    }
  }, []);

  function handleSearch(value: string): void {
    const filteredItems =
      value === ""
        ? categoriesData
        : categoriesData.filter((item) =>
            item.title.toLowerCase().includes(value.toLowerCase()),
          );
    setFilteredCategories(filteredItems);
  }

  function handleSelect(event: any, category: Category) {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedCategories([...selectedCategories, category]);
      setCategories(selectedCategories.map((item) => item.title));
    } else {
      const filteredItems = selectedCategories.filter(
        (i) => i.title !== category.title,
      );
      setSelectedCategories(filteredItems);
    }
  }

  function handleClear() {
    handleSearch("");
    setSearchValue("");
    setSelectedCategories([]);
    setCategories([]);
  }

  return (
    <Box p={2}>
      <Typography variant="h4">
        Select relevant categories you would like your address to be updated.
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: LargeWidth,
          m: "auto",
          pt: 8,
          height: "100%",
        }}
      >
        <Box display="flex" justifyContent="space-between">
          <Typography>
            {categoriesData.length} items ({selectedCategories.length} selected)
          </Typography>
          <Button variant="text" size="small" onClick={handleClear}>
            Clear
          </Button>
        </Box>
        <TextField
          fullWidth
          label="Choose categories"
          placeholder="Search category"
          onChange={(ev) => {
            setSearchValue(ev.target.value);
            handleSearch(ev.target.value);
          }}
          value={searchValue}
        />
        <Box
          sx={{
            maxHeight: 300,
            overflowY: "scroll",
            px: 2,
            border: `1px solid ${"red"}`,
            borderRadius: 2,
            height: 300,
          }}
        >
          <FormGroup>
            {filteredCategories.map((item) => (
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(event) => handleSelect(event, item)}
                    checked={selectedCategories.includes(item)}
                  />
                }
                label={item.title}
              />
            ))}
            {!filteredCategories.length && (
              <Box textAlign={"center"} mt={2}>
                No data
              </Box>
            )}
          </FormGroup>
        </Box>
      </Box>
    </Box>
  );
}
