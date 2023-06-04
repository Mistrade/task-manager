import { FlexBlock } from '@components/LayoutComponents';
import { defaultColor } from '@src/common/constants/constants';
import { borderRadiusSize } from '@src/common/css/mixins';
import { kitColors } from 'chernikov-kit';
import * as React from 'react';
import { FC, ReactNode } from 'react';
import { css } from 'styled-components';


interface SessionFormContainerProps {
  children: ReactNode;
  handleSubmit?: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  elementsGap?: number;
}

export const SessionFormContainer: FC<SessionFormContainerProps> = ({
  children,
  handleSubmit,
  elementsGap = 24,
}) => {
  return (
    <FlexBlock width={'100%'} justify={'center'} pt={'3rem'}>
      <form onSubmit={handleSubmit}>
        <FlexBlock
          direction={'column'}
          maxWidth={'50rem'}
          minWidth={'30rem'}
          p={'24px 16px'}
          bgColor={'#fff'}
          border={`1px solid ${kitColors.primary}`}
          borderRadius={borderRadiusSize.xs}
          additionalCss={css`
            box-shadow: 0px 2px 5px ${defaultColor};
          `}
          gap={elementsGap}
        >
          {children}
        </FlexBlock>
      </form>
    </FlexBlock>
  );
};