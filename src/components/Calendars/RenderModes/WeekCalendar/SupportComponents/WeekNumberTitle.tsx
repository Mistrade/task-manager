import styled from "styled-components";
import {
	borderRadiusSize,
	defaultColor,
	disabledColor,
	lightHoverColor,
	pageHeaderColor
} from "../../../../../common/constants";
import {EmptyButtonStyled} from "../../../../Buttons/EmptyButton.styled";
import {FC} from "react";
import {Badge} from "../../../../Badge/Badge";
import {WeekItem} from "../../../types";


const WeekOfYearTitle = styled('h3')`
  & {
    font-size: 20px;
    width: calc(100% + 16px);
    text-align: left;
    gap: 8px;
    color: ${disabledColor};
    background-color: #fff;
    z-index: 9;
    position: sticky;
    top: 0;
    left: 0;
    cursor: pointer;
    transition: all .3s ease-in-out;
    margin-left: -8px;
    margin-right: -8px;
    padding-left: 8px;
    padding-right: 8px;
    align-items: center;
  }
`

const SpaceBetweenContainer = styled('div')<Pick<WeekNumberTitleProps, 'isVisibleState'>>`
  & {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: ${_ => _.isVisibleState ? `8px` : `0px`};
    align-items: center;
  }
`

const WeekNumberTextContainer = styled('div')`
  & {
    display: flex;
    width: 100%;
    padding: 4px 0 4px 8px;
    color: ${defaultColor};
    gap: 6px;
    align-items: center;
  }

  & {
    color: ${defaultColor};
  }

  &:hover {
    background-color: ${lightHoverColor};
    border-radius: ${borderRadiusSize.xs};
  }
`

const WeekNumberBadge = styled(Badge)`
  font-size: 18px;
  color: ${defaultColor};
  background-color: ${pageHeaderColor};
`

const HideOrShowButton = styled(EmptyButtonStyled)`
  color: ${defaultColor}
`

interface WeekNumberTitleProps {
	onClickTitle?: () => void,
	isVisibleState: boolean,
	weekItem: WeekItem,
	onHideOrShow?: () => void
}

export const WeekNumberTitle: FC<WeekNumberTitleProps> = ({onClickTitle, isVisibleState, weekItem, onHideOrShow}) => {
	return (
		<WeekOfYearTitle
			onClick={() => onClickTitle && onClickTitle()}
		>
			<SpaceBetweenContainer
				isVisibleState={isVisibleState}
			>
				<WeekNumberTextContainer>
					{[
						'неделя',
						<WeekNumberBadge>
							{weekItem.weekOfYear}
						</WeekNumberBadge>
					]}
				</WeekNumberTextContainer>
				<HideOrShowButton
					onClick={(e) => {
						e.stopPropagation()
						onHideOrShow && onHideOrShow()
					}}
				>
					{isVisibleState ? 'Скрыть' : 'Показать'}
				</HideOrShowButton>
			</SpaceBetweenContainer>
		</WeekOfYearTitle>
	)
}