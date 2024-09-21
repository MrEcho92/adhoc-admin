import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import {
  Hero,
  FAQ,
  Features,
  Header,
  About,
  Pricing,
  LandingFooter,
} from "../components";

export function LandingPage() {
  return (
    <Box>
      <Header />
      <Hero />
      <Box sx={{ bgcolor: "background.default" }}>
        <Features />
        <Divider />
        <About />
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        <LandingFooter />
      </Box>
    </Box>
  );
}
