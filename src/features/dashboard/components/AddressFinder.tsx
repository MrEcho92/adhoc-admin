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
  setIsCompleted?: Dispatch<React.SetStateAction<boolean>>;
};

export function AddressFinder({
  setMovingDate,
  setPrevAddress,
  setNewAddress,
}: AddressFinderProps) {
  return (
    <Box p={2}>
      <Typography variant="h4">
        Tell us your moving date and address.
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: LargeWidth,
          m: "auto",
          pt: 8,
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
          onChange={setPrevAddress}
        />
        <Divider />
        <AddressField
          postcodeLabel="Your new postcode"
          addressLabel="New address"
          width={LargeWidth}
          onChange={setNewAddress}
        />
      </Box>
    </Box>
  );
}
