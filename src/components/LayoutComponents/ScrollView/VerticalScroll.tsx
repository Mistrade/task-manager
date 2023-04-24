import { ReactNode, memo, useRef } from 'react';
import { useIntersection } from 'react-use';
import styled, { css } from 'styled-components';

import { disabledColor, shadowColor } from '@src/common/constants/constants';

import {
  FlexBlock,
  FlexBlockProps,
} from '@components/LayoutComponents/FlexBlock';
import { hideScrollBar } from '@components/Switcher/Switcher';

import { FCWithChildren } from '@planner/types';

export interface ScrollVerticalViewProps {
  placementStatic?: 'top' | 'bottom';
  gap?: number;
  staticContent?: ReactNode;
  renderPattern?: 'bottom-top' | 'top-bottom';
  containerProps?: FlexBlockProps;
  useShadow?: boolean;
}

const Container = styled('div')<Pick<ScrollVerticalViewProps, 'renderPattern'>>`
  position: relative;
  height: 100%;
  width: 100%;
  flex-grow: 0;
  display: flex;
  //margin-left: -6px;
  //margin-right: -6px;
  padding: 10px 0px;
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

const Shadow = styled('div')<{ placement: 'top' | 'bottom'; visible: boolean }>`
  pointer-events: none;
  position: absolute;
  z-index: 1;
  ${(_) =>
    _.placement === 'top'
      ? css`
          top: 0;
        `
      : css`
          bottom: 0;
        `}
  left: 0;
  right: 0;
  height: ${(_) => (_.visible ? '20px' : '0px')};
  transition: all 0.3s ease-in-out;
  ${({ visible, placement }) =>
    visible &&
    css`
      box-shadow: 0px ${placement === 'top' ? '0px' : '0px'} 15px 10px
        ${disabledColor};
    `}
  background: ${(_) =>
    _.placement === 'top'
      ? `linear-gradient(to bottom, ${shadowColor}, ${disabledColor})`
      : `linear-gradient(to top, ${shadowColor}, ${disabledColor})`};
`;

export const VerticalScroll: FCWithChildren<ScrollVerticalViewProps> = memo(
  ({
    children,
    placementStatic,
    staticContent,
    gap,
    renderPattern = 'bottom-top',
    containerProps,
    useShadow = false,
  }) => {
    const root = useRef<HTMLDivElement>(null);
    const topRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const topIntersection = useIntersection(topRef, {
      root: root.current,
      rootMargin: '50px',
      threshold: 0,
    });

    const bottomIntersection = useIntersection(bottomRef, {
      root: root.current,
      rootMargin: '50px',
      threshold: 0,
    });

    return (
      <FlexBlock
        {...containerProps}
        width={'100%'}
        height={'100%'}
        position={'relative'}
        direction={'column'}
        gap={gap}
        className={'scroll--vertical__view'}
        ref={root}
      >
        {placementStatic === 'top' && staticContent && (
          <StaticContainer>{staticContent}</StaticContainer>
        )}
        <FlexBlock
          position={'relative'}
          height={'100%'}
          overflow={'hidden'}
          width={'100%'}
        >
          {useShadow && (
            <Shadow
              placement={'top'}
              visible={
                !topIntersection?.isIntersecting && !!topIntersection?.target
              }
            />
          )}
          <Container renderPattern={renderPattern || 'bottom-top'}>
            {useShadow && <div ref={topRef} />}
            {children}
            {useShadow && <div ref={bottomRef} />}
          </Container>
          {useShadow && (
            <Shadow
              visible={
                !bottomIntersection?.isIntersecting &&
                !!bottomIntersection?.target
              }
              placement={'bottom'}
            />
          )}
        </FlexBlock>
        {placementStatic === 'bottom' && staticContent && (
          <StaticContainer>{staticContent}</StaticContainer>
        )}
      </FlexBlock>
    );
  }
);
