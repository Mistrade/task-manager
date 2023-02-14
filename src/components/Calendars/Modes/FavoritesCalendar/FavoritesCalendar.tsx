import {useTaskStorageQueryArgs} from "../../../../hooks/useTaskStorageScope";
import dayjs from "dayjs";
import {FlexBlock} from "../../../LayoutComponents/FlexBlock";
import {EventFilter} from "../DayCalendar/EventFilter";
import {ListModeTaskController} from "../List/ListModeTaskController";
import {ShortEventItem} from "../../../../store/api/taskApi/types";
import React, {FC, useMemo} from "react";
import {FavoritesCalendarModeProps, TaskStorageType} from "../../types";


export const FavoritesCalendar: FC<FavoritesCalendarModeProps> = ({current, onSelectTask}) => {
	const startDate = useMemo(() => {
		return new Date(2022, 0, 1)
	}, [])
	
	const toDate = useMemo(() => {
		return dayjs().set('year', new Date().getFullYear() + 1).endOf('year').toDate()
	}, [])
	
	const {TaskStorage, SwitcherBadges, handlers, filters, debounceValue, isFetching} = useTaskStorageQueryArgs({
		layout: 'favorites',
		scope: {
			start: startDate,
			end: toDate
		},
		onlyFavorites: true,
	})
	
	return (
		<FlexBlock
			width={'100%'}
			direction={'column'}
			mt={4}
			mb={4}
		>
			<FlexBlock width={'100%'} mb={8}>
				<EventFilter
					values={filters}
					onChangeHandlers={handlers}
					statusBadges={SwitcherBadges}
					isLoading={isFetching}
				/>
			</FlexBlock>
			<FlexBlock
				overflow={'scroll'}
				position={'relative'}
				direction={'column'}
				height={'100vh'}
				width={'100%'}
				ml={-8} mr={-8}
				pl={8} pr={8}
			>
				<ListModeTaskController
					eventStorage={TaskStorage as TaskStorageType<ShortEventItem>}
					fromDate={debounceValue.start}
					toDate={debounceValue.end}
					onSelectTask={onSelectTask}
				/>
			</FlexBlock>
		</FlexBlock>
	)
}