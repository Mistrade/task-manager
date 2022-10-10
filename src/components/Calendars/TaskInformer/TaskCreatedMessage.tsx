import {FC} from "react";
import {UsageTaskItemBaseProps} from "../types";
import {FlexBlock} from "../../LayoutComponents/FlexBlock";
import {getHumanizeDateValue} from "../../../common/constants";
import dayjs from "dayjs";
import {Heading} from "../../Text/Heading";

export const TaskCreatedMessage: FC<UsageTaskItemBaseProps> = ({taskItem}) => {
	return (
		<FlexBlock fSize={16} direction={'column'} gap={12}>
			<Heading.H2 style={{textAlign: 'left', fontSize: 16}}>Создано</Heading.H2>
			<FlexBlock>
				{getHumanizeDateValue(dayjs(taskItem.createdAt).toDate(), true)}
			</FlexBlock>
		</FlexBlock>
	)
}