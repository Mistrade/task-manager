import React, {FC, useEffect} from 'react'
import {TaskInfoModalProps} from '../types'
import {Modal, ModalBody, ModalFooter, ModalHeader} from '../../Modal/Modal'
import {FlexBlock} from '../../LayoutComponents/FlexBlock'
import {StyledButton} from '../../Buttons/Buttons.styled'
import {defaultColor} from '../../../common/constants'
import {useLazyGetTaskInfoQuery} from "../../../store/api/taskApi";
import {useParams} from "react-router";
import {ErrorBoundary} from "../../Errors/ErrorBoundary";
import {Loader} from "../../Loaders/Loader";

const Informer = React.lazy(() => import('./../TaskInformer/TaskInformer').then(({TaskInformer}) => ({default: TaskInformer})))

export const TaskInfoModal: FC<TaskInfoModalProps> = ({onClose}) => {
	const {taskId} = useParams<{ taskId: string }>()
	const [getTaskInfo, {data: taskInfo, isFetching}] = useLazyGetTaskInfoQuery()
	
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
				{taskInfo?.data?.title || ''}
			</ModalHeader>
			<ModalBody>
				<ErrorBoundary
					title={'Произошла ошибка при отрисовке события, мы уже работаем над этим'}
					errorType={'SYSTEM_ERROR'}
				>
					<Loader title={'Загрузка информации события...'} isActive={isFetching}>
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
