import { LoaderIcon } from '../Icons/Icons';
import { Button, TransparentButton, WhiteButton } from './Buttons.styled';
import { EmptyButtonStyled } from './EmptyButton.styled';
import React, { FC, useMemo } from 'react';
import { StyledComponentProps } from 'styled-components';


export interface ButtonWithLoadingProps
  extends Partial<StyledComponentProps<'button', {}, {}, ''>> {
  isLoading?: boolean;
  buttonType?: 'primary' | 'secondary' | 'transparent' | 'white';
}

export const ButtonWithLoading: FC<ButtonWithLoadingProps> = ({
  isLoading,
  children,
  buttonType = 'white',
  ...buttonProps
}) => {
  const content = useMemo(() => {
    return isLoading ? <LoaderIcon size={24} /> : children;
  }, [isLoading, children]);

  if (buttonType === 'primary') {
    return (
      <Button
        type={'button'}
        isLoading={isLoading}
        disabled={isLoading}
        {...buttonProps}
      >
        {content}
      </Button>
    );
  }

  if (buttonType === 'secondary') {
    return (
      <EmptyButtonStyled type={'button'} disabled={isLoading} {...buttonProps}>
        {content}
      </EmptyButtonStyled>
    );
  }

  if (buttonType === 'transparent') {
    return (
      <TransparentButton type={'button'} disabled={isLoading} {...buttonProps}>
        {content}
      </TransparentButton>
    );
  }

  return (
    <WhiteButton type={'button'} disabled={isLoading} {...buttonProps}>
      {content}
    </WhiteButton>
  );
};