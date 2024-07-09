import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useModal } from "../../../components";
import { CardActions } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
  );
}
