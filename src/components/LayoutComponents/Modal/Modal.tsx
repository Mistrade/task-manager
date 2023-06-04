import { Delay } from '../../../common/functions';
import {
  ModalContainer,
  ModalLayout,
  StyledModalBodyContainer,
  StyledModalFooterContainer,
  StyledModalHeaderContainer,
} from './Modal.styled';
import { ModalProps } from './types';
import React, {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

export const ModalContext = createContext<{
  closeModalAnimation: () => Promise<void>;
} | null>(null);

const defaultAnimationDuration = 250;

export const Modal: FC<ModalProps> = ({
  isView,
  onClose,
  children,
  style,
  enableCloseOnOutsideClick = true,
  verticalPlacement = 'start',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const layoutRef = useRef<HTMLDivElement>(null);

  const [animationPhase, setAnimationPhase] = useState<
    'open' | 'close' | undefined
  >(undefined);

  const escHandler = useCallback(async (e: KeyboardEvent) => {
    if (e.key.toLowerCase() === 'escape') {
      await closeAnimation();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keyup', escHandler);
    return () => {
      window.removeEventListener('keyup', escHandler);
    };
  }, []);

  useEffect(() => {
    console.log('isView', isView);
    if (isView) {
      openAnimation();
    } else {
      closeAnimation();
    }
  }, [isView]);

  const openAnimation = () => {
    console.log('open--animation');
    setAnimationPhase('open');
  };

  const closeAnimation = useCallback(async () => {
    setAnimationPhase('close');
    console.log('close--animation');

    return Delay(defaultAnimationDuration - 50);
  }, []);

  const closeHandler = (event?: React.MouseEvent<HTMLDivElement>) => {
    if (onClose) {
      if (event && ref.current) {
        !ref.current.contains(event.target as HTMLElement) &&
          closeAnimation().then(() => onClose());
      }
    }
  };

  if (isView) {
    return (
      <ModalLayout
        verticalPlacement={verticalPlacement}
        id={'modal--layout'}
        animationDuration={defaultAnimationDuration}
        animationPhase={animationPhase}
        ref={layoutRef}
        tabIndex={1}
        onClick={enableCloseOnOutsideClick ? closeHandler : undefined}
      >
        <ModalContainer
          id={'modal--container'}
          animationDuration={defaultAnimationDuration}
          animationPhase={animationPhase}
          ref={ref}
          style={style}
        >
          <ModalContext.Provider
            value={{ closeModalAnimation: closeAnimation }}
          >
            {children}
          </ModalContext.Provider>
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