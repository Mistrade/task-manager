import styled, {css} from "styled-components";
import {
	borderRadiusSize,
	currentColor,
	darkColor,
	defaultColor,
	disabledColor,
	hoverColor,
	lightHoverColor,
	orangeColor
} from "../../../common/constants";
import {FlexBlock} from "../../LayoutComponents/FlexBlock";


export const SmallMonthWeekCount = styled(FlexBlock)`
  justify-content: center;
  align-items: center;
  width: 25px;
  //height: 25px;
  border-right: 1px solid ${defaultColor};
  background-color: transparent;
`

export interface SmallMonthRowItemProps {
	isDisabled?: boolean,
	isToday?: boolean,
	isSelect?: boolean,
	hasTasks?: boolean,
	isPoured?: boolean,
	isLastPoured?: boolean,
	isFirstPoured?: boolean
}

export interface SmallMonthRowProps {
	isPoured?: boolean,
}


export const isPouredWeekCountItem = css`
  & {
    border-radius: ${borderRadiusSize.xs};
      //background-color: ${lightHoverColor};
    box-shadow: 0px 0px 10px 2px ${lightHoverColor};
    border: 1px solid ${defaultColor};
    margin-left: -4px;
    padding-left: 4px;
    margin-right: -4px;
    padding-right: 4px;
  }
`
export const isFirstPouredCss = css`
  & {
    margin-top: 6px;
    margin-bottom: 6px;
  }

  &:before {
    left: -4px;
    width: calc(100% + 3px);
    height: 100%;
    padding: 6px 0px;
    border-radius: ${borderRadiusSize.xs} 0px 0px ${borderRadiusSize.xs};
      //background-color: ${lightHoverColor};
    box-shadow: -2px 0px 10px 2px ${lightHoverColor};
    border-top: 1px solid ${defaultColor};
    border-bottom: 1px solid ${defaultColor};
    border-left: 1px solid ${defaultColor};
    border-right: none;
  }
`
export const isPouredCss = css`
  & {
    margin-top: 6px;
    margin-bottom: 6px;
  }

  &:before {
    height: 100%;
    padding: 6px 0px;
    border-radius: 0px;
      //background-color: ${lightHoverColor};
    box-shadow: 0px 0px 10px 2px ${lightHoverColor};
    border-top: 1px solid ${defaultColor};
    border-bottom: 1px solid ${defaultColor};
    border-left: none;
    border-right: none;
  }
`
export const isLastPouredCss = css`
  & {
    margin-top: 6px;
    margin-bottom: 6px;
  }

  &:before {
    right: -4px;
    width: calc(100% + 3px);
    height: 100%;
    padding: 6px 0px;
    border-radius: 0px ${borderRadiusSize.xs} ${borderRadiusSize.xs} 0px;
      //background-color: ${lightHoverColor};
    box-shadow: 2px 0px 10px 2px ${lightHoverColor};
    border-top: 1px solid ${defaultColor};
    border-bottom: 1px solid ${defaultColor};
    border-left: none;
    border-right: 1px solid ${defaultColor};
  }
`
export const isPouredDate = ({
															 isPoured,
															 isLastPoured,
															 isFirstPoured
														 }: Pick<SmallMonthRowItemProps, 'isPoured' | 'isLastPoured' | 'isFirstPoured'>) => css`
  &:before {
    position: absolute;
    top: -6px;
    left: 0;
    content: '';
    width: 100%;
    height: 100%;
  }

  ${(isFirstPoured && isFirstPouredCss) || (isPoured && isPouredCss) || (isLastPoured && isLastPouredCss)}
`

export const isSelectRowItem = css`
  & {
    border-radius: ${borderRadiusSize.xs};
    color: #fff;
    background-color: ${currentColor};
  }
`

export const isTodayRowItem = css`
  & {
    border-radius: ${borderRadiusSize.xs};
    color: #fff;
    background-color: ${orangeColor};
  }
`

export const hasTasksRowItem = css`
  & {
    border-radius: ${borderRadiusSize.xs};
    background-color: ${hoverColor};
  }
`


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
    color: ${_ => _.isDisabled ? disabledColor : darkColor};
  }

  ${_ => _.hasTasks && hasTasksRowItem}
  ${_ => _.isSelect && isSelectRowItem}
  ${_ => _.isToday && isTodayRowItem}
  ${_ => isPouredDate(_)}

`

export const SmallMonthRow = styled('div')<SmallMonthRowProps>`
  & {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: fit-content;
    flex-wrap: nowrap;
    gap: 4px;
    padding: ${_ => _.isPoured ? '6px 0px' : 'none'};
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

  ${_ => _.isPoured && isPouredWeekCountItem}

`