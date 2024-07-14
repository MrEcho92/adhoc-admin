import React, { Dispatch } from "react";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

type ProgressStepperProps = {
  steps: number;
  lastStep: number;
  activeStep: number;
  setActiveStep: Dispatch<React.SetStateAction<number>>;
  handleConfirmModal?: () => void;
  isDisabled: boolean;
};

export default function ProgressStepper({
  steps,
  lastStep,
  activeStep,
  setActiveStep,
  handleConfirmModal,
  isDisabled,
}: ProgressStepperProps) {
  const theme = useTheme();

  const handleNext = () => {
    if (activeStep === lastStep) {
      if (handleConfirmModal) handleConfirmModal();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <MobileStepper
      variant="dots"
      steps={steps}
      position="static"
      activeStep={activeStep}
      sx={{ width: "60%", flexGrow: 1, m: "auto", my: 2 }}
      nextButton={
        <Button size="small" onClick={handleNext} disabled={isDisabled}>
          {activeStep === lastStep ? "Finish" : "Next"}
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
      }
      backButton={
        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
          Back
        </Button>
      }
    />
  );
}
