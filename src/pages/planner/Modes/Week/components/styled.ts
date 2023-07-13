import styled, {
  FlattenSimpleInterpolation,
  css,
  keyframes,
} from 'styled-components';

import {
  currentColor,
  darkColor,
  defaultColor,
  disabledColor,
  hoverColor,
} from '../../../../../common/constants/constants';
import { DefaultAnimationTimingFn } from '../../../../../common/constants/styles';
import { borderRadiusSize } from '../../../../../common/css/mixins';
import { CalendarCellStyledComponentProps } from './CalendarCell/Cell.styled';
import { IStyledWeekDayTileProps } from './types';


const isCurrentTileFn = (): FlattenSimpleInterpolation => {
  return css`
    border: 1px solid ${currentColor};
  `;
};

const isFullHeightFn = (
  props: IStyledWeekDayTileProps
): FlattenSimpleInterpolation => {
  if (props.fullHeight) {
    return css`
      max-height: 100%;
      overflow: hidden;
    `;
  }

  return css``;
};

const animationKeyframe = keyframes`
  from {
    transform: translateX(-15px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

export interface StepByStepAnimationProps {
  animationIndex?: number;
  delayByStepMs?: number;
}

export const stepByStepAnimation = (props: StepByStepAnimationProps) => css`
  opacity: 0;
  animation: ${animationKeyframe} 0.25s ${DefaultAnimationTimingFn} forwards;
  animation-delay: ${(props.animationIndex || 0) *
  (props.delayByStepMs || 80)}ms;
  z-index: 0;
`;

export const StyledWeekDayTile = styled('div')<IStyledWeekDayTileProps>`
  width: 100%;
  display: flex;
  padding-top: 4px;
  padding-bottom: 4px;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  border-radius: ${borderRadiusSize.sm};
  box-shadow: none;
  border: 1px solid ${defaultColor};
  transition: all 0.3s ease-in-out;
  gap: 4px;
  scroll-snap-type: y mandatory;
  ${stepByStepAnimation};

  ${(_) => _.isCurrentTile && isCurrentTileFn()}
  ${(_) => isFullHeightFn(_)}
`;

export const StyledWeekDayEventList = styled('ul')`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

export const StyledWeekDayEventItem = styled('li')`
  list-style: none;
  padding: 0;
  width: 100%;
`;

interface EventContainerProps extends CalendarCellStyledComponentProps {
  withFill?: boolean;
  fillColor?: string;
}

const EventAnimation = keyframes`
  from {
    opacity: .1;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export const EventContainer = styled('div')<EventContainerProps>`
  & {
    gap: 4px;
    color: ${darkColor};
    background-color: ${(props) =>
      props.withFill ? props.fillColor || hoverColor : ''};
    width: 100%;
    padding: 5px 7px;
    text-align: center;
    //border-radius: ${borderRadiusSize.sm};
    opacity: ${(props) => (props.disabled ? 0.2 : 1)};
    display: flex;
    flex-wrap: nowrap;
    cursor: pointer;
    flex-direction: column;
    animation: ${EventAnimation} 0.3s ${DefaultAnimationTimingFn} forwards;
    transition: all 0.3s ease-in;
    max-height: fit-content;
    height: auto;
    border-top: 1px solid ${disabledColor};
    border-bottom: 1px solid ${disabledColor};
  }
`;
export const BaseWeekContainer = styled('div')`
  position: relative;
  grid-column-start: 1;
  grid-column-end: 8;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  transition: all 0.3s ease-in;
  border: 1px solid transparent;
  padding-top: 12px;
`;
export const FullHeightWeekContainer = styled(BaseWeekContainer)`
  height: 100%;
`;
export const WeekDaysContainer = styled('div')`
  z-index: 0;
  display: grid;
  height: 100%;
  grid-template-columns: repeat(7, minmax(80px, 1fr));
  grid-column-gap: 4px;
  width: 100%;
  transition: all 0.3s ease-in;
`;