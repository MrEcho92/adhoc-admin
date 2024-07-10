import React, { useState } from "react";
import ProgressStepper from "../components/ProgressStepper";
import Box from "@mui/material/Box";
import {
  AddressFinder,
  SelectCategories,
  ConfirmSelection,
} from "../components";
import { useModal } from "../../../components";

export function ChangeAddress() {
  const { openModal } = useModal();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [movingDate, setMovingDate] = useState<Date | null>(null);
  const [prevAddress, setPrevAddress] = useState<Readonly<string>>("");
  const [newAddress, setNewAddress] = useState<Readonly<string>>("");
  const [categories, setCategories] = useState<ReadonlyArray<string>>([]);

  function view(): React.ReactNode {
    let step;
    switch (activeStep) {
      case 0:
        step = (
          <AddressFinder
            setMovingDate={setMovingDate}
            setPrevAddress={setPrevAddress}
            setNewAddress={setNewAddress}
          />
        );
        break;
      case 1:
        step = (
          <SelectCategories
            categories={categories}
            setCategories={setCategories}
          />
        );
        break;
      default:
        break;
    }

    return step;
  }

  function handleConfirmModal() {
    openModal(
      <ConfirmSelection
        movingDate={movingDate}
        prevAddress={prevAddress}
        newAddress={newAddress}
      />,
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <ProgressStepper
        steps={3}
        lastStep={1}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        handleConfirmModal={handleConfirmModal}
      />
      {view()}
    </Box>
  );
}
