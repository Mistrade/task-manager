import {FC, useEffect} from "react";
import {CalendarMode} from "./types";
import {useAppDispatch} from "../../store/hooks/hooks";
import {changeCalendarCurrent} from "../../store/reducers/calendar";
import {Route, Routes, useNavigate, useParams} from "react-router-dom";
import {CalendarStatusProxy} from "./CalendarStatusProxy";

const layouts: Array<CalendarMode['layout']> = [
	'day', 'week', 'month', 'year'
]

export const CalendarMain: FC = () => {
	const {layout} = useParams<{ layout: CalendarMode["layout"] }>()
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	
	useEffect(() => {
		if (!layout || !isCorrectLayout(layout)) {
			navigate(`/calendar/day`, {replace: true})
		} else {
			dispatch(changeCalendarCurrent({layout, date: new Date().toString()}))
		}
	}, [])
	
	const isCorrectLayout = (l: CalendarMode["layout"] | undefined) => {
		return l && layouts.includes(l)
	}
	
	if (isCorrectLayout(layout) && layout) {
		return (
			<Routes
			>
				<Route
					path={':taskStatus/*'}
					element={
						<CalendarStatusProxy
							layout={layout}
						/>
					}
				/>
			</Routes>
		)
	}
	
	return <>Неверный layout</>
}