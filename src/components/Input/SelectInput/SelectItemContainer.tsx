import React from 'react';
import { css } from 'styled-components';

import { hoverColor } from '@src/common/constants/constants';
import { HoverElementMixin, borderRadiusSize } from '@src/common/css/mixins';

import { FlexBlock } from '@components/LayoutComponents';

import { FCWithChildren } from '@planner/types';

export const SelectItemContainer: FCWithChildren<{
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  isSelected?: boolean;
}> = ({ onClick, children, isSelected }) => {
  if (children) {
    return (
      <FlexBlock
        p={'4px 8px'}
        borderRadius={borderRadiusSize.xs}
        additionalCss={css`
          ${isSelected &&
          css`
            color: #000;
            background-color: ${hoverColor};
          `}
          &:not(:last-child) {
            margin-bottom: 4px;
          }

          color: #000;

          ${HoverElementMixin}
        `}
        width={'100%'}
        onClick={onClick}
      >
        <FlexBlock
          direction={'row'}
          gap={6}
          width={'100%'}
          wrap={'nowrap'}
          align={'center'}
        >
          {children}
        </FlexBlock>
      </FlexBlock>
    );
  }

  return <></>;
};
