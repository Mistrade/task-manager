import {FC} from "react";
import {UsageTaskItemBaseProps} from "../types";
import {FlexBlock} from "../../LayoutComponents/FlexBlock";
import {getHumanizeDateValue} from "../../../common/constants";
import dayjs from "dayjs";

export const TaskCreatedMessage: FC<UsageTaskItemBaseProps> = ({taskItem}) => {
	return (
		<FlexBlock fSize={16}>
			Создано: {getHumanizeDateValue(dayjs(taskItem.createdAt).toDate(), true)}
		</FlexBlock>
	)
}