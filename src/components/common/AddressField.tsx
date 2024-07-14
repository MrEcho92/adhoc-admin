import { Dispatch, SetStateAction, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Link from "@mui/material/Link";

type AddressField = {
  postcodeLabel: string;
  addressLabel: string;
  width?: string;
  onChange?: Dispatch<SetStateAction<string>>;
};

export function AddressField({
  postcodeLabel,
  addressLabel,
  width,
  onChange,
}: AddressField) {
  const [showManualAddress, setShowManualAddress] = useState<boolean>(false);
  const [address, setAddress] = useState<Readonly<string>>("");

  const [manualAddress, setManualAddress] = useState<Readonly<string>>("");
  const [manualPostCode, setManualPostCode] = useState<Readonly<string>>("");

  function handleAddress(event: any) {
    const valueInput = event.target.value;
    // Add validation checks for postcode and maybe error out if incorrect
    // API call to get address and debounce to delay a call after 5 or 6 input
    setAddress(valueInput);
  }
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
            value={manualAddress}
          />
          <TextField
            id="outlined-postcode-label"
            label={postcodeLabel}
            variant="outlined"
            placeholder="e.g. SW1A 2AA"
            value={manualPostCode}
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
                value={address}
                onChange={handleAddress}
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
