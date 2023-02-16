import React, {FC, RefObject, useEffect} from 'react'
import {TaskInfoModalProps} from '../types'
import {Modal, ModalBody, ModalHeader} from '../../Modal/Modal'
import {FlexBlock} from '../../LayoutComponents/FlexBlock'
import {
	useGetTaskInfoQuery,
	useRemoveTaskMutation,
	useUpdateTaskMutation
} from "../../../store/api/taskApi/taskApi";
import {useParams} from "react-router";
import {ErrorBoundary} from "../../Errors/ErrorBoundary";
import {Loader} from "../../Loaders/Loader";
import {DropDown} from "../../Dropdown/DropDown";
import {EmptyButtonStyled} from '../../Buttons/EmptyButton.styled'
import {SelectListContainer} from "../../Input/SelectInput/SelectListContainer";
import {SelectItemContainer} from '../../Input/SelectInput/SelectItemContainer'
import {TASK_STATUSES} from "../../../common/constants";

const Informer = React.lazy(() => import('../TaskInformer/TaskInformer').then(({TaskInformer}) => ({default: TaskInformer})))

export const TaskInfoModal: FC<TaskInfoModalProps> = ({onClose, onCloneEvent, onOpenClonedEvent}) => {
	
	const {taskId} = useParams<{ taskId: string }>()
	const {data: taskInfo, isLoading, error} = useGetTaskInfoQuery(
		taskId || "",
		{
			refetchOnMountOrArgChange: true,
			skip: !taskId
		}
	)
	const [removeTask, {data: removeTaskData, isLoading: isFetchingRemoveTask}] = useRemoveTaskMutation()
	const [updateTask, {data: updateTaskData, isLoading: isFetchingUpdateTask}] = useUpdateTaskMutation()
	
	return (
		<Modal
			style={{width: '90%'}}
			isView={!!taskId}
			onClose={() => onClose()}
		>
			
			<ModalHeader>
				<FlexBlock
					direction={'row'}
					justify={'space-between'}
					align={'center'}
					width={'100%'}
				>
					<FlexBlock fSize={15}>
						Режим просмотра и редактирования
					</FlexBlock>
					{taskInfo?.data && (
						<FlexBlock>
							<DropDown
								renderElement={({ref, onElementFocused, onElementBlur}) => (
									<EmptyButtonStyled
										type={'button'}
										onFocus={onElementFocused}
										onBlur={onElementBlur}
										ref={ref as RefObject<HTMLButtonElement>}
									>
										Действия
									</EmptyButtonStyled>
								)}
								dropDownChildren={(methods) => (
									<SelectListContainer>
										<SelectItemContainer
											onClick={() => {
												taskInfo.data && onCloneEvent && onCloneEvent({
													...taskInfo.data,
													linkedFrom: taskInfo.data.id,
													title: `CLONE - ${taskInfo.data.title}`
												})
												methods.focusOut()
											}}
										>
											Клонировать
										</SelectItemContainer>
										<SelectItemContainer
											onClick={() => {
												taskInfo.data
												&& onCloneEvent
												&& onCloneEvent({
													calendar: taskInfo.data.calendar,
													title: `ChildOf - `,
													parentId: taskInfo.data.id,
												})
												methods.focusOut()
											}}
										>
											Создать вложенное
										</SelectItemContainer>
										<SelectItemContainer
											onClick={() => {
												taskInfo.data
												&& updateTask({
													id: taskInfo.data.id,
													field: "status",
													data: TASK_STATUSES['completed'].key
												})
													.unwrap()
												methods.focusOut()
											}}
										>
											Завершить
										</SelectItemContainer>
										<SelectItemContainer
											onClick={() => {
												taskInfo.data && removeTask({id: taskInfo.data.id, remove: true})
													.then(() => onClose && onClose())
												methods.focusOut()
											}}
										>
											Удалить
										</SelectItemContainer>
									</SelectListContainer>
								)}
							/>
						</FlexBlock>
					)}
				</FlexBlock>
			</ModalHeader>
			<ModalBody>
				<ErrorBoundary
					title={'Произошла ошибка при отрисовке, мы уже работаем над этим'}
					errorType={'SYSTEM_ERROR'}
				>
					<Loader title={'Загрузка информации...'} isActive={isLoading}>
						<React.Suspense fallback={<Loader title={'Загрузка дополнительных скриптов...'} isActive={true}/>}>
							<Informer
								taskItem={taskInfo?.data || null}
								openClonedTask={onOpenClonedEvent}
								taskErrorInfo={(error && 'data' in error && error.data.info?.message) || ""}
							/>
						</React.Suspense>
					</Loader>
				</ErrorBoundary>
			</ModalBody>
		</Modal>
	)
	
	
}
