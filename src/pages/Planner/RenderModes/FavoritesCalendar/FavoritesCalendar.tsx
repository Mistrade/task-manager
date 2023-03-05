import {useEventStorage} from "../../../../hooks/useEventStorage";
import dayjs from "dayjs";
import {FlexBlock} from "../../../../components/LayoutComponents/FlexBlock";
import {FindEventFilter} from "../FindEventFilter/FindEventFilter";
import {ListModeTaskController} from "../List/ListModeTaskController";
import React, {FC, useMemo} from "react";
import {FavoritesCalendarModeProps, EventsStorage} from "../../planner.types";
import {ShortEventInfoModel} from "../../../../store/api/planning-api/types/event-info.types";


export const FavoritesCalendar: FC<FavoritesCalendarModeProps> = ({current, onSelectTask}) => {
	const startDate = useMemo(() => {
		return new Date(2022, 0, 1)
	}, [])
	
	const toDate = useMemo(() => {
		return dayjs().set('year', new Date().getFullYear() + 1).endOf('year').toDate()
	}, [])
	
	const {TaskStorage, SwitcherBadges, handlers, filters, debounceValue, isFetching} = useEventStorage({
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
				<FindEventFilter
					values={filters}
					onChangeHandlers={handlers}
					statusBadges={SwitcherBadges}
					isLoading={isFetching}
				/>
			</FlexBlock>
			<FlexBlock
				overflowY={'auto'}
				overflowX={'hidden'}
				position={'relative'}
				direction={'column'}
				height={'100vh'}
				width={'100%'}
				ml={-8} mr={-8}
				pl={8} pr={8}
			>
				<ListModeTaskController
					eventStorage={TaskStorage as EventsStorage<ShortEventInfoModel>}
					fromDate={debounceValue.start}
					toDate={debounceValue.end}
					onSelectTask={onSelectTask}
				/>
			</FlexBlock>
		</FlexBlock>
	)
}