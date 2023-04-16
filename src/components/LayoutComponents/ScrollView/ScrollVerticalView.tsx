import { ReactNode, memo } from 'react';
import styled, { css } from 'styled-components';

import {
  FlexBlock,
  FlexBlockProps,
} from '@components/LayoutComponents/FlexBlock';
import { hideScrollBar } from '@components/Switcher/Switcher';

import { FCWithChildren } from '@planner/planner.types';

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

export const ScrollVerticalView: FCWithChildren<ScrollVerticalViewProps> = memo(
  ({
    children,
    placementStatic,
    staticContent,
    gap,
    renderPattern = 'bottom-top',
    containerProps,
  }) => {
    return (
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
        <Container renderPattern={renderPattern || 'bottom-top'}>
          {children}
        </Container>
        {placementStatic === 'bottom' && staticContent && (
          <StaticContainer>{staticContent}</StaticContainer>
        )}
      </FlexBlock>
    );
  }
);
