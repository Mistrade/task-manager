import React, {FC} from "react";
import styled from "styled-components";
import {ShortEventItem} from "../../../../../../store/api/taskApi/types";
import {CalendarItem, GlobalTaskListProps, OnSelectTaskFnType} from "../../../../types";
import {CalendarCellEventItem} from "./Item";


const CalendarCellEventsListContainer = styled('div')`
  & {
    display: flex;
    flex-direction: column;
    width: 100%;
    //max-height: 30vh;
    overflow-y: auto;
    overflow-x: hidden;
    scroll-behavior: unset;
    transition: all .3s ease;
  }
`

export interface CalendarCellEventsListProps extends Omit<GlobalTaskListProps, 'renderTaskCount'> {
	tasks?: Array<ShortEventItem>,
	date: CalendarItem,
	onSelect?: OnSelectTaskFnType,
}

export const CalendarCellEventsList: FC<CalendarCellEventsListProps> = ({
																											tasks = [],
																											date,
																											onSelect,
																										}) => {
	if (!!tasks?.length) {
		return (
			<CalendarCellEventsListContainer>
				{tasks.map((item, index) => (
					<CalendarCellEventItem
						key={item.title + index}
						taskInfo={item}
						date={date}
						onSelect={onSelect}
					/>
				))}
			</CalendarCellEventsListContainer>
		)
	}
	
	return <></>
}