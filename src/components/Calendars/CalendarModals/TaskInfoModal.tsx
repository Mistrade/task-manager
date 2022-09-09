import React, {FC, useEffect} from 'react'
import {TaskInfoModalProps} from '../types'
import {Modal, ModalBody, ModalFooter, ModalHeader} from '../../Modal/Modal'
import {FlexBlock} from '../../LayoutComponents/FlexBlock'
import {StyledButton} from '../../Buttons/Buttons.styled'
import {defaultColor} from '../../../common/constants'
import {useLazyGetTaskInfoQuery} from "../../../store/api/taskApi/taskApi";
import {useParams} from "react-router";
import {ErrorBoundary} from "../../Errors/ErrorBoundary";
import {Loader} from "../../Loaders/Loader";
import {Heading} from '../../Text/Heading'

const Informer = React.lazy(() => import('./../TaskInformer/TaskInformer').then(({TaskInformer}) => ({default: TaskInformer})))

export const TaskInfoModal: FC<TaskInfoModalProps> = ({onClose}) => {
	const {taskId} = useParams<{ taskId: string }>()
	const [getTaskInfo, {data: taskInfo, isLoading}] = useLazyGetTaskInfoQuery()
	
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
				Режим просмотра и редактирования события
			</ModalHeader>
			<ModalBody>
				<ErrorBoundary
					title={'Произошла ошибка при отрисовке события, мы уже работаем над этим'}
					errorType={'SYSTEM_ERROR'}
				>
					<Loader title={'Загрузка информации события...'} isActive={isLoading}>
						<React.Suspense fallback={<Loader title={'Загрузка дополнительных скриптов...'} isActive={true}/>}>
							<Informer taskItem={taskInfo?.data || null}/>
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
