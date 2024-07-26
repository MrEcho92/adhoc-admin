import { Dispatch, SetStateAction, useMemo, useEffect, useState } from "react";
import { CircularProgress, debounce } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Link from "@mui/material/Link";
import * as API from "../../features/api/api";

type AddressField = {
  postcodeLabel: string;
  addressLabel: string;
  width?: string;
  onChange?: Dispatch<SetStateAction<string>>;
  selectedAddress?: Readonly<string>;
};

export function AddressField({
  postcodeLabel,
  addressLabel,
  width,
  onChange,
  selectedAddress,
}: AddressField) {
  const [showManualAddress, setShowManualAddress] = useState<boolean>(false);
  const [address, setAddress] = useState<Readonly<string>>("");

  const [manualAddress, setManualAddress] = useState<Readonly<string>>("");
  const [manualPostCode, setManualPostCode] = useState<Readonly<string>>("");

  const [inputPostCode, setInputPostCode] = useState<Readonly<string>>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<any>([]);
  const [errorFetchingAddress, setErrorFetchingAddress] =
    useState<boolean>(false);
  const [postCode, setPostCode] = useState<Readonly<string>>("");

  function handleAddress(_event: any, value: any) {
    const address = `${value.formatted_address?.filter((item: any) => item.length > 0).join(",")} ${postCode}`;
    setAddress(address);
    if (onChange) onChange(address);
  }

  const fetchOptions = async (query: string) => {
    try {
      const res = await API.getAddresses(query);
      return res.data;
    } catch (err) {
      console.error("Error fetching Addresses" + err);
      setErrorFetchingAddress(true);
    }
  };

  const debouncedFetchOptions = useMemo(
    () =>
      debounce(async (query) => {
        setIsLoading(true);
        const results = await fetchOptions(query);
        setOptions(results?.addresses);
        setPostCode(query.toUpperCase());
        setIsLoading(false);
      }, 500),
    [],
  );

  useEffect(() => {
    if (inputPostCode.length >= 5 && inputPostCode.length <= 7) {
      debouncedFetchOptions(inputPostCode);
    }
  }, [inputPostCode, debouncedFetchOptions]);

  useEffect(() => {
    if (inputPostCode === "") setErrorFetchingAddress(false);
  }, [inputPostCode]);

  useEffect(() => {
    if (
      manualAddress.length >= 5 &&
      manualPostCode.length >= 5 &&
      manualPostCode.length <= 7
    ) {
      debouncedFetchOptions(manualPostCode);
      setShowManualAddress(false);
      setInputPostCode(manualPostCode);
    }
  }, [manualAddress, manualPostCode]);

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
            autoComplete="off"
            id="outlined-address-label"
            label={addressLabel}
            variant="outlined"
            placeholder="e.g. 10 Downing St"
            value={manualAddress}
            onChange={(event) => setManualAddress(event.target.value)}
          />
          <TextField
            autoComplete="off"
            id="outlined-postcode-label"
            label={postcodeLabel}
            variant="outlined"
            placeholder="e.g. SW1A 2AA"
            value={manualPostCode}
            onChange={(event) => setManualPostCode(event.target.value)}
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
            disableClearable
            freeSolo
            inputValue={inputPostCode}
            options={options ?? []}
            filterOptions={(x) => x}
            loading={isLoading}
            getOptionLabel={(option: any) =>
              `${option.formatted_address?.filter((item: any) => item.length > 0).join(",")} ${postCode}`
            }
            onInputChange={(_event, value) => setInputPostCode(value)}
            onChange={(event, value) => {
              handleAddress(event, value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                error={errorFetchingAddress}
                helperText={
                  errorFetchingAddress ? "Error fetching addresses" : ""
                }
                type="search"
                label={postcodeLabel}
                placeholder="e.g. SW1A 2AA"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {isLoading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
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
