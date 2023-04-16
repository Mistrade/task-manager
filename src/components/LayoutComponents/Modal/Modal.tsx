import React, { FC, ReactNode, useCallback, useEffect, useRef } from 'react';

import {
  ModalContainer,
  ModalLayout,
  StyledModalBodyContainer,
  StyledModalFooterContainer,
  StyledModalHeaderContainer,
} from './Modal.styled';
import { ModalProps } from './types';

export const Modal: FC<ModalProps> = ({
  modalBody,
  modalFooter,
  modalHeader,
  isView,
  onClose,
  children,
  style,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const escHandler = useCallback((e: KeyboardEvent) => {
    if (e.key.toLowerCase() === 'escape') {
      onClose && onClose();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keyup', escHandler);
    return () => window.removeEventListener('keyup', escHandler);
  }, []);

  if (isView) {
    return (
      <ModalLayout
        tabIndex={1}
        onClick={(e) =>
          onClose &&
          ref.current &&
          !ref.current.contains(e.target as HTMLElement) &&
          onClose()
        }
      >
        <ModalContainer ref={ref} style={style}>
          {children || (
            <>
              {modalHeader}
              {modalBody}
              {modalFooter}
            </>
          )}
        </ModalContainer>
      </ModalLayout>
    );
  }

  return <></>;
};

export const ModalHeader: FC<{ children?: ReactNode }> = ({ children }) => {
  return <StyledModalHeaderContainer>{children}</StyledModalHeaderContainer>;
};

export const ModalFooter: FC<{ children?: ReactNode }> = ({ children }) => {
  return <StyledModalFooterContainer>{children}</StyledModalFooterContainer>;
};

export const ModalBody: FC<{ children?: ReactNode }> = ({ children }) => {
  return <StyledModalBodyContainer>{children}</StyledModalBodyContainer>;
};
