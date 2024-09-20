import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActions, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MplanSchema } from "../../../types";
import * as API from "../../../features/api/api";

export function Dashboard() {
  const navigate = useNavigate();
  const [mPlans, setMplans] = useState<ReadonlyArray<MplanSchema>>([]);
  const [, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchMplans() {
      try {
        setIsLoading(true);
        const mplans = await API.getMplans(
          "9a58f52b-6c5f-4770-8d6f-eb782d64df91",
        );
        setMplans(mplans);
      } catch (error) {
        console.error("Error getting Mplans: " + error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }
    if (!mPlans?.length) {
      fetchMplans();
    }
  }, [mPlans]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h5">Welcome, Emmanuel</Typography>
        <Card sx={{ maxWidth: 345, borderRadius: "8px" }}>
          <CardContent>
            <Typography gutterBottom variant="subtitle1">
              Let's get you started with your change of address
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => navigate("/app/create")}
            >
              Begin change of address
            </Button>
          </CardActions>
        </Card>
      </Box>
      <Divider />
      <Box display={"flex"} flexDirection={"column"} gap={1}>
        <Typography variant="h5">Mplan history</Typography>
        <Stack direction="row" spacing={2}>
          {mPlans?.length > 0 ? (
            mPlans.map((item, idx) => {
              return (
                <Card
                  key={item.id + idx}
                  sx={{ maxWidth: 300 }}
                  onClick={() => navigate(`/app/mplan/${item.id}`)}
                >
                  <CardContent>
                    <Typography fontSize={18}>{item.id}</Typography>
                    <Typography fontSize={12}>
                      New address: {item.new_address} / Old address:{" "}
                      {item.old_address}
                    </Typography>
                    <Typography fontSize={12}>
                      Old address: {item.old_address}
                    </Typography>
                    <Typography fontSize={12}>
                      Moving on {item.moving_date.toString()}
                    </Typography>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <Box>No history</Box>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
