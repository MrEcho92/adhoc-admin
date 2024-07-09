import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Link from "@mui/material/Link";

type AddressField = {
  postcodeLabel: string;
  addressLabel: string;
  width?: string;
};

export function AddressField({
  postcodeLabel,
  addressLabel,
  width,
}: AddressField) {
  const [showManualAddress, setShowManualAddress] =
    React.useState<boolean>(false);
  return (
    <Box
      sx={{
        maxWidth: width,
      }}
    >
      {showManualAddress ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            id="outlined-address-label"
            label={addressLabel}
            variant="outlined"
            placeholder="e.g. 10 Downing St"
          />
          <TextField
            id="outlined-postcode-label"
            label={postcodeLabel}
            variant="outlined"
            placeholder="e.g. SW1A 2AA"
          />
          <Link fontSize={12} onClick={() => setShowManualAddress(false)}>
            Search by post code
          </Link>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Autocomplete
            id="address-field-select"
            options={[]}
            renderInput={(params) => (
              <TextField
                {...params}
                label={postcodeLabel}
                placeholder="e.g. SW1A 2AA"
              />
            )}
          />
          <Link fontSize={12} onClick={() => setShowManualAddress(true)}>
            Enter address manually
          </Link>
        </Box>
      )}
    </Box>
  );
}
