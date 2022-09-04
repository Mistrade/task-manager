import {SmallCalendarMonthTitle} from "../DatePicker/SmallCalendarMonthTitle";
import {PourDatesProps, SmallMonth} from "../DatePicker/SmallMonthCalendar";
import React, {FC} from "react";
import {GetTaskSchemeResponse} from "../../../store/api/taskApi";
import {CalendarMode, MonthItem} from "../types";

interface SettingMonthCalendarProps {
	pour?: PourDatesProps,
	taskScheme?: GetTaskSchemeResponse,
	monthItem: MonthItem,
	current: CalendarMode
}

export const SettingMonthCalendar: FC<SettingMonthCalendarProps> = ({pour, taskScheme, monthItem}) => {
	
	
	return (
	<></>
	)
}