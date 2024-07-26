import React, { useEffect, useState } from "react";
import ProgressStepper from "../components/ProgressStepper";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import {
  AddressFinder,
  SelectCategories,
  ConfirmSelection,
} from "../components";
import { useModal } from "../../../components";
import * as API from "../../api/api";
import { formattedDate } from "../../../utils/dateFormat";

export function ChangeAddress() {
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [movingDate, setMovingDate] = useState<Date | null>(null);
  const [prevAddress, setPrevAddress] = useState<Readonly<string>>("");
  const [newAddress, setNewAddress] = useState<Readonly<string>>("");
  const [selectedCategories, setSelectedCategories] = useState<
    ReadonlyArray<string>
  >([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (movingDate && prevAddress && newAddress) {
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
            selectedMovingDate={movingDate}
            prevAddress={prevAddress}
            newAddress={newAddress}
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
        isLoading={isLoading}
      />,
    );
  }

  async function handleSubmit() {
    const userId = "user_id_1" as const;
    const payload = {
      user_id: userId,
      moving_date: formattedDate(movingDate!),
      old_address: prevAddress,
      new_address: newAddress,
      selected_categories: selectedCategories.map((cat: string) => ({
        label: cat,
      })),
    };

    try {
      setIsLoading((prev) => !prev);
      const response = await API.postMplan(payload);
      if (response.data) {
        navigate("/app");
      }
    } catch (err) {
      console.error("Error submitting mplan: " + err);
    } finally {
      setIsLoading((prev) => !prev);
    }
    closeModal();
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
