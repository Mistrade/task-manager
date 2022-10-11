import React, {FC, RefObject, useCallback, useEffect} from 'react'
import {TaskInfoModalProps} from '../types'
import {Modal, ModalBody, ModalFooter, ModalHeader} from '../../Modal/Modal'
import {FlexBlock} from '../../LayoutComponents/FlexBlock'
import {StyledButton} from '../../Buttons/Buttons.styled'
import {defaultColor} from '../../../common/constants'
import {useLazyGetTaskInfoQuery} from "../../../store/api/taskApi/taskApi";
import {useParams} from "react-router";
import {ErrorBoundary} from "../../Errors/ErrorBoundary";
import {Loader} from "../../Loaders/Loader";
import {DropDownButton} from "../../Buttons/DropDownButton";
import {DropDown} from "../../Dropdown/DropDown";
import {EmptyButtonStyled} from '../../Buttons/EmptyButton.styled'
import {SelectListContainer} from "../../Input/SelectInput/SelectListContainer";
import {SelectItemContainer} from '../../Input/SelectInput/SelectItemContainer'
import {ObjectId} from "../../../store/api/taskApi/types";

const Informer = React.lazy(() => import('./../TaskInformer/TaskInformer').then(({TaskInformer}) => ({default: TaskInformer})))

export const TaskInfoModal: FC<TaskInfoModalProps> = ({onClose, onCloneEvent, onOpenClonedEvent}) => {
	const {taskId} = useParams<{ taskId: string }>()
	const [getTaskInfo, {currentData: taskInfo, isFetching: isLoading}] = useLazyGetTaskInfoQuery()
	
	useEffect(() => {
		taskId && getTaskInfo(taskId)
		
		return () => {
		}
	}, [taskId])
	
	return (
		<Modal
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
						Режим просмотра и редактирования события
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
												taskInfo.data && onCloneEvent && onCloneEvent(taskInfo.data)
												methods.focusOut()
											}}
										>
											Клонировать событие
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
					title={'Произошла ошибка при отрисовке события, мы уже работаем над этим'}
					errorType={'SYSTEM_ERROR'}
				>
					<Loader title={'Загрузка информации события...'} isActive={isLoading}>
						<React.Suspense fallback={<Loader title={'Загрузка дополнительных скриптов...'} isActive={true}/>}>
							<Informer
								taskItem={taskInfo?.data || null}
								openClonedTask={onOpenClonedEvent}
							/>
						</React.Suspense>
					</Loader>
				</ErrorBoundary>
			</ModalBody>
			<ModalFooter>
				<FlexBlock justify={'end'} align={'center'} width={'100%'}>
					<StyledButton>
						Ок
					</StyledButton>
					<StyledButton
						onClick={() => onClose()}
						fillColor={'#fff'}
						textColor={defaultColor}
					>
						Закрыть
					</StyledButton>
				</FlexBlock>
			</ModalFooter>
		</Modal>
	)
	
	
}
