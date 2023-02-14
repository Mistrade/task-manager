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
