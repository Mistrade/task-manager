import { CSSProperties, ReactNode } from 'react';

import { ModalLayoutProps } from './Modal.styled';

export interface ModalProps extends ModalLayoutProps {
  children: ReactNode;
  isView: boolean;
  onClose?: () => any;
  style?: CSSProperties;
  enableCloseOnOutsideClick?: boolean;
}
