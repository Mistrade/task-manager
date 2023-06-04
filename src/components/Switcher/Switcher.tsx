import Badge, { BadgeProps } from '../Badge';
import { EmptyButtonStyled } from '../Buttons/EmptyButton.styled';
import { Arrow } from '../Icons/Icons';
import Shadow from '../Shadow/Inline';
import { CutText, CutTextProps } from '../Text/Text';
import { FlexBlock } from '@components/LayoutComponents';
import { SwitchCalendarModeTab } from '@planner/styled';
import { kitColors } from 'chernikov-kit';
import React, { ReactNode, useRef } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { useIntersection } from 'react-use';
import { css } from 'styled-components';


export interface SwitcherItem<KEY> {
  title: string;
  type: KEY;
}

export type SwitcherBadges<KEY extends string = string> = {
  [key in KEY]?: number | string;
};

export interface SwitcherProps<
  T extends string = string,
  Data extends SwitcherItem<T> = SwitcherItem<T>
> {
  useShadow?: boolean;
  switchersList: Array<Data>;
  onClick?: (item: Data) => void;
  selected?: T | string;
  badges?: SwitcherBadges<T> | null;
  badgeProps?: BadgeProps;
  isLoading?: boolean;
  children?: ReactNode;
  component?: (
    props: {
      item: Data;
      onClick: SwitcherProps<T, Data>['onClick'];
      badge: ReactNode;
      index: number;
    } & SwitcherProps<T, Data>
  ) => ReactNode;
  tabProps?: CutTextProps;
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

export function Switcher<
  T extends string = string,
  Data extends SwitcherItem<T> = SwitcherItem<T>
>(props: SwitcherProps<T, Data>) {
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

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <FlexBlock
      justify={'space-between'}
      align={'flex-end'}
      height={40}
      width={'100%'}
      shrink={0}
    >
      <FlexBlock
        grow={3}
        overflow={'hidden'}
        position={'relative'}
        ref={containerRef}
      >
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
                      (containerRef?.current?.offsetWidth || 0) * 0.5 ||
                      props.scrollOptions?.scrollStepInPx ||
                      150;
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
            overscroll-behavior: none;
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
            {props.switchersList.map((item, index) => {
              const badge = props.badges && props.badges[item.type] && (
                <Badge type={'primary'} {...props.badgeProps}>
                  {props.badges[item.type]}
                </Badge>
              );

              return props.component ? (
                <React.Fragment key={index}>
                  {props.component({
                    item,
                    onClick: props.onClick,
                    badge,
                    index,
                    ...props,
                  })}
                </React.Fragment>
              ) : (
                <SwitchCalendarModeTab
                  delayByStepMs={50}
                  animationIndex={index}
                  data-number={index}
                  type={'button'}
                  key={index}
                  title={item.title}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                    props.onClick && props.onClick(item);
                  }}
                  isSelected={item.type === props.selected}
                >
                  <CutText rows={1} fontSize={15} {...props.tabProps}>
                    {item.title}
                  </CutText>
                  {badge}
                </SwitchCalendarModeTab>
              );
            })}
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
                    (containerRef?.current?.offsetWidth || 0) * 0.5 ||
                    props.scrollOptions?.scrollStepInPx ||
                    150;
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
              kitColors.primary,
              kitColors.primary,
              kitColors.primary,
              kitColors.primary,
              kitColors.primary,
            ]}
          />
        )}
        {props.children && <FlexBlock>{props.children}</FlexBlock>}
      </FlexBlock>
    </FlexBlock>
  );
}