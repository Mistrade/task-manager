import {FC} from "react";
import {BaseEventHistoryFieldProps} from "../event-history.types";
import {GroupModelResponse} from "../../../../../../../store/api/planning-api/types/groups.types";
import {EventGroupButton} from "../../../../SupportsComponent/EventGroupButton";
import {FlexBlock} from "../../../../../../../components/LayoutComponents/FlexBlock";
import {TimeBadge} from "../../../../../../../components/Badge/Badge";

export const HistoryGroupField: FC<BaseEventHistoryFieldProps<GroupModelResponse | null>> = ({value}) => {
	
	return (
		<FlexBlock pl={20} gap={6} direction={'row'} align={'center'}>
			<FlexBlock>
				Новая группа событий
			</FlexBlock>
			<EventGroupButton
				isDisabled={true}
				stopPropagation={true}
				group={value}
				renderText={true}
			/>
		</FlexBlock>
	)
}