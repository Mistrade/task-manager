import React, { FC } from 'react';
import { css, keyframes } from 'styled-components';

import { disabledColor } from '@src/common/constants/constants';
import { disableReRender } from '@src/common/utils/react-utils';
import { TestIdList } from '@src/utils/test/testid-list';

import { FlexBlock } from '@components/LayoutComponents';

import { DefaultAnimationTimingFn } from '../../../common/constants/styles';
import { MainHeaderBody } from './Body';

const animation = keyframes`
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const MainHeader: FC = React.memo(() => {
  return (
    <FlexBlock
      data-testid={TestIdList['MAIN_HEADER']}
      direction={'column'}
      bgColor={'#fff'}
      additionalCss={css`
        box-shadow: 0px -5px 30px 2px ${disabledColor};
        z-index: 10;
        animation: ${animation} 0.25s ${DefaultAnimationTimingFn} forwards;
      `}
      minHeight={70}
      basis={'70px'}
      pt={12}
      pb={12}
      gap={12}
      shrink={0}
    >
      <MainHeaderBody />
    </FlexBlock>
  );
}, disableReRender);
