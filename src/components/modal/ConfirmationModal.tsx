import { ConfirmationModalProps } from "@/types/modal";
import { Modal, Button } from "react-bootstrap";

const ConfirmationModal = ({
  show,
  onHide,
  title,
  message,
  onConfirm,
}: ConfirmationModalProps) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
