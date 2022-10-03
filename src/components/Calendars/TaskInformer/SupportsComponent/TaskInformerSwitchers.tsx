import {FC} from "react";
import {FlexBlock} from "../../../LayoutComponents/FlexBlock";
import {disabledColor} from "../../../../common/constants";
import {SwitchCalendarModeTab} from "../../Calendar.styled";
import {Badge} from "../../../Badge/Badge";

export type TaskInformerSwitchersKeys = 'about' | 'history' | 'comments' | 'members'

export interface TaskInformerSwitchersItem {
	title: string,
	key: TaskInformerSwitchersKeys,
	badgeCount?: number
}

interface TaskInformerSwitchers {
	onChange?: (value: TaskInformerSwitchersItem) => void,
	selected: TaskInformerSwitchersKeys
}

const taskInformerSwitcherList: Array<TaskInformerSwitchersItem> = [
	{title: 'О событии', key: 'about'},
	{title: 'История', key: 'history'},
	{title: 'Комментарии', key: 'comments', badgeCount: 3},
	{title: 'Участники', key: 'members'}
]
export const TaskInformerSwitchers: FC<TaskInformerSwitchers> = ({selected, onChange}) => {
	
	return (
		<FlexBlock borderBottom={`1px solid ${disabledColor}`} justify={'flex-start'} align={'flex-end'}>
			{taskInformerSwitcherList.map((item) => (
				<SwitchCalendarModeTab
					style={{gap: 4, display: "flex"}}
					key={item.key}
					onClick={() => onChange && onChange(item)}
					isSelected={item.key === selected}
				>
					<span>
					{item.title}
					</span>
					{item.badgeCount && item.badgeCount > 0 && (
						<Badge>{item.badgeCount}</Badge>
					)}
				</SwitchCalendarModeTab>
			))}
		</FlexBlock>
	)
}