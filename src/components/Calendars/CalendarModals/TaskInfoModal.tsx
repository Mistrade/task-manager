import React, {FC} from 'react'
import {TaskInfoModalProps} from '../types'
import {Modal, ModalBody, ModalFooter, ModalHeader} from '../../Modal/Modal'
import {FlexBlock} from '../../LayoutComponents/FlexBlock'
import {StyledButton} from '../../Buttons/Buttons.styled'
import {defaultColor} from '../../../common/constants'

const Informer = React.lazy(() => import('./../TaskInformer/TaskInformer').then(({TaskInformer}) => ({default: TaskInformer})))

export const TaskInfoModal: FC<TaskInfoModalProps> = ({selectedTask, onClose}) => {
	
	if (!!selectedTask) {
		return (
			<Modal
				isView={!!selectedTask}
				onClose={() => onClose()}
			>
				<ModalHeader>
					Событие #{selectedTask?.taskInfo.id || ''}
				</ModalHeader>
				<ModalBody>
					<React.Suspense fallback={'Загрузка данных по задаче...'}>
						<Informer taskItem={selectedTask}/>
					</React.Suspense>
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
	
	return <></>
}
