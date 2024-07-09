import React, { ReactNode } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useModal } from "./ModalContext";

type ModalProps = {
  content: ReactNode;
  isOpen: boolean;
  closeModal: () => void;
};

export default function Modal({ content, isOpen, closeModal }: ModalProps) {
  return (
    <Dialog open={isOpen} onClose={closeModal} maxWidth={"sm"} fullWidth>
      <DialogTitle>You're almost done</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button onClick={closeModal} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
