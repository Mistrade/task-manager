import { TooltipIcon } from '@components/Icons/TooltipIcon';
import { FlexBlock } from '@components/LayoutComponents';
import { CutText, CutTextProps } from '@components/Text/Text';
import { kitColors, Tooltip, TooltipProps } from 'chernikov-kit';
import React, { FC, ReactNode } from 'react';


interface OperationHeaderCellProps {
  cellName: string;
  cellNameProps?: CutTextProps;
  withTooltip?: boolean;
  tooltipIcon?: ReactNode;
  tooltipProps?: TooltipProps;
  tooltipContent?: ReactNode;
}

export const OperationHeaderCell: FC<OperationHeaderCellProps> = ({
  cellName,
  cellNameProps,
  tooltipProps,
  withTooltip,
  tooltipIcon,
  tooltipContent,
}) => {
  return (
    <FlexBlock
      width={'100%'}
      gap={4}
      height={'100%'}
      align={'center'}
      pt={6}
      pb={6}
    >
      <CutText
        rows={1}
        fontSize={15}
        style={{ fontWeight: 'bold' }}
        {...cellNameProps}
      >
        {cellName}
      </CutText>
      {withTooltip && (
        <Tooltip
          content={tooltipContent}
          delay={100}
          theme={'light'}
          placement={'bottom'}
          size={15}
          containerStyles={{
            height: '100%',
            alignItems: 'center',
            display: 'flex',
          }}
          {...tooltipProps}
          children={
            tooltipIcon || <TooltipIcon size={15} color={kitColors.primary} />
          }
        />
      )}
    </FlexBlock>
  );
};