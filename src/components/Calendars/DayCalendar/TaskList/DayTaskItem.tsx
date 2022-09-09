import React, {FC, useCallback} from "react";
import dayjs from "dayjs";
import {ServerResponse, useUpdateTaskMutation} from "../../../../store/api/taskApi/taskApi";
import {FlexBlock} from "../../../LayoutComponents/FlexBlock";
import {defaultColor, hoverColor} from "../../../../common/constants";
import {css} from "styled-components";
import {toast} from "react-toastify";
import {TaskPreviewDescription} from "./TaskList.styled";
import {JoinToEventButton} from "../../../Buttons/Buttons.styled";
import {ShortEventItem} from "../../../../store/api/taskApi/types";
import {OnSelectTaskFnType} from "../../types";
import {CalendarIdentifier} from "../../CalendarList/CalendarList.styled";
import {ToggleEventPriority} from "../../TaskInformer/SupportsComponent/ToggleTaskInformerButtons";

interface DayTaskItemProps {
	taskInfo: ShortEventItem,
	tabIndex: number
	onSelectTask?: OnSelectTaskFnType,
	day: Date,
	onDelete?: (id: string) => void
}

const TileMixin = css`
  & {
    cursor: pointer;
    box-shadow: none;
    transition: box-shadow .3s ease-in-out;
  }

  &:hover {
    box-shadow: 0px 0px 4px ${defaultColor};
  }

  &:not(:last-child) {
    margin-bottom: 8px;
  }
`

export const DayTaskItem: FC<DayTaskItemProps> = ({taskInfo, tabIndex, onSelectTask, day, onDelete}) => {
	const start = dayjs(taskInfo.time).format('DD-MM HH:mm')
	const end = dayjs(taskInfo.timeEnd).format('DD-MM HH:mm')
	const [updateTask] = useUpdateTaskMutation()
	
	const setTaskInfo = useCallback(() => {
		if (onSelectTask) {
			onSelectTask(taskInfo.id)
		}
	}, [onSelectTask, taskInfo, day])
	
	const keyPressHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter') {
			setTaskInfo()
		}
	}
	
	const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
		setTaskInfo()
	}
	
	return (
		<FlexBlock
			direction={'row'}
			align={'flex-start'}
			wrap={'nowrap'}
			width={'100%'}
			borderRadius={4}
			role={'button'}
			tabIndex={tabIndex}
			bgColor={hoverColor}
			onKeyPress={keyPressHandler}
			onClick={clickHandler}
			additionalCss={css`
        ${TileMixin};
			`}
			p={'8px 12px'}
			gap={8}
		>
			<FlexBlock shrink={0} direction={'row'} align={'center'} justify={'flex-start'} gap={6}>
				<ToggleEventPriority
					stopPropagation={true}
					renderText={false}
					elementId={`change__status_${taskInfo.id}`}
					value={taskInfo.priority}
					onChange={async (field, data) => {
						await updateTask({field, data, id: taskInfo.id})
							.unwrap()
							.then((r) => r.info ? toast(r.info.message, {type: r.info.type}) : null)
							.catch((r: { data: ServerResponse }) => r.data?.info ? toast(r.data.info.message, {type: r.data.info.type}) : null)
					}}
				/>
				<FlexBlock direction={'column'} shrink={0} minWidth={130} gap={4}>
					<FlexBlock>
						<span style={{color: defaultColor}}>с <span style={{fontWeight: 500}}>{start}</span></span>
					</FlexBlock>
					<FlexBlock>
						<span style={{color: defaultColor}}>до <span style={{fontWeight: 500}}>{end}</span></span>
					</FlexBlock>
				</FlexBlock>
			</FlexBlock>
			<FlexBlock direction={'row'} width={'100%'}>
				
				<FlexBlock
					grow={10}
					gap={6}
					justify={'flex-start'}
					align={'flex-start'}
					direction={'row'}
					width={'100%'}
				>
					<FlexBlock width={'100%'} direction={'column'} align={'flex-start'} justify={'flex-start'} gap={12}>
						<FlexBlock width={'100%'} direction={'row'} gap={8} align={'flex-start'} justify={'flex-start'}>
							<CalendarIdentifier color={taskInfo.calendar.color}/>
							<FlexBlock>
								{taskInfo.title}
							</FlexBlock>
						</FlexBlock>
						{taskInfo?.description && (
							<TaskPreviewDescription>
								{taskInfo.description}
							</TaskPreviewDescription>
						)}
					</FlexBlock>
					{taskInfo.link?.value && (
						<FlexBlock>
							<JoinToEventButton
								href={taskInfo.link.value}
								target={'_blank'}
								rel={''}
								onClick={(e) => e.stopPropagation()}
							>
								Подключиться
							</JoinToEventButton>
						</FlexBlock>
					)}
					{taskInfo.id && (
						<FlexBlock>
							<JoinToEventButton
								onClick={(e) => {
									e.stopPropagation()
									onDelete && onDelete(taskInfo.id)
								}}
							>
								Удалить
							</JoinToEventButton>
						</FlexBlock>
					)}
				</FlexBlock>
			</FlexBlock>
		</FlexBlock>
	)
}