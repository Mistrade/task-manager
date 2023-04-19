import { FC } from 'react';
import styled, { css } from 'styled-components';

import {
  colorPalette,
  disabledColor,
  errorColor,
} from '@src/common/constants/constants';
import { borderRadiusSize } from '@src/common/css/mixins';

import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { SelectIcon } from '@components/Icons/Icons';

import { GroupLogo } from '@pages/planner/Groups/GroupList.styled';

interface ColorSchemeProps {
  gap: number | string;
  size: number;
  onSelect?: (color: string) => void;
  isError?: boolean;
  selectedValue: string;
}

const Grid = styled('div')<{ gap?: number | string; borderColor?: string }>`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  padding: 8px;
  border-radius: ${borderRadiusSize.xs};
  border: 1px solid ${(_) => _.borderColor || disabledColor};
  width: 100%;
  justify-items: center;
  align-items: center;
`;

export const ColorScheme: FC<ColorSchemeProps> = ({
  gap = 6,
  size = 30,
  onSelect,
  isError,
  selectedValue,
}) => {
  return (
    <Grid gap={gap} borderColor={isError ? errorColor : disabledColor}>
      {colorPalette.map((color) => (
        <EmptyButtonStyled
          key={color}
          style={{ padding: 4 }}
          onClick={() => onSelect && onSelect(color)}
        >
          {color.toLowerCase() === selectedValue.toLowerCase() && (
            <SelectIcon
              position={'absolute'}
              width={'100%'}
              height={'100%'}
              justify={'center'}
              align={'center'}
              color={'#fff'}
              size={20}
              additionalCss={css`
                top: 50%;
                left: 50%;
                transform: translateY(-50%) translateX(-50%);
              `}
            />
          )}
          <GroupLogo color={color} size={size} />
        </EmptyButtonStyled>
      ))}
    </Grid>
  );
};
