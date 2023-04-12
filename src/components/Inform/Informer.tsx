import {
  borderRadiusSize,
  currentColor,
  hoverColor,
} from '@src/common/constants';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { FC, ReactNode } from 'react';

export const Informer: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <FlexBlock
      mb={12}
      justify={'flex-start'}
      width={'100%'}
      maxWidth={'100%'}
      borderRadius={borderRadiusSize.xs}
      p={16}
      border={`1px solid ${currentColor}`}
      bgColor={hoverColor}
    >
      {children}
    </FlexBlock>
  );
};
