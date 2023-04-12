import { FCWithChildren } from '@planner/planner.types';
import { css } from 'styled-components';
import {
  FlexBlock,
  FlexBlockProps,
} from '@components/LayoutComponents/FlexBlock';

export const SelectListContainer: FCWithChildren<FlexBlockProps> = ({
  children,
  ...flexBlockProps
}) => {
  if (children) {
    return (
      <FlexBlock
        additionalCss={css`
          z-index: 9999;
        `}
        bgColor={'#fff'}
        maxHeight={400}
        width={'100%'}
        {...flexBlockProps}
        direction={'column'}
      >
        <FlexBlock
          // additionalCss={css`z-index: 2`}
          direction={'column'}
        >
          {children}
        </FlexBlock>
      </FlexBlock>
    );
  }

  return <></>;
};
