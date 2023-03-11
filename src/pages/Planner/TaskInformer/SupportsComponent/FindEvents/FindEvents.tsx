import {FC, ReactNode, useEffect, useState} from "react";
import {useDebounce} from "../../../../../hooks/useDebounce";
import {useLazyGetShortEventsArrayQuery} from "../../../../../store/api/planning-api";
import dayjs from "dayjs";
import {EventListFromArray, ExtendSelectableEventListProps} from "./EventsList";
import {FlexBlock} from "../../../../../components/LayoutComponents/FlexBlock";
import {TextInput} from "../../../../../components/Input/TextInput/TextInput";
import {Button} from "../../../../../components/Buttons/Buttons.styled";
import {EmptyButtonStyled} from "../../../../../components/Buttons/EmptyButton.styled";
import {EventFiltersProps, useEventFilters} from "../../../../../hooks/useEventFilters";
import {SmartFindEventFilters} from "./SmartFindEventFilters";
import {css} from "styled-components";
import {Heading} from "../../../../../components/Text/Heading";
import {PreviewEventsList} from "./PreviewEventsList";
import {EventInfoModel} from "../../../../../store/api/planning-api/types/event-info.types";

export interface FindEventsProps extends Partial<ExtendSelectableEventListProps> {
	buttons?: ReactNode,
	taskInfo: EventInfoModel,
	excludeFromFilters?: EventFiltersProps['exclude']
}

export const FindEvents: FC<FindEventsProps> = ({
																									selectedEvents,
																									onSelect,
																									onSelectActionType,
																									buttons,
																									taskInfo,
																									excludeFromFilters
																								}) => {
	const {debounceValue, filters, setFiltersState, handlers} = useEventFilters({
		initialValues: {
			title: null,
			end: null,
			start: null,
			onlyFavorites: false,
			taskStatus: "all",
			priority: null,
			exclude: excludeFromFilters,
			utcOffset: dayjs().utcOffset()
		},
		debounceTimeout: 500,
		useNavigate: false,
		layout: "day",
	})
	
	useEffect(() => {
		console.log(debounceValue)
	}, [debounceValue])
	
	const [getEventsArray, {data: eventsArray, isFetching: isFetchingTaskList, error}] = useLazyGetShortEventsArrayQuery()
	
	useEffect(() => {
		const {end, title, priority, onlyFavorites, start, taskStatus, exclude} = debounceValue
		const startDate = dayjs(start)
		const endDate = dayjs(end)
		
		if (
			(start && !startDate.isValid())
			|| (end && !endDate.isValid())
			|| startDate.isSame(end, 'minutes')
		) {
			return
		}
		
		
		if (title || priority || end || start) {
			getEventsArray({
				utcOffset: dayjs().utcOffset(),
				title,
				priority,
				fromDate: start ? dayjs(start).utc().toString() : "",
				toDate: end ? dayjs(end).utc().toString() : "",
				taskStatus,
				exclude
			})
				.unwrap()
				.then((r) => console.log(r))
				.catch((e) => console.error(e))
		}
	}, [debounceValue])
	
	return (
		<PreviewEventsList
			title={
				<FlexBlock direction={'column'} gap={12}>
					<FlexBlock width={'100%'} additionalCss={css`z-index: 1`}>
						<SmartFindEventFilters
							values={filters}
							onChangeHandlers={handlers}
						/>
					</FlexBlock>
				</FlexBlock>
			}
			selectedEvents={selectedEvents || []}
			onSelectActionType={onSelectActionType || 'select'}
			eventsArray={eventsArray}
			onSelect={onSelect}
			isLoading={isFetchingTaskList}
			error={(error && "status" in error && error.data.info) || undefined}
			buttons={buttons}
		/>
	)
}