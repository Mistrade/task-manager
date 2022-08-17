import {FC, ReactNode, useRef} from 'react'
import {
	ModalContainer,
	ModalLayout,
	StyledModalBodyContainer,
	StyledModalFooterContainer,
	StyledModalHeaderContainer
} from './Modal.styled'
import {ModalProps} from './types'

export const Modal: FC<ModalProps> = ( {
                                         modalBody,
                                         modalFooter,
                                         modalHeader,
                                         isView,
                                         onClose,
                                         children
                                       } ) => {

  const ref = useRef<HTMLDivElement>( null )

  if( isView ) {
    return (
      <ModalLayout
        onClick={( e ) => onClose && ref.current && !ref.current.contains( e.target as HTMLElement ) && onClose()}
      >
        <ModalContainer ref={ref}>
          {children || (
            <>
              {modalHeader}
              {modalBody}
              {modalFooter}
            </>
          )}
        </ModalContainer>
      </ModalLayout>
    )
  }

  return <></>
}

export const ModalHeader: FC<{ children?: ReactNode }> = ( { children } ) => {
  return (
    <StyledModalHeaderContainer>
      {children}
    </StyledModalHeaderContainer>
  )
}

export const ModalFooter: FC<{ children?: ReactNode }> = ( { children } ) => {
  return (
    <StyledModalFooterContainer>
      {children}
    </StyledModalFooterContainer>
  )
}

export const ModalBody: FC<{ children?: ReactNode }> = ( { children } ) => {
  return (
    <StyledModalBodyContainer>
      {children}
    </StyledModalBodyContainer>
  )
}
