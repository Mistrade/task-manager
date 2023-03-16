import { currentColor, disabledColor } from '../../common/constants';
import { SwitchCalendarModeTab } from '../../pages/Planner/Planner.styled';
import { FlexBlock } from '../LayoutComponents/FlexBlock';
import React, { ReactNode } from 'react';
import { Badge } from '../Badge/Badge';
import { ColorRing } from 'react-loader-spinner';

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
  selected: T;
  badges?: SwitcherBadges<T> | null;
  isLoading?: boolean;
  children?: ReactNode;
}

export function Switcher<T extends string = string>(props: SwitcherProps<T>) {
  return (
    <FlexBlock
      borderBottom={`1px solid ${disabledColor}`}
      justify={'space-between'}
      align={'flex-end'}
      height={'fit-content'}
      width={'100%'}
    >
      <FlexBlock>
        {props.switchersList.map((item) => (
          <SwitchCalendarModeTab
            type={'button'}
            key={item.type}
            onClick={() => props.onClick(item)}
            isSelected={item.type === props.selected}
          >
            <span>{item.title}</span>
            {props.badges &&
            props.badges[item.type] &&
            props.badges[item.type] > 0 ? (
              <Badge style={{ marginLeft: 4 }}>{props.badges[item.type]}</Badge>
            ) : (
              <></>
            )}
          </SwitchCalendarModeTab>
        ))}
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
