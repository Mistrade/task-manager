import {FC, useMemo} from "react";
import {FlexBlock} from "../../../LayoutComponents/FlexBlock";
import {disabledColor} from "../../../../common/constants";
import {SwitchCalendarModeTab} from "../../Calendar.styled";
import {Badge} from "../../../Badge/Badge";

export type TaskInformerSwitchersKeys = 'about' | 'history' | 'comments' | 'members' | 'chains'

export interface TaskInformerSwitchersItem {
	title: string,
	key: TaskInformerSwitchersKeys,
	badgeCount?: number
}

type TaskInformerSwitcherBadges = {
	[key in TaskInformerSwitchersKeys]?: number
}

interface TaskInformerSwitchers {
	onChange?: (value: TaskInformerSwitchersItem) => void,
	selected: TaskInformerSwitchersKeys,
	badges: TaskInformerSwitcherBadges
}

export const isCorrectTaskInformerSwitcherName = (switcherName: string) => {
	return !!taskInformerSwitcherList.filter((item) => {
		return item.key === switcherName
	}).length
}

export const taskInformerSwitcherList: Array<TaskInformerSwitchersItem> = [
	{title: 'Инфо', key: 'about'},
	{title: 'История', key: 'history'},
	{title: 'Комментарии', key: 'comments'},
	{title: 'Участники', key: 'members'},
	{title: 'Связи', key: 'chains'}
]
export const TaskInformerSwitchers: FC<TaskInformerSwitchers> = ({selected, onChange, badges}) => {
	const badgesCount = useMemo((): Required<TaskInformerSwitcherBadges> => {
		return {
			comments: badges?.comments || 0,
			members: badges?.members || 0,
			about: badges?.about || 0,
			chains: badges?.chains || 0,
			history: badges?.history || 0
		}
	}, [badges])
	
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
					{(badgesCount[item.key] && badgesCount[item.key] > 0 && (
						<Badge>{badgesCount[item.key]}</Badge>
					)) || ""}
				</SwitchCalendarModeTab>
			))}
		</FlexBlock>
	)
}