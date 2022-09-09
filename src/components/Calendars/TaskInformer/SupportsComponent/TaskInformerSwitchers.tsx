import {FC} from "react";
import {FlexBlock} from "../../../LayoutComponents/FlexBlock";
import {disabledColor} from "../../../../common/constants";
import {SwitchCalendarModeTab} from "../../Calendar.styled";

export type TaskInformerSwitchersKeys = 'about' | 'history' | 'comments' | 'members'

interface TaskInformerSwitchersItem {
	title: string,
	key: TaskInformerSwitchersKeys
}

interface TaskInformerSwitchers {
	onChange?: (value: TaskInformerSwitchersItem) => void,
	selected: TaskInformerSwitchersKeys
}

const taskInformerSwitcherList: Array<TaskInformerSwitchersItem> = [
	{title: 'О событии', key: 'about'},
	{title: 'История', key: 'history'},
	{title: 'Комментарии', key: 'comments'},
	{title: 'Участники', key: 'members'}
]
export const TaskInformerSwitchers: FC<TaskInformerSwitchers> = ({selected, onChange}) => {
	
	return (
		<FlexBlock borderBottom={`1px solid ${disabledColor}`} justify={'flex-start'} align={'flex-end'}>
			{taskInformerSwitcherList.map((item) => (
				<SwitchCalendarModeTab
					key={item.key}
					onClick={() => onChange && onChange(item)}
					isSelected={item.key === selected}
				>
					{item.title}
				</SwitchCalendarModeTab>
			))}
		</FlexBlock>
	)
}