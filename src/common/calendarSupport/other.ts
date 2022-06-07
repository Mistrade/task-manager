import dayjs from 'dayjs'

export const getHumanizeWeekDay = ( date: Date ) => {
  const d = dayjs( date ).weekday()
  return d + 1
}
export const getDaysCountToStartWeek = ( date: Date ) => {
  const d = dayjs( date )
  return d.day() === 0 ? 6 : d.day() - 1
}
export const getFirstDayInWeek = ( date: Date ) => {
  const d = dayjs( date )
  const neededDaysToStartWeek = getDaysCountToStartWeek( date )
  return neededDaysToStartWeek > 0 ? d.subtract( neededDaysToStartWeek, 'day' ) : d
}
export const getDaysCountToWeekEnd = ( date: Date ) => {
  const d = dayjs( date ).weekday()
  return d === 0 ? 0 : 6 - d
}
export const getMonday = ( date: Date ): Date => {
  const d = dayjs( date )
  const count = getDaysCountToStartWeek( date )
  if( count === 0 ) {
    return d.toDate()
  }

  return d.subtract( count, 'day' ).toDate()
}
