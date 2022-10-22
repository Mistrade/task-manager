import {FC} from "react";
import {TaskStatusesType} from "../../Calendars/types";
import {FlexBlock} from "../../LayoutComponents/FlexBlock";
import {ContinueWorkTaskButtonName} from "../../../common/constants";
import {WhiteButton} from "../Buttons.styled";

interface ContinueTaskButtonGroupProps {
	status: TaskStatusesType,
	updateFn: (nextStatus: TaskStatusesType) => Promise<void>,
}

export const ContinueTaskButtonGroup: FC<ContinueTaskButtonGroupProps> = ({status, updateFn}) => {
	return (
		<FlexBlock direction={'row'} gap={4} align={'center'}>
			{ContinueWorkTaskButtonName[status].map((continueItem) => (
				<WhiteButton
					onClick={async (e) => {
						e.stopPropagation()
						await updateFn(continueItem.nextStatus)
					}}
				>
					{continueItem.title}
				</WhiteButton>
			))}
		</FlexBlock>
	)
}