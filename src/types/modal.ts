export interface ConfirmationModalProps {
  show: boolean;
  onHide: () => void;
  title: string;
  message: string;
  onConfirm: () => void;
}
