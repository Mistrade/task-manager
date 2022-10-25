import React, {FC, useCallback} from "react";
import dayjs from "dayjs";
import {ServerResponse, useUpdateTaskMutation} from "../../../../../store/api/taskApi/taskApi";
import {FlexBlock} from "../../../../LayoutComponents/FlexBlock";
import {
	currentColor,
	darkColor,
	defaultColor, disabledColor,
	hoverColor,
	orangeColor,
	pageHeaderColor,
} from "../../../../../common/constants";
import {css} from "styled-components";
import {toast} from "react-toastify";
import {TaskPreviewDescription} from "./TaskList.styled";
import {JoinToEventButton} from "../../../../Buttons/Buttons.styled";
import {ShortEventItem} from "../../../../../store/api/taskApi/types";
import {OnSelectTaskFnType} from "../../../types";
import {CalendarIdentifier} from "../../../CalendarList/CalendarList.styled";
import {
	TaskInformerUpdateFn, ToggleEventCalendar,
	ToggleEventPriority,
	ToggleEventStatus
} from "../../../TaskInformer/SupportsComponent/ToggleTaskInformerButtons";
import {ContinueTaskButtonGroup} from "../../../../Buttons/ContinueTaskButtons/ContinueTaskButtonGroup";
import {EventIcon} from "../../../../Icons/EventIcon";
import {LikeButton} from "../../../../Buttons/LikeButton";
import {UrlIcon} from "../../../../Icons/SocialNetworkIcons";
import {TrashIcon} from "../../../../Icons/Icons";
import {CalendarUserIndicator} from "../../../Users/UserIndicator";
import {EmptyButtonStyled, EmptyLink} from "../../../../Buttons/EmptyButton.styled";
import {MemoryRouter} from "react-router";

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
	
	const updateTaskHandler: TaskInformerUpdateFn = useCallback(async (field, data) => {
		return await updateTask({
			id: taskInfo.id,
			field,
			data
		})
			.unwrap()
			.then(r => {
				if (r.info) {
					toast(r.info.message, {
						type: r.info.type
					})
				}
			})
			.catch((r: { data?: ServerResponse<null>, status: number }) => {
				if (r.data?.info) {
					toast(r.data?.info?.message, {
						type: r.data.info.type
					})
				}
			})
	}, [taskInfo.id])
	
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
			<FlexBlock
				shrink={0}
				direction={'row'}
				align={'flex-start'}
				justify={'flex-start'}
				gap={6}
				height={'100%'}
			>
				<FlexBlock direction={'column'} shrink={0} minWidth={200} gap={6}>
					<CalendarUserIndicator
						name={taskInfo.userId.name}
						surname={taskInfo.userId.surname}
						id={taskInfo.userId._id}
					/>
					<FlexBlock
						direction={'column'}
						gap={8}
						pt={6}
						borderTop={`1px solid ${disabledColor}`}
						onClick={(e) => e.stopPropagation()}
					>
						<FlexBlock fSize={16} color={disabledColor}>
							Быстрые действия
						</FlexBlock>
						<FlexBlock direction={'row'} gap={6} wrap={'wrap'}>
							<LikeButton
								isChecked={taskInfo.isLiked}
								onChange={async (isChecked) => {
									await updateTask({id: taskInfo.id, data: !taskInfo.isLiked, field: 'isLiked'})
								}}
							/>
							<ToggleEventPriority
								iconProps={{size: 20}}
								stopPropagation={true}
								renderText={false}
								elementId={`change__priority_${taskInfo.id}_${tabIndex}`}
								value={taskInfo.priority}
								onChange={updateTaskHandler}
							/>
							<ToggleEventCalendar
								iconProps={{size: 20}}
								stopPropagation={true}
								renderText={false}
								elementId={`change__calendar_${taskInfo.id}_${tabIndex}`}
								value={taskInfo.calendar}
								onChange={updateTaskHandler}
							/>
							<ToggleEventStatus
								stopPropagation={true}
								renderText={false}
								iconProps={{size: 20}}
								elementId={`change__status_${taskInfo.id}_${tabIndex}`}
								value={taskInfo.status}
								onChange={updateTaskHandler}
							/>
							
							{taskInfo.link?.value && (
								<EmptyLink
									href={taskInfo.link.value}
									target={'_blank'}
									rel={''}
									onClick={(e) => e.stopPropagation()}
								>
									<UrlIcon name={taskInfo.link.key} size={20}/>
								</EmptyLink>
							)}
							{/*{taskInfo.id && (*/}
							{/*	<EmptyButtonStyled*/}
							{/*		onClick={async (e) => {*/}
							{/*			e.stopPropagation()*/}
							{/*			onDelete && onDelete(taskInfo.id)*/}
							{/*		}}*/}
							{/*	>*/}
							{/*		<TrashIcon color={currentColor} size={20}/>*/}
							{/*	</EmptyButtonStyled>*/}
							{/*)}*/}
						</FlexBlock>
					</FlexBlock>
				</FlexBlock>
			</FlexBlock>
			<FlexBlock direction={'row'} width={'100%'} height={'100%'} borderLeft={`1px solid ${disabledColor}`} pl={12}>
				
				<FlexBlock
					grow={10}
					gap={6}
					justify={'flex-start'}
					align={'flex-start'}
					direction={'row'}
					width={'100%'}
				>
					<FlexBlock width={'100%'} direction={'column'} align={'flex-start'} justify={'flex-start'} gap={12}>
						<FlexBlock
							width={'100%'}
							direction={'row'}
							gap={8}
							align={'flex-start'}
							justify={'space-between'}
							wrap={'nowrap'}
						>
							<FlexBlock direction={'column'} gap={6} grow={1} shrink={0}>
								<FlexBlock
									wrap={'wrap'}
									additionalCss={css`
                    text-decoration: ${taskInfo.status === 'completed' ? 'line-through' : 'none'};
                    text-decoration-color: ${taskInfo.status === 'completed' ? orangeColor : '#000'};
                    text-decoration-thickness: 2px;
                    font-weight: 500;
									`}
								>
									{taskInfo.title}
								</FlexBlock>
								<FlexBlock grow={1} shrink={0} align={'center'} gap={8}>
									<span style={{color: defaultColor}}>с <span style={{fontWeight: 500, color: darkColor}}>{start}</span></span>
									<span style={{color: defaultColor}}>до <span style={{fontWeight: 500, color: darkColor}}>{end}</span></span>
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
							</FlexBlock>
						</FlexBlock>
						{taskInfo?.description && (
							<TaskPreviewDescription>
								{taskInfo.description}
							</TaskPreviewDescription>
						)}
					</FlexBlock>
				</FlexBlock>
			</FlexBlock>
		</FlexBlock>
	)
}