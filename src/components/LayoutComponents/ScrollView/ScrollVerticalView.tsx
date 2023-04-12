import { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { FCWithChildren } from '@planner/planner.types';
import {
  FlexBlock,
  FlexBlockProps,
} from '@components/LayoutComponents/FlexBlock';
import { hideScrollBar } from '@components/Switcher/Switcher';

export interface ScrollVerticalViewProps {
  placementStatic?: 'top' | 'bottom';
  gap?: number;
  staticContent?: ReactNode;
  renderPattern?: 'bottom-top' | 'top-bottom';
  containerProps?: FlexBlockProps;
}

const Container = styled('div')<Pick<ScrollVerticalViewProps, 'renderPattern'>>`
  height: 100%;
  flex-grow: 0;
  display: flex;
  margin-left: -6px;
  margin-right: -6px;
  padding: 10px 6px;
  flex-direction: ${(_) =>
    _.renderPattern === 'top-bottom' ? 'column' : 'column-reverse'};
  overflow-x: hidden;
  overflow-y: auto;
  ${hideScrollBar}
`;

Container.defaultProps = {
  className: 'scroll__view__horizontal--container',
};

const StaticContainer = styled('div')`
  width: 100%;
  flex-grow: 0;
`;

StaticContainer.defaultProps = {
  className: 'scroll__static--container',
};

export const ScrollVerticalView: FCWithChildren<ScrollVerticalViewProps> = ({
  children,
  placementStatic,
  staticContent,
  gap,
  renderPattern = 'bottom-top',
  containerProps,
}) => {
  return (
    // <FlexBlock direction={'column'} grow={10} shrink={0}>
    <FlexBlock
      {...containerProps}
      width={'100%'}
      height={'100%'}
      direction={'column'}
      gap={gap}
      className={'scroll--vertical__view'}
      additionalCss={css`
        z-index: 0;
      `}
    >
      {placementStatic === 'top' && staticContent && (
        <StaticContainer>{staticContent}</StaticContainer>
      )}
      {/*<MaxHeightHidden>*/}
      <Container renderPattern={renderPattern || 'bottom-top'}>
        {children}
      </Container>
      {/*</MaxHeightHidden>*/}
      {placementStatic === 'bottom' && staticContent && (
        <StaticContainer>{staticContent}</StaticContainer>
      )}
    </FlexBlock>
    // </FlexBlock>
  );
};
