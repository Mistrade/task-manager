import {FC, useEffect} from "react";
import {CalendarMode} from "./types";
import {useAppDispatch, useAppSelector} from "../../store/hooks/hooks";
import {changeCalendarCurrent} from "../../store/reducers/calendar";
import {Route, Routes, useParams} from "react-router-dom";
import {CalendarStatusProxy} from "./UrlProxy/CalendarStatusProxy";
import {useLocation} from "react-router";
import dayjs from "dayjs";
import {useSearchNavigate} from "../../hooks/useSearchNavigate";

const layouts: Array<CalendarMode['layout']> = [
	'day', 'week', 'month', 'year', 'list', 'favorites'
]

export const CalendarMain: FC = () => {
	const {layout} = useParams<{ layout: CalendarMode["layout"] }>()
	const {pathname} = useLocation()
	const dispatch = useAppDispatch()
	const navigate = useSearchNavigate()
	const {statuses} = useAppSelector(state => state.calendar)
	
	useEffect(() => {
		if (!layout || !isCorrectLayout(layout)) {
			navigate(`/calendar/day/${statuses}`, {replace: true})
		} else {
			if (layout === 'list') {
				dispatch(changeCalendarCurrent({
					layout, date: {
						layout: 'list',
						fromDate: dayjs().startOf('date').toString(),
						toDate: dayjs().add(31, 'day').endOf('date').toString(),
					}
				}))
			} else {
				dispatch(changeCalendarCurrent({layout, date: new Date().toString()}))
			}
			const pathArray = pathname.split('/').filter(Boolean)
			if (pathArray.length <= 2) {
				navigate(`/calendar/${layout}/${statuses}`, {replace: true})
			}
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