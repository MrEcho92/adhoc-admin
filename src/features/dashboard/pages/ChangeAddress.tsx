import React, { useEffect, useState } from "react";
import ProgressStepper from "../components/ProgressStepper";
import Box from "@mui/material/Box";
import {
  AddressFinder,
  SelectCategories,
  ConfirmSelection,
} from "../components";
import { useModal } from "../../../components";

export function ChangeAddress() {
  const { openModal, closeModal } = useModal();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [movingDate, setMovingDate] = useState<Date | null>(null);
  const [prevAddress, setPrevAddress] = useState<Readonly<string>>("");
  const [newAddress, setNewAddress] = useState<Readonly<string>>("");
  const [selectedCategories, setSelectedCategories] = useState<
    ReadonlyArray<string>
  >([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(true);

  useEffect(() => {
    if (movingDate && prevAddress && newAddress) {
      console.log(movingDate, prevAddress, newAddress);
      setIsCompleted(false);
    } else {
      setIsCompleted(true);
    }
  }, [movingDate, prevAddress, newAddress]);

  function view(): React.ReactNode {
    let step;
    switch (activeStep) {
      case 0:
        step = (
          <AddressFinder
            setMovingDate={setMovingDate}
            setPrevAddress={setPrevAddress}
            setNewAddress={setNewAddress}
            setIsCompleted={setIsCompleted}
          />
        );
        break;
      case 1:
        step = (
          <SelectCategories
            categories={selectedCategories}
            setCategories={setSelectedCategories}
            setIsCompleted={setIsCompleted}
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
        closeModal={closeModal}
        movingDate={movingDate}
        prevAddress={prevAddress}
        newAddress={newAddress}
        selectedCategories={selectedCategories}
        handleSubmit={handleSubmit}
      />,
    );
  }

  function handleSubmit() {
    console.log("handleSubmit clicked!!!");
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {view()}
      <ProgressStepper
        steps={3}
        lastStep={1}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        handleConfirmModal={handleConfirmModal}
        isDisabled={isCompleted}
      />
    </Box>
  );
}
