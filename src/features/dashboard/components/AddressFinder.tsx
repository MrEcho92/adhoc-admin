import React, { Dispatch } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { AddressField } from "../../../components";
import { MovingDate } from "../../../components";

const LargeWidth = "400px" as const;

type AddressFinderProps = {
  selectedMovingDate?: Date | null;
  setMovingDate?: Dispatch<React.SetStateAction<Date | null>>;
  setPrevAddress?: Dispatch<React.SetStateAction<string>>;
  setNewAddress?: Dispatch<React.SetStateAction<string>>;
  setIsCompleted?: Dispatch<React.SetStateAction<boolean>>;
  newAddress?: Readonly<string>;
  prevAddress?: Readonly<string>;
  setAddressMetaInfo?: Dispatch<React.SetStateAction<any>>;
};

export function AddressFinder({
  selectedMovingDate,
  setMovingDate,
  setPrevAddress,
  setNewAddress,
  newAddress,
  prevAddress,
  setAddressMetaInfo,
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
            value={selectedMovingDate}
          />
        </Box>
        <Divider />
        <AddressField
          postcodeLabel="Your old postcode"
          addressLabel="Previous address"
          width={LargeWidth}
          onChange={setPrevAddress}
          selectedAddress={prevAddress}
          setAddressMetaInfo={setAddressMetaInfo}
        />
        <Divider />
        <AddressField
          postcodeLabel="Your new postcode"
          addressLabel="New address"
          width={LargeWidth}
          onChange={setNewAddress}
          selectedAddress={newAddress}
          setAddressMetaInfo={setAddressMetaInfo}
        />
      </Box>
    </Box>
  );
}
