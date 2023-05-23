import React, { ReactNode, useRef } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { useIntersection } from 'react-use';
import { css } from 'styled-components';

import { currentColor } from '@src/common/constants/constants';

import { FlexBlock } from '@components/LayoutComponents';

import { SwitchCalendarModeTab } from '@planner/styled';

import { EmptyButtonStyled } from '../Buttons/EmptyButton.styled';
import { Arrow } from '../Icons/Icons';
import Shadow from '../Shadow/Inline';
import { CutText, PreviewDescriptionProps } from '../Text/Text';

export interface SwitcherItem<KEY> {
  title: string;
  type: KEY;
}

export type SwitcherBadges<KEY extends string = string> = {
  [key in KEY]?: number;
};

export interface SwitcherProps<T extends string = string> {
  useShadow?: boolean;
  switchersList: Array<SwitcherItem<T>>;
  onClick: (item: SwitcherItem<T>) => void;
  selected?: T;
  badges?: SwitcherBadges<T> | null;
  isLoading?: boolean;
  children?: ReactNode;
  component?: (props: {
    item: SwitcherItem<T>;
    onClick: SwitcherProps<T>['onClick'];
  }) => ReactNode;
  tabProps?: PreviewDescriptionProps;
  scrollOptions?: {
    scrollStepInPx?: number;
    buttonColor?: string;
  };
}

export const hideScrollBar = css`
  &::-webkit-scrollbar {
    display: none;
  }

  & {
    -ms-overflow-style: none; /* IE и Edge */
    scrollbar-width: none; /* Firefox */
  }
`;

export function Switcher<T extends string = string>(props: SwitcherProps<T>) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const nonRightViewRef = useRef<HTMLDivElement>(null);
  const observerRight = useIntersection(nonRightViewRef, {
    rootMargin: '0px 32px 0px 0px',
    threshold: 0,
    root: scrollContainerRef.current,
  });
  const nonViewLeftRef = useRef<HTMLDivElement>(null);
  const observerLeft = useIntersection(nonViewLeftRef, {
    rootMargin: '0px 0px 0px 32px',
    threshold: 0,
    root: scrollContainerRef.current,
  });

  return (
    <FlexBlock
      justify={'space-between'}
      align={'flex-end'}
      height={40}
      width={'100%'}
      shrink={0}
    >
      <FlexBlock grow={3} overflow={'hidden'} position={'relative'}>
        {!observerLeft?.isIntersecting && observerLeft?.target && (
          <>
            <FlexBlock
              position={'absolute'}
              style={{
                left: 0,
                top: 0,
                bottom: 0,
                zIndex: 10,
              }}
              justify={'center'}
              align={'center'}
              bgColor={props.scrollOptions?.buttonColor || '#fff'}
              pl={4}
              pr={4}
            >
              <EmptyButtonStyled
                onClick={() => {
                  if (scrollContainerRef.current) {
                    scrollContainerRef.current.scrollLeft -=
                      props.scrollOptions?.scrollStepInPx || 150;
                  }
                }}
              >
                <Arrow size={20} transform={'rotate(180deg)'} />
              </EmptyButtonStyled>
            </FlexBlock>
          </>
        )}
        <FlexBlock
          width={'100%'}
          overflowX={'scroll'}
          overflowY={'hidden'}
          ref={scrollContainerRef}
          additionalCss={css`
            scroll-behavior: smooth;
            scroll-snap-type: x mandatory;
            ${hideScrollBar};
          `}
        >
          {props.useShadow &&
            !observerLeft?.isIntersecting &&
            observerLeft?.target && (
              <Shadow visible={true} placement={'left'} offset={25} />
            )}
          <FlexBlock width={'fit-content'}>
            <div style={{ width: 0, height: 0 }} ref={nonViewLeftRef} />
            {props.switchersList.map((item, index) =>
              props.component ? (
                props.component({
                  item,
                  onClick: props.onClick,
                })
              ) : (
                <SwitchCalendarModeTab
                  delayByStepMs={50}
                  animationIndex={index}
                  data-number={index}
                  type={'button'}
                  key={item.type}
                  title={item.title}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                    props.onClick(item);

                    const target = event.target as HTMLButtonElement;

                    target.scrollIntoView({
                      inline: 'center',
                      block: 'nearest',
                      behavior: 'smooth',
                    });
                  }}
                  isSelected={item.type === props.selected}
                >
                  <CutText rows={1} fontSize={15} {...props.tabProps}>
                    {item.title}
                  </CutText>
                </SwitchCalendarModeTab>
              )
            )}
            <div style={{ width: 0, height: 0 }} ref={nonRightViewRef} />
          </FlexBlock>
          {props.useShadow &&
            !observerRight?.isIntersecting &&
            observerRight?.target && (
              <Shadow visible={true} placement={'right'} offset={25} />
            )}
        </FlexBlock>
        {!observerRight?.isIntersecting && observerRight?.target && (
          <FlexBlock
            position={'absolute'}
            style={{ right: 0, top: 0, height: '100%', zIndex: 1 }}
            justify={'center'}
            align={'center'}
            bgColor={props.scrollOptions?.buttonColor || '#fff'}
            pl={4}
            pr={4}
          >
            <EmptyButtonStyled
              onClick={() => {
                console.log(
                  scrollContainerRef.current?.scrollWidth,
                  scrollContainerRef.current?.scrollLeft
                );
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollLeft +=
                    props.scrollOptions?.scrollStepInPx || 150;
                }
                console.log(
                  scrollContainerRef.current?.scrollWidth,
                  scrollContainerRef.current?.scrollLeft
                );
                console.log('-----разрыв-----');
              }}
            >
              <Arrow size={20} />
            </EmptyButtonStyled>
          </FlexBlock>
        )}
      </FlexBlock>

      <FlexBlock align={'center'} gap={6}>
        {props.isLoading && (
          <ColorRing
            visible={true}
            height='35'
            width='35'
            ariaLabel='blocks-loading'
            wrapperStyle={{}}
            wrapperClass='blocks-wrapper'
            colors={[
              currentColor,
              currentColor,
              currentColor,
              currentColor,
              currentColor,
            ]}
          />
        )}
        {props.children && <FlexBlock>{props.children}</FlexBlock>}
      </FlexBlock>
    </FlexBlock>
  );
}
