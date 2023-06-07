import { kitColors } from 'chernikov-kit';
import { FC, ReactNode } from 'react';

import { borderRadiusSize } from '@src/common/css/mixins';

import { FlexBlock } from '@components/LayoutComponents';
import { FlexBlockProps } from '@components/LayoutComponents/FlexBlock';


export const Informer: FC<{ children: ReactNode } & FlexBlockProps> = ({
  children,
  ...flexBlockProps
}) => {
  return (
    <FlexBlock
      mb={12}
      justify={'flex-start'}
      width={'100%'}
      maxWidth={'100%'}
      borderRadius={borderRadiusSize.xs}
      p={16}
      border={`1px solid ${kitColors.primary}`}
      bgColor={kitColors.primaryGhost}
      {...flexBlockProps}
    >
      {children}
    </FlexBlock>
  );
};