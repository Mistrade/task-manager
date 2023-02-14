import {FC} from "react";
import {FullResponseEventModel} from "../../../../../store/api/taskApi/types";
import {FlexBlock} from "../../../../LayoutComponents/FlexBlock";


export interface TaskHistoryProps {
	taskInfo: FullResponseEventModel
}

export const TaskHistory: FC<TaskHistoryProps> = ({taskInfo}) => {
	return (
		<FlexBlock width={'100%'} gap={6} direction={'column'}>
			{taskInfo.history.map((item) => (
					<FlexBlock>
						{item.date} - {item.description} - {item.newValue}
					</FlexBlock>
				)
			)}
		</FlexBlock>
	)
}