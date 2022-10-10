import {CalendarListStyled} from "./CalendarList.styled";
import {CalendarNameListItem} from "./CalendarNameListItem";
import {useEffect} from "react";
import {useLazyGetCalendarsQuery} from "../../../store/api/taskApi/taskApi";
import {useCalendar} from "../../../hooks/useCalendar";

export const CalendarList = () => {
	const [getCalendars, {currentData, isFetching}] = useLazyGetCalendarsQuery({})
	const {onSelectToRemoveCalendar} = useCalendar()
	
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
						onSuccessChangeSelect={async () => {
							await getCalendars({}).unwrap()
						}}
					/>
				)
			})}
		</CalendarListStyled>
	)
}
