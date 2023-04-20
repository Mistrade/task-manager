import styled, { css } from 'styled-components';

import {
  currentColor,
  darkColor,
  defaultColor,
  disabledColor,
  hoverColor,
  orangeColor,
} from '@src/common/constants/constants';
import { borderRadiusSize } from '@src/common/css/mixins';

import { FlexBlock } from '@components/LayoutComponents';

export const SmallMonthWeekCount = styled(FlexBlock)`
  justify-content: center;
  align-items: center;
  width: 25px;
  //height: 25px;
  border-right: 1px solid ${defaultColor};
  background-color: transparent;
`;

export interface SmallMonthRowItemProps {
  isDisabled?: boolean;
  isToday?: boolean;
  isSelect?: boolean;
  hasTasks?: boolean;
  isPoured?: boolean;
  isLastPoured?: boolean;
  isFirstPoured?: boolean;
}

export interface SmallMonthRowProps {
  isPoured?: boolean;
}

export const isSelectRowItem = css`
  & {
    border-radius: ${borderRadiusSize.xs};
    color: #fff;
    background-color: ${currentColor};
  }
`;

export const isTodayRowItem = css`
  & {
    border-radius: ${borderRadiusSize.xs};
    color: #fff;
    background-color: ${orangeColor};
  }
`;

export const hasTasksRowItem = css`
  & {
    border-radius: ${borderRadiusSize.xs};
    background-color: ${hoverColor};
  }
`;

export const SmallMonthRowItem = styled('div')<SmallMonthRowItemProps>`
  & {
    z-index: 1;
    position: relative;
    font-size: 15px;
    line-height: 1;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    cursor: pointer;
    color: ${(_) => (_.isDisabled ? disabledColor : darkColor)};
  }

  ${(_) => _.hasTasks && hasTasksRowItem}
  ${(_) => _.isSelect && isSelectRowItem}
  ${(_) => _.isToday && isTodayRowItem}
`;

export const SmallMonthRow = styled('div')<SmallMonthRowProps>`
  & {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: fit-content;
    flex-wrap: nowrap;
    gap: 4px;
    padding: 0px;
    justify-content: flex-start;
    align-items: center;
  }

  & .row--item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    //height: 25px;
  }
`;
