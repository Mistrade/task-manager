import React, { ReactNode, useRef } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { useIntersection } from 'react-use';
import { css } from 'styled-components';

import { currentColor } from '@src/common/constants/constants';

import { FlexBlock } from '@components/LayoutComponents';

import { SwitchCalendarModeTab } from '@planner/Planner.styled';

import { EmptyButtonStyled } from '../Buttons/EmptyButton.styled';
import { Arrow } from '../Icons/Icons';

export interface SwitcherItem<KEY> {
  title: string;
  type: KEY;
}

export type SwitcherBadges<KEY extends string = string> = {
  [key in KEY]?: number;
};

export interface SwitcherProps<T extends string = string> {
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
    >
      <FlexBlock grow={3} overflow={'hidden'} position={'relative'}>
        {!observerLeft?.isIntersecting && observerLeft?.target && (
          <FlexBlock
            position={'absolute'}
            style={{ left: 0, top: 0, height: '100%', zIndex: 1 }}
            justify={'center'}
            align={'center'}
            bgColor={'#fff'}
          >
            <EmptyButtonStyled onClick={() => {}}>
              <Arrow size={20} transform={'rotate(180deg)'} />
            </EmptyButtonStyled>
          </FlexBlock>
        )}
        <FlexBlock
          width={'100%'}
          overflowX={'scroll'}
          overflowY={'hidden'}
          ref={scrollContainerRef}
          additionalCss={hideScrollBar}
        >
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
                  data-number={index}
                  type={'button'}
                  key={item.type}
                  onClick={() => props.onClick(item)}
                  isSelected={item.type === props.selected}
                >
                  {item.title}
                </SwitchCalendarModeTab>
              )
            )}
            <div style={{ width: 0, height: 0 }} ref={nonRightViewRef} />
          </FlexBlock>
        </FlexBlock>
        {!observerRight?.isIntersecting && observerRight?.target && (
          <FlexBlock
            position={'absolute'}
            style={{ right: 0, top: 0, height: '100%', zIndex: 1 }}
            justify={'center'}
            align={'center'}
            bgColor={'#fff'}
          >
            <EmptyButtonStyled onClick={() => {}}>
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
