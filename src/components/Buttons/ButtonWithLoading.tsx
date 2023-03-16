import { WhiteButton } from './Buttons.styled';
import React, { FC } from 'react';
import { StyledComponentProps } from 'styled-components';
import { ThreeDots } from 'react-loader-spinner';
import { currentColor } from '../../common/constants';

export interface ButtonWithLoadingProps
  extends Partial<StyledComponentProps<'button', {}, {}, ''>> {
  isLoading?: boolean;
}

export const ButtonWithLoading: FC<ButtonWithLoadingProps> = ({
  isLoading,
  children,
  ...buttonProps
}) => {
  return (
    <WhiteButton type={'button'} disabled={isLoading} {...buttonProps}>
      {isLoading ? (
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
      )}
    </WhiteButton>
  );
};
