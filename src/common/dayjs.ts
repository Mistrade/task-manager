import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import Weekday from 'dayjs/plugin/weekday'
import isToday from 'dayjs/plugin/isToday'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isTomorrow from 'dayjs/plugin/isTomorrow'
import isYesterday from 'dayjs/plugin/isYesterday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import updateLocale from 'dayjs/plugin/updateLocale'
import duration from 'dayjs/plugin/duration'
import utc from 'dayjs/plugin/utc'
import tz from 'dayjs/plugin/timezone'
import {EventItem} from '../components/Calendars/types'

dayjs.extend(isBetween)
dayjs.extend(isToday)
dayjs.extend(isTomorrow)
dayjs.extend(isYesterday)
dayjs.extend(Weekday)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
dayjs.extend(weekOfYear)
dayjs.extend(updateLocale)
dayjs.extend(duration)
dayjs.extend(utc)
dayjs.extend(tz)

dayjs.updateLocale('en', {
	weekStart: 1,
	yearStart: 4
})

export const sortTask = (initialList: Array<EventItem>): Array<EventItem> => {
	const list = [...initialList]
	
	if (!!list.length) {
		list.sort((prev, cur) => {
			if (dayjs(cur.time).isBefore(prev.time)) {
				return 1
			}
			
			if (dayjs(cur.time).isAfter(prev.time)) {
				return -1
			}
			
			return 0
		})
	}
	
	return list
}
