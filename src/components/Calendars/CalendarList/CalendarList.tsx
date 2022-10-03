import {CalendarListStyled} from "./CalendarList.styled";
import {CalendarNameListItem} from "./CalendarNameListItem";
import {useEffect, useMemo, useState} from "react";
import {
	useChangeSelectCalendarMutation,
	useGetCalendarsQuery,
	useLazyGetCalendarsQuery
} from "../../../store/api/taskApi/taskApi";
import {useCalendar} from "../../../hooks/useCalendar";

export const CalendarList = () => {
	const [getCalendars, {currentData, isFetching}] = useLazyGetCalendarsQuery({})
	const [changeSelect, {isLoading}] = useChangeSelectCalendarMutation()
	const {onSelectToRemoveCalendar} = useCalendar()
	const [isChangedProcessOf, setIsChangedProcessOf] = useState<null | string>(null)
	
	useEffect(() => {
		getCalendars({})
	}, [])
	
	return (
		<CalendarListStyled>
			{currentData?.data?.map((item) => {
				return (
					<CalendarNameListItem
						item={item}
						key={item._id}
						onDelete={onSelectToRemoveCalendar}
						isChecked={item.isSelected}
						isLoading={item._id === isChangedProcessOf}
						onChange={async (isChecked) => {
							console.log(isChecked)
							setIsChangedProcessOf(item._id)
							await changeSelect({
								id: item._id,
								state: isChecked
							})
								.unwrap()
								// .catch(() => setIsChangedProcessOf(null))
								.then(async () => {
										await getCalendars({})
											.finally(() => setIsChangedProcessOf(null))
									}
								)
						}}
					/>
				)
			})}
		</CalendarListStyled>
	)
}
