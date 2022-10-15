import {ChangeCalendarModal, ChangeCalendarModalDefaultProps} from "../CalendarModals/CreateCalendar";
import {FC, useEffect} from "react";
import {useGetCalendarInfoQuery} from "../../../store/api/taskApi/taskApi";
import {toast} from "react-toastify";

export interface ChangeCalendarRequestMiddlewareProps extends ChangeCalendarModalDefaultProps {
	calendarId: string
}


export const ChangeCalendarRequestMiddleware: FC<ChangeCalendarRequestMiddlewareProps> = ({calendarId, onClose}) => {
	const {currentData, isError, isSuccess} = useGetCalendarInfoQuery(calendarId, {refetchOnMountOrArgChange: true})
	
	useEffect(() => {
		if (isError) {
			if (currentData?.info) {
				toast(currentData?.info?.message, {
					type: currentData.info.type
				})
			} else {
				toast('Серверу не удалось найти информацию по выбранному календарю', {type: 'warning'})
			}
			onClose && onClose()
		}
	}, [isError, currentData])
	
	
	if (isSuccess) {
		return (
			<ChangeCalendarModal
				initialValues={currentData?.data ? {
					id: currentData.data._id,
					title: currentData.data.title,
					color: currentData.data.color,
				} : undefined}
				onClose={onClose}
				isEditing={true}
			/>
		)
	}
	
	return <></>
}