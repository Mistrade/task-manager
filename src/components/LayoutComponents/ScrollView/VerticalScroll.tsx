import { ReactNode, forwardRef, useRef } from 'react';
import { useIntersection } from 'react-use';
import styled from 'styled-components';

import {
  FlexBlock,
  FlexBlockProps,
} from '@components/LayoutComponents/FlexBlock';
import { hideScrollBar } from '@components/Switcher/Switcher';

import Shadow from '../../Shadow/Inline';

export interface ScrollVerticalViewProps {
  children: ReactNode;
  placementStatic?: 'top' | 'bottom';
  gap?: number;
  staticContent?: ReactNode;
  renderPattern?: 'bottom-top' | 'top-bottom';
  containerProps?: FlexBlockProps;
  useShadow?: boolean;
  scrollContainerProps?: FlexBlockProps;
  intersectionProps?: { topMargin?: string; bottomMargin?: string };
}

const Container = styled(FlexBlock)<
  Pick<ScrollVerticalViewProps, 'renderPattern'>
>`
  position: relative;
  height: 100%;
  width: 100%;
  flex-grow: 0;
  flex-direction: ${(_) =>
    _.renderPattern === 'top-bottom' ? 'column' : 'column-reverse'};
  overflow-x: hidden;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
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

export const VerticalScroll = forwardRef<
  HTMLDivElement,
  ScrollVerticalViewProps
>(
  (
    {
      children,
      placementStatic,
      staticContent,
      gap,
      renderPattern = 'bottom-top',
      containerProps,
      useShadow = false,
      scrollContainerProps,
      intersectionProps,
    },
    ref
  ) => {
    const root = useRef<HTMLDivElement>(null);
    const topRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const topIntersection = useIntersection(topRef, {
      root: root.current,
      rootMargin: intersectionProps?.topMargin || '0px',
      threshold: 0,
    });

    const bottomIntersection = useIntersection(bottomRef, {
      root: root.current,
      rootMargin: intersectionProps?.bottomMargin || '0px',
      threshold: 0,
    });

    return (
      <FlexBlock
        {...containerProps}
        width={'100%'}
        basis={'100%'}
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
              placement={renderPattern === 'top-bottom' ? 'top' : 'bottom'}
              visible={
                !topIntersection?.isIntersecting && !!topIntersection?.target
              }
            />
          )}
          <Container
            p={'10px 0px'}
            {...scrollContainerProps}
            renderPattern={renderPattern || 'bottom-top'}
            ref={ref}
          >
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
              placement={renderPattern === 'top-bottom' ? 'bottom' : 'top'}
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
