import React, {FC} from 'react'
import {AddTaskModalProps} from '../types'
import {Modal, ModalBody, ModalHeader} from '../../Modal/Modal'
import {getHumanizeDateValue} from '../../../common/constants'
import {FlexBlock} from '../../LayoutComponents/FlexBlock'
import {useAppDispatch} from '../../../store/hooks/hooks'
import {addEvent} from '../../../store/thunk/events'
import {Tooltip} from '../../Tooltip/Tooltip'

const Form = React.lazy(() => import('./../Forms/AddTaskForm').then(({AddTaskForm}) => ({default: AddTaskForm})))

export const AddTaskModal: FC<AddTaskModalProps> = ({date, onClose}) => {
	const dispatch = useAppDispatch()
	
	if (!!date) {
		return (
			<Modal
				isView={!!date}
				onClose={onClose}
			>
				<ModalHeader>
					<Tooltip
						text={'Дата выбирается автоматически, когда вы нажимаете "Добавить задание".\nЕсли дата была в прошлом, выберется текущий календарный день и время.'}
						children={`Добавить событие ${getHumanizeDateValue(date?.value || new Date(), false)}`}
						placement={'right'}
					/>
				</ModalHeader>
				<ModalBody>
					<FlexBlock minWidth={'50vw'} maxWidth={'60vw'} grow={10}>
						<React.Suspense fallback={'Загрузка формы...'}>
							<Form
								onComplete={(value) => {
									console.log('onComplete')
									dispatch(
										addEvent({
											event: value,
											onComplete: () => onClose && onClose()
										})
									)
								}}
								onCancel={(value) => onClose && onClose()}
								date={date}
							/>
						</React.Suspense>
					</FlexBlock>
				</ModalBody>
			</Modal>
		)
	}
	
	return <></>
}
