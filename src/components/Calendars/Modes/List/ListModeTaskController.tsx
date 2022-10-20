import {TaskStorage} from "../../types";
import {ShortEventItem} from "../../../../store/api/taskApi/types";
import {FC, useEffect, useMemo, useRef} from "react";
import dayjs from "dayjs";
import {FlexBlock} from "../../../LayoutComponents/FlexBlock";
import {getTaskListOfDay} from "../../../../common/functions";
import {DayTaskItem} from "../DayCalendar/TaskList/DayTaskItem";
import {disabledColor} from "../../../../common/constants";
import {CalendarTitle} from "../../Calendar.styled";
import {css} from "styled-components";
import {UseCalendarReturned} from "../../../../hooks/useCalendar";
import {useRemoveTaskMutation} from "../../../../store/api/taskApi/taskApi";

export interface ListModeTaskController {
	eventStorage?: TaskStorage<ShortEventItem>,
	fromDate: Date,
	toDate: Date,
	onSelectTask: UseCalendarReturned['onSelectTask']
}

function generator(fromDate: Date, toDate: Date): Array<Date> {
	let iterationDate = dayjs(fromDate).startOf('date')
	const result: Array<Date> = []
	while (iterationDate.isBetween(fromDate, toDate, 'date', '[]')) {
		result.push(iterationDate.toDate())
		iterationDate = iterationDate.add(1, 'day')
	}
	
	return result
}

export const ListModeTaskController: FC<ListModeTaskController> = ({eventStorage, fromDate, toDate, onSelectTask}) => {
	
	const dateArray = useMemo(() => {
		return generator(fromDate, toDate)
	}, [fromDate, toDate])
	
	const [removeTask, {isSuccess: isRemoveSuccess, isError: isRemoveError}] = useRemoveTaskMutation()
	
	if (eventStorage) {
		return (
			<FlexBlock
				direction={'column'}
				height={'max-content'}
				width={'100%'}
				gap={12}
			>
				{dateArray.map((date, dateIndex) => {
					const tasks = getTaskListOfDay(date, eventStorage)
					if (tasks.length > 0) {
						const d = dayjs(date)
						return (
							<FlexBlock
								width={'100%'}
								direction={'column'}
								key={`date__${d.format('DD-MM-YYYY')}`}
							>
								<FlexBlock
									mb={4}
									pb={4}
									pl={20}
									ml={-8}
									mr={-8}
									pr={8}
									bgColor={'#fff'}
									position={'sticky'}
									additionalCss={css`
                    top: 0;
                    left: 0;
                    z-index: 1;
									
									`}
								>
									<CalendarTitle style={{fontSize: 18}}>
										{dayjs(date).format(`DD-MM-YYYY г.`)}
									</CalendarTitle>
								</FlexBlock>
								{tasks.map((taskInfo, index) => (
									<DayTaskItem
										taskInfo={taskInfo}
										tabIndex={(dateIndex + 1) * (index + 1)}
										key={taskInfo.id}
										day={date}
										onSelectTask={onSelectTask}
										onDelete={async (id) => await removeTask({id}).unwrap()}
									/>
								))}
							</FlexBlock>
						)
					}
					
					return <></>
				})}
			</FlexBlock>
		)
	}
	
	return <></>
}