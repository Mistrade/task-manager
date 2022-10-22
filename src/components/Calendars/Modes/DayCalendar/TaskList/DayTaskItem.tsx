import React, {FC, useCallback} from "react";
import dayjs from "dayjs";
import {ServerResponse, useUpdateTaskMutation} from "../../../../../store/api/taskApi/taskApi";
import {FlexBlock} from "../../../../LayoutComponents/FlexBlock";
import {currentColor, defaultColor, hoverColor, orangeColor, pageHeaderColor,} from "../../../../../common/constants";
import {css} from "styled-components";
import {toast} from "react-toastify";
import {TaskPreviewDescription} from "./TaskList.styled";
import {JoinToEventButton} from "../../../../Buttons/Buttons.styled";
import {ShortEventItem} from "../../../../../store/api/taskApi/types";
import {OnSelectTaskFnType} from "../../../types";
import {CalendarIdentifier} from "../../../CalendarList/CalendarList.styled";
import {ToggleEventPriority} from "../../../TaskInformer/SupportsComponent/ToggleTaskInformerButtons";
import {ContinueTaskButtonGroup} from "../../../../Buttons/ContinueTaskButtons/ContinueTaskButtonGroup";
import {EventIcon} from "../../../../Icons/EventIcon";
import {LikeButton} from "../../../../Buttons/LikeButton";

interface DayTaskItemProps {
	taskInfo: ShortEventItem,
	tabIndex: number
	onSelectTask?: OnSelectTaskFnType,
	day: Date,
	onDelete?: (id: string) => void,
	refetchTaskList?: () => void
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

export const DayTaskItem: FC<DayTaskItemProps> = ({
																										taskInfo,
																										tabIndex,
																										onSelectTask,
																										day,
																										onDelete,
																										refetchTaskList
																									}) => {
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
			bgColor={pageHeaderColor}
			border={`1px solid ${hoverColor}`}
			onKeyPress={keyPressHandler}
			onClick={clickHandler}
			additionalCss={css`
        ${TileMixin};
        scroll-snap-align: end;
			`}
			p={'8px 12px'}
			gap={8}
		>
			<FlexBlock shrink={0} direction={'row'} align={'center'} justify={'flex-start'} gap={6}>
				<ToggleEventPriority
					stopPropagation={true}
					renderText={false}
					elementId={`change__status_${taskInfo.id}_${tabIndex}`}
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
							<LikeButton
								isChecked={taskInfo.isLiked}
								id={taskInfo.id}
								onChange={async (isChecked) => {
									await updateTask({id: taskInfo.id, data: !taskInfo.isLiked, field: 'isLiked'})
								}}
							/>
							<CalendarIdentifier color={taskInfo.calendar.color}/>
							<EventIcon
								size={20}
								color={currentColor}
								status={taskInfo.status}
							/>
							<FlexBlock
								additionalCss={css`
                  text-decoration: ${taskInfo.status === 'completed' ? 'line-through' : 'none'};
                  text-decoration-color: ${taskInfo.status === 'completed' ? orangeColor : '#000'};
                  text-decoration-thickness: 2px;
                  font-weight: 500;
								`}
							>
								{taskInfo.title}
							</FlexBlock>
						</FlexBlock>
						<FlexBlock>
							<ContinueTaskButtonGroup
								status={taskInfo.status}
								updateFn={async (nextStatus) => {
									await updateTask({field: 'status', data: nextStatus, id: taskInfo.id})
									if (refetchTaskList) {
										await refetchTaskList()
									}
								}}
							/>
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
						<JoinToEventButton
							onClick={async (e) => {
								e.stopPropagation()
								onDelete && onDelete(taskInfo.id)
							}}
						>
							Удалить
						</JoinToEventButton>
					)}
				</FlexBlock>
			</FlexBlock>
		</FlexBlock>
	)
}