import {FC} from "react";
import dayjs from "dayjs";
import {FlexBlock} from "../../../../../../../components/LayoutComponents/FlexBlock";
import {TimeBadge} from "../../../../../../../components/Badge/Badge";
import {DateHelper} from "../../../../../../../common/calendarSupport/dateHelper";
import {BaseEventHistoryFieldProps} from "../event-history.types";

export const HistoryTimeField: FC<BaseEventHistoryFieldProps<Date | null | string | undefined>> = ({value}) => {
	const date = dayjs(value)
	
	if (date.isValid()) {
		return (
			<FlexBlock pl={20} fSize={15} align={'center'} gap={6}>
				<span>Новое значение </span>
				<TimeBadge>
					{DateHelper.getHumanizeDateValue(date.toDate(), {withTime: true, monthPattern: 'full'})}
				</TimeBadge>
			</FlexBlock>
		)
	}
	
	return (
		<FlexBlock pl={20} fSize={15} align={'center'}>
			Значение невалидно или удалено
		</FlexBlock>
	)
}