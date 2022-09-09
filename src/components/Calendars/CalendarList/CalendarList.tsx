import {CalendarListStyled} from "./CalendarList.styled";
import {CalendarNameListItem} from "./CalendarNameListItem";
import {useMemo, useState} from "react";
import {useChangeSelectCalendarMutation, useGetCalendarsQuery} from "../../../store/api/taskApi/taskApi";

interface CalendarList {

}

export const CalendarList = () => {
	const {currentData, isFetching} = useGetCalendarsQuery({}, {})
	const [changeSelect, {isLoading}] = useChangeSelectCalendarMutation()
	
	const [isChangedProcessOf, setIsChangedProcessOf] = useState<null | string>(null)
	
	const count: number = useMemo(() => {
		return currentData?.data?.length || 3
	}, [currentData?.data?.length])
	
	return (
		<CalendarListStyled>
			{currentData?.data?.map((item) => {
				return (
					<CalendarNameListItem
						item={item}
						key={item._id}
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
								.finally(() => setIsChangedProcessOf(null))
						}}
					/>
				)
			})}
		</CalendarListStyled>
	)
}