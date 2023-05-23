import { CSSProperties, ReactNode } from 'react';

export interface ModalProps {
  children: ReactNode;
  isView: boolean;
  onClose?: () => any;
  style?: CSSProperties;
}
