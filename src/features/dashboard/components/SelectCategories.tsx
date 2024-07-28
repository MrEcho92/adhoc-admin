import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Typography, Box, Button } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import * as API from "../../api/api";

const LargeWidth = "400px" as const;

type CategoryData = {
  name: string;
  label: string;
};

type SelectCategoriesProps = {
  categories: ReadonlyArray<string>;
  setCategories: Dispatch<SetStateAction<readonly string[]>>;
  setIsCompleted: Dispatch<SetStateAction<boolean>>;
};

export function SelectCategories({ setCategories }: SelectCategoriesProps) {
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredCategories, setFilteredCategories] = useState<
    ReadonlyArray<CategoryData>
  >([]);
  const [selectedCategories, setSelectedCategories] = useState<
    ReadonlyArray<CategoryData>
  >([]);
  const [categoryList, setCategoryList] = useState<ReadonlyArray<CategoryData>>(
    [],
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setIsLoading((prev) => !prev);
        const response = await API.getCategories();
        let data = response?.data;
        setCategoryList(data);
        setFilteredCategories(data);
      } catch (error) {
        console.error("Error fetching categories: " + error);
      } finally {
        setIsLoading((prev) => !prev);
      }
    }

    if (filteredCategories.length === 0) {
      fetchCategories();
    }
  }, []);

  function handleSearch(value: string): void {
    const filteredItems =
      value === ""
        ? categoryList
        : categoryList.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase()),
          );
    setFilteredCategories(filteredItems);
  }

  function handleSelect(event: any, category: CategoryData) {
    const isChecked = event.target.checked;
    let updatedCategories;
    if (isChecked) {
      updatedCategories = [...selectedCategories, category];
    } else {
      updatedCategories = selectedCategories.filter(
        (i) => i.name.toLowerCase() !== category.name.toLowerCase(),
      );
    }
    setSelectedCategories(updatedCategories);
    setCategories(updatedCategories.map((item) => item.name));
  }

  function handleClear() {
    handleSearch("");
    setSearchValue("");
    setSelectedCategories([]);
    setCategories([]);
  }

  if (isLoading) {
    return <Box>Loading...</Box>;
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
            {categoryList.length} items ({selectedCategories.length} selected)
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
            {filteredCategories.map((item, idx) => (
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(event) => handleSelect(event, item)}
                    checked={selectedCategories.includes(item)}
                  />
                }
                key={item.name + idx}
                label={item.name}
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
