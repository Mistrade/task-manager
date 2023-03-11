import {FC} from "react";
import {BaseEventHistoryFieldProps} from "../event-history.types";
import {StyledHistoryDescription} from "../event-history.styled";
import {EventStatusButton} from "../../../../SupportsComponent/EventStatusButton";
import {FlexBlock} from "../../../../../../../components/LayoutComponents/FlexBlock";
import {TaskStatusesType} from "../../../../../planner.types";

export const HistoryStatusField: FC<BaseEventHistoryFieldProps<TaskStatusesType | null>> = ({value}) => {
	return (
		<FlexBlock gap={12} direction={'row'} align={'center'} pl={24}>
			<StyledHistoryDescription>
				Новый статус
			</StyledHistoryDescription>
			<EventStatusButton
				renderText={true}
				isDisabled={true}
				status={value}
				stopPropagation={true}
				iconProps={{
					size: 20,
				}}
			/>
		</FlexBlock>
	)
}