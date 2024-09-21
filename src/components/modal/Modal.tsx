import { ReactNode } from "react";
import { Dialog, Box } from "@mui/material";

type ModalProps = {
  content: ReactNode;
  isOpen: boolean;
  closeModal: () => void;
};

export default function Modal({ content, isOpen, closeModal }: ModalProps) {
  return (
    <Dialog open={isOpen} onClose={closeModal} maxWidth={"sm"} fullWidth>
      <Box>{content}</Box>
    </Dialog>
  );
}
