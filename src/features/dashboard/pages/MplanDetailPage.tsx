import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import HouseIcon from "@mui/icons-material/House";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import { getMplanDetails } from "../../api/api";

const otherData = [
  "councils",
  "gp",
  "water",
  "sewages",
  "schools",
  "gpbranch",
  "pharmacy",
  "hospital",
  "dentist",
] as const;

export function MplanDetailPage() {
  const [mplanDetails, setMplanDetails] = useState<any>();
  const [, setIsLoading] = useState<boolean>(false);
  const [utility, setUtility] = useState<string>("");
  const [utilityData, setUtilityData] = useState<any[]>([]);

  const routeParams = useParams();
  const userId = "8f512069-5b38-43d8-a5d2-b09b4de752ce" as const;

  useEffect(() => {
    if (routeParams?.mplanId) {
      handleGetMplanDetails(routeParams?.mplanId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeParams]);

  const handleGetMplanDetails = useCallback(async (mplanId: string) => {
    try {
      setIsLoading(true);
      const response = await getMplanDetails(mplanId, userId);
      const resMap = new Map();
      Object.entries(response).map(([key, value]) => {
        return resMap.set(key, value);
      });
      setMplanDetails(resMap);
      setIsLoading(false);
    } catch {
      console.error("Error fetching mplanDetail for mplanId" + mplanId);
      throw new Error("Error fetching mplanDetail for mplanId" + mplanId);
    }
  }, []);
  console.log(mplanDetails);
  console.log(utilityData);
  function nhsGroup(ut: any, key: string) {
    return (
      <Box p={2} key={key}>
        <Typography>{ut?.organisation_name}</Typography>
        <Typography>
          {ut?.address1}, {ut?.city}, {ut?.county}, {ut?.postcode}
        </Typography>
        {ut?.telephone ? <Typography>{ut?.telephone}</Typography> : null}
        {ut?.website ? (
          <Link target="_blank" to={ut?.website}>
            {ut?.website}
          </Link>
        ) : null}
      </Box>
    );
  }

  function waterSupply(ut: any, key: string) {
    return (
      <Box p={2} key={key}>
        <Typography>{ut?.company}</Typography>
        <Typography>{ut?.constituency_name}</Typography>
        {ut?.website ? (
          <Link target="_blank" to={ut?.website}>
            {ut?.website}
          </Link>
        ) : null}
      </Box>
    );
  }

  return (
    <>
      <Stack spacing={2}>
        <Box display="flex" flexDirection="column" gap={2}>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <HouseIcon sx={{ fontSize: 45 }} />
            <Typography fontSize={18} fontWeight={"bold"}>
              Mplan Detail
            </Typography>
          </Box>
          <Box>
            <Typography fontSize={14}>
              Moving: {mplanDetails?.get("mplan")?.moving_date}
            </Typography>
            <Typography fontSize={14}>
              Previous address: {mplanDetails?.get("mplan")?.old_address}
            </Typography>
            <Typography fontSize={14}>
              New address: {mplanDetails?.get("mplan")?.new_address}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" gap={2}>
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            sx={{ width: "50%" }}
          >
            <Card variant="outlined">
              <Box p={2}>Advertisement - call to action!!</Box>
            </Card>
            <Card variant="outlined">
              <Box p={2}>
                <Typography>Category planner</Typography>
                <Typography>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum
                  esse rem libero illo laboriosam dignissimos impedit corporis?
                  Eaque at deleniti itaque sequi qui pariatur provident aliquam,
                  odit quam exercitationem. Quam.
                </Typography>
                <Box>
                  <FormGroup>
                    {mplanDetails
                      ?.get("mplan")
                      ?.selected_categories?.map((cat: any, index: number) => {
                        return (
                          <FormControlLabel
                            key={index}
                            disabled={cat.is_completed}
                            control={<Checkbox />}
                            label={cat.label}
                          />
                        );
                      })}
                  </FormGroup>
                </Box>
              </Box>
            </Card>
            <Card variant="outlined">
              <Box p={2}>
                <Typography>Status</Typography>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Recusandae nemo, saepe quae dignissimos commodi animi quod.
                  Repellendus, facilis! Quos quisquam est sunt sit quia
                  blanditiis quas eos hic et quo.
                </Typography>
              </Box>
            </Card>
          </Box>
          <Box sx={{ width: "50%" }}>
            <Card variant="outlined">
              <Box p={2}>
                <Typography>Helpful info</Typography>
                <Typography pb={2}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Recusandae nemo, saepe quae dignissimos commodi animi quod.
                  Repellendus, facilis! Quos quisquam est sunt sit quia
                  blanditiis quas eos hic et quo.
                </Typography>
                <Divider variant="middle" />
                <Box pt={2}>
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-simple-select-label">
                      Utility
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={utility}
                      label="Utility"
                      onChange={(event: SelectChangeEvent) => {
                        const selectedUntility = event.target.value;
                        setUtility(selectedUntility);
                        if (selectedUntility) {
                          setUtilityData(mplanDetails?.get(selectedUntility));
                        }
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {otherData.map((data: string, idx: number) => (
                        <MenuItem key={"data" + idx} value={data}>
                          {data}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box>
                  <Box sx={{ height: 250, overflowY: "auto" }}>
                    {utilityData.length === 0 ? (
                      <Box textAlign="center">No data</Box>
                    ) : (
                      <Box>
                        {utilityData?.map((ut: any, idx: number) => {
                          switch (utility) {
                            case "councils":
                              return (
                                <Box p={2} key={`councils${idx}`}>
                                  <Typography>{ut?.name}</Typography>
                                  <Typography>{ut?.country_name}</Typography>
                                  <Link target="_blank" to={ut?.homepage_url}>
                                    {ut?.homepage_url}
                                  </Link>
                                </Box>
                              );
                            case "gp":
                              return (
                                <Box p={2} key={`gp${idx}`}>
                                  <Typography>{ut?.prac_name}</Typography>
                                  <Typography>
                                    {ut?.address1}, {ut?.address2},
                                    {ut?.address3}, {ut?.address3},
                                    {ut?.address4}, {ut?.postcode}
                                  </Typography>
                                  {ut?.phone ? (
                                    <Typography>{ut?.phone}</Typography>
                                  ) : null}
                                </Box>
                              );
                            case "water":
                              return waterSupply(ut, `water${idx}`);
                            case "sewages":
                              return waterSupply(ut, `sewages${idx}`);
                            case "schools":
                              return (
                                <Box p={2} key={`schools${idx}`}>
                                  <Typography>{ut?.schname}</Typography>
                                  <Typography>
                                    {ut?.street}, {ut?.locality}, {ut?.town},{" "}
                                    {ut?.postcode}
                                  </Typography>
                                  <Typography>Gender: {ut?.gender}</Typography>
                                  <Typography>
                                    Primary: {ut?.is_primary ? "Yes" : "No"}
                                  </Typography>
                                  <Typography>
                                    Secondary: {ut?.is_secondary ? "Yes" : "No"}
                                  </Typography>
                                </Box>
                              );
                            case "gpbranch":
                              return nhsGroup(ut, `gpbranch${idx}`);
                            case "pharmacy":
                              return nhsGroup(ut, `pharmacy${idx}`);
                            case "hospital":
                              return nhsGroup(ut, `hospital${idx}`);
                            case "dentist":
                              return nhsGroup(ut, `dentist${idx}`);
                            default:
                              return null;
                          }
                        })}
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            </Card>
          </Box>
        </Box>
      </Stack>
    </>
  );
}
