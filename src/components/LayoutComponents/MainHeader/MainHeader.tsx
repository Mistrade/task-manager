import React, { FC } from 'react';
import { FlexBlock } from '../FlexBlock';
import { disabledColor, hoverColor } from '../../../common/constants';
import { css } from 'styled-components';
import { MainHeaderBody } from './MainHeaderBody';
import { TestIdList } from '../../../utils/test/testid-list';

export const MainHeader: FC = () => {
  return (
    <FlexBlock
      data-testid={TestIdList['MAIN_HEADER']}
      direction={'column'}
      bgColor={hoverColor}
      borderBottom={`1px solid ${disabledColor}`}
      additionalCss={css`
        box-shadow: 0px 5px 5px ${disabledColor};
        z-index: 5;
      `}
      height={70}
      pl={24}
      pr={24}
      pt={12}
      pb={12}
      gap={12}
    >
      <MainHeaderBody />
    </FlexBlock>
  );
};
