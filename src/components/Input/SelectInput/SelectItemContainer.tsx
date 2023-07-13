import { FlexBlockProps } from '../../LayoutComponents/FlexBlock';
import { FlexBlock } from '@components/LayoutComponents';
import { FCWithChildren } from '@planner/types';
import { hoverColor } from '@src/common/constants/constants';
import { borderRadiusSize, HoverElementMixin } from '@src/common/css/mixins';
import React from 'react';
import { css } from 'styled-components';


export const SelectItemContainer: FCWithChildren<
  {
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    isSelected?: boolean;
  } & FlexBlockProps
> = ({ onClick, children, isSelected, ...flexBlockProps }) => {
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
        {...flexBlockProps}
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