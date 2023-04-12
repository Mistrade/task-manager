import { Button, TransparentButton, WhiteButton } from './Buttons.styled';
import React, { FC, useMemo } from 'react';
import { StyledComponentProps } from 'styled-components';
import { ThreeDots } from 'react-loader-spinner';
import { currentColor } from '@src/common/constants';
import { EmptyButtonStyled } from './EmptyButton.styled';

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
    return isLoading ? (
      <ThreeDots
        height={24}
        width={24}
        radius='9'
        color={currentColor}
        ariaLabel='three-dots-loading'
        visible={true}
      />
    ) : (
      children
    );
  }, [isLoading, children]);

  if (buttonType === 'primary') {
    return (
      <Button type={'button'} disabled={isLoading} {...buttonProps}>
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
