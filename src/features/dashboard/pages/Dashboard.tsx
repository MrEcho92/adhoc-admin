import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MplanSchema } from "../../../types";
import * as API from "../../../features/api/api";

export function Dashboard() {
  const navigate = useNavigate();
  const [mPlans, setMplans] = useState<ReadonlyArray<MplanSchema>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchMplans() {
      try {
        setIsLoading((prev) => !prev);
        const mplans = await API.getMplans("user_1");
        setMplans(mplans?.data);
      } catch (error) {
        console.error("Error getting Mplans: " + error);
        setIsLoading((prev) => !prev);
      } finally {
        setIsLoading((prev) => !prev);
      }
    }
    if (mPlans.length === 0) {
      fetchMplans();
    }
  }, [mPlans]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box>
        <Typography variant="h5">Welcome, Emmanuel</Typography>
        <Card
          sx={{ maxWidth: 345, borderRadius: "8px" }}
          onClick={() => navigate("/app/create")}
        >
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
      <Box>Mplan lists</Box>
    </Box>
  );
}
