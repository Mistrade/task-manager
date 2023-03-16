import { CSSProperties, ReactNode } from 'react';

export interface ModalProps {
  children?: ReactNode;
  modalHeader?: ReactNode;
  isView: boolean;
  modalBody?: ReactNode;
  modalFooter?: ReactNode;
  onClose?: () => any;
  style?: CSSProperties;
}
