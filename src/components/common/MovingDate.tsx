import React, { Dispatch } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

type MovingDateProps = {
  label?: string;
  value?: Date | null;
  setMovingDate?: Dispatch<React.SetStateAction<Date | null>>;
};

export function MovingDate({ label, value, setMovingDate }: MovingDateProps) {
  function handleMovingDate(value: Date | null) {
    if (setMovingDate) {
      setMovingDate(value);
    }
  }

  return (
    <DatePicker
      sx={{
        width: "100%",
      }}
      disablePast
      value={value}
      label={label}
      onChange={(value) => handleMovingDate(value)}
      format="dd/MM/yyyy"
      slotProps={{
        textField: {
          helperText: "Knowing your moving date helps in updating your record",
        },
      }}
    />
  );
}
