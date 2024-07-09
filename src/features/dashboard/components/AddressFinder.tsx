import React, { Dispatch, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { AddressField } from "../../../components";
import { MovingDate } from "../../../components";

const LargeWidth = "400px" as const;

type AddressFinderProps = {
  movingDate?: Date;
  setMovingDate?: Dispatch<React.SetStateAction<Date | null>>;
  setPrevAddress?: Dispatch<React.SetStateAction<string>>;
  setNewAddress?: Dispatch<React.SetStateAction<string>>;
};

export function AddressFinder({ setMovingDate }: AddressFinderProps) {
  return (
    <Box p={2}>
      <Typography variant="h4">
        Tell us your moving date and your address.
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: LargeWidth,
          m: "auto",
          pt: 10,
        }}
      >
        <Box>
          <MovingDate
            label="Select moving date"
            setMovingDate={setMovingDate}
          />
        </Box>
        <Divider />
        <AddressField
          postcodeLabel="Your old postcode"
          addressLabel="Previous address"
          width={LargeWidth}
        />
        <Divider />
        <AddressField
          postcodeLabel="Your new postcode"
          addressLabel="New address"
          width={LargeWidth}
        />
      </Box>
    </Box>
  );
}
