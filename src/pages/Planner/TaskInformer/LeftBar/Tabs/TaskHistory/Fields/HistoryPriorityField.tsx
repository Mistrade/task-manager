import {FC} from "react";
import {FlexBlock} from "../../../../../../../components/LayoutComponents/FlexBlock";
import {BaseEventHistoryFieldProps} from "../event-history.types";
import {EventPriorityButton} from "../../../../SupportsComponent/EventPriorityButton";
import {StyledHistoryDescription} from "../event-history.styled";
import {CalendarPriorityKeys} from "../../../../../planner.types";

export const HistoryPriorityField: FC<BaseEventHistoryFieldProps<CalendarPriorityKeys | null>> = ({value}) => {
	return (
		<FlexBlock gap={12} direction={'row'} align={'center'} pl={24}>
			<StyledHistoryDescription>
				Новый приоритет
			</StyledHistoryDescription>
			<EventPriorityButton
				iconProps={{size: 20}}
				priority={value}
				renderText={true}
				isDisabled={true}
				stopPropagation={true}
			/>
		</FlexBlock>
	)
}