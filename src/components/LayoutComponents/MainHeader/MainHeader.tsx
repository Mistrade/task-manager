import React, { FC } from 'react';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { disabledColor } from '@src/common/constants';
import { css } from 'styled-components';
import { MainHeaderBody } from './MainHeaderBody';
import { TestIdList } from '@src/utils/test/testid-list';
import { disableReRender } from '@src/common/utils/react-utils';

export const MainHeader: FC = React.memo(() => {
  return (
    <FlexBlock
      data-testid={TestIdList['MAIN_HEADER']}
      direction={'column'}
      bgColor={'#fff'}
      additionalCss={css`
        box-shadow: 0px -5px 30px 2px ${disabledColor};
        z-index: 1;
      `}
      minHeight={70}
      basis={'70px'}
      pl={24}
      pr={24}
      pt={12}
      pb={12}
      gap={12}
      shrink={0}
      // grow={1}
    >
      <MainHeaderBody />
    </FlexBlock>
  );
}, disableReRender);
