import {
  borderRadiusSize,
  currentColor,
  darkColor,
  disabledColor,
  pageHeaderColor,
} from '@src/common/constants';
import { css } from 'styled-components';
import {
  FlexBlock,
  FlexBlockProps,
} from '@components/LayoutComponents/FlexBlock';
import { Heading } from '@components/Text/Heading';
import { FC, ReactNode } from 'react';
import { ConnectChainsType } from '../event-chains.types';

export interface ConnectChainsCardObject {
  type: ConnectChainsType;
  icon: (attr: FlexBlockProps) => ReactNode;
  title: ReactNode;
  description: ReactNode;
}

export interface ConnectChainsCardProps extends ConnectChainsCardObject {}

export const ConnectChainsCard: FC<ConnectChainsCardProps> = ({
  icon,
  title,
  description,
  type,
}) => {
  return (
    <FlexBlock
      width={'100%'}
      height={'100%'}
      minWidth={200}
      border={`2px solid ${disabledColor}`}
      overflow={'hidden'}
      direction={'column'}
      align={'center'}
      borderRadius={borderRadiusSize.sm}
      additionalCss={css`
        transition: all 0.2s ease-in;

        &:hover {
          box-shadow: 0px 8px 20px 10px ${disabledColor};
          cursor: pointer;
        }
      `}
    >
      <FlexBlock
        borderBottom={`1px solid ${disabledColor}`}
        width={'100%'}
        justify={'center'}
        align={'center'}
        pt={12}
        pl={12}
        pr={12}
        pb={12}
      >
        {icon({ width: 180, height: 180 })}
      </FlexBlock>
      <FlexBlock
        justify={'flex-start'}
        bgColor={pageHeaderColor}
        width={'100%'}
        p={12}
        gap={12}
        direction={'column'}
        grow={3}
      >
        <Heading.H3 style={{ color: currentColor, textAlign: 'center' }}>
          {title}
        </Heading.H3>
        <FlexBlock
          fSize={15}
          justify={'center'}
          style={{ color: darkColor, textAlign: 'center' }}
        >
          {description}
        </FlexBlock>
      </FlexBlock>
    </FlexBlock>
  );
};
