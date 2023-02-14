import {CalendarListStyled} from "./CalendarList.styled";
import {CalendarNameListItem} from "./CalendarNameListItem";
import {useGetCalendarsQuery} from "../../../store/api/taskApi/taskApi";
import {useCalendar} from "../../../hooks/useCalendar";
import {Delay} from "../../../common/functions";

export const CalendarList = () => {
	const {currentData, isFetching, refetch} = useGetCalendarsQuery({})
	const {onSelectToRemoveCalendar, onAddCalendar} = useCalendar()
	
	return (
		<CalendarListStyled>
			{currentData?.data?.map((item) => {
				return (
					<CalendarNameListItem
						item={item}
						key={item._id}
						onDelete={onSelectToRemoveCalendar}
						isChecked={item.isSelected}
						onEdit={onAddCalendar}
						onSuccessChangeSelect={async () => await Delay(1000)}
					/>
				)
			})}
		</CalendarListStyled>
	)
}
