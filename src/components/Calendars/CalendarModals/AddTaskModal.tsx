import React, {FC} from 'react'
import {AddTaskModalProps} from '../types'
import {Modal, ModalBody, ModalHeader} from '../../Modal/Modal'
import {ERROR_DESCRIPTIONS, ERROR_TITLES, getHumanizeDateValue} from '../../../common/constants'
import {FlexBlock} from '../../LayoutComponents/FlexBlock'
import {Tooltip} from '../../Tooltip/Tooltip'
import {ErrorBoundary} from "../../Errors/ErrorBoundary";
import dayjs from "dayjs";

const Form = React.lazy(() => import('./../Forms/AddTaskForm')
	.then(({AddTaskForm}) => ({default: AddTaskForm}))
)

export const AddTaskModal: FC<AddTaskModalProps> = ({date, onClose, clonedEventInfo}) => {
	console.log(clonedEventInfo)
	return (
		<Modal
			isView={true}
			onClose={onClose}
		>
			<ModalHeader>
				<Tooltip
					text={'Дата выбирается автоматически, когда вы нажимаете "Добавить задание".\nЕсли дата была в прошлом, выберется текущий календарный день и время.'}
					children={`Добавить событие ${getHumanizeDateValue(date || new Date(), false)}`}
					placement={'right'}
				/>
			</ModalHeader>
			<ModalBody>
				<FlexBlock minWidth={'50vw'} maxWidth={'60vw'} grow={10}>
					<ErrorBoundary
						title={ERROR_TITLES['SUSPENSE']}
						description={ERROR_DESCRIPTIONS['SUSPENSE']}
						errorType={'SYSTEM_ERROR'}
					>
						<React.Suspense fallback={'Загрузка формы...'}>
							<Form
								onComplete={(value) => {
									console.log('onComplete')
									onClose && onClose()
								}}
								initialValues={clonedEventInfo ? {
									description: clonedEventInfo?.description || '',
									timeEnd: dayjs(clonedEventInfo?.timeEnd).toDate(),
									time: dayjs(clonedEventInfo.time).toDate(),
									status: 'created',
									priority: clonedEventInfo.priority,
									calendar: clonedEventInfo.calendar._id,
									createdAt: '',
									type: 'event',
									title: clonedEventInfo.title,
									members: [],
									link: clonedEventInfo.link,
									linkedFrom: clonedEventInfo.id,
								} : undefined}
								onCancel={(value) => onClose && onClose()}
								date={date}
							/>
						</React.Suspense>
					</ErrorBoundary>
				</FlexBlock>
			</ModalBody>
		</Modal>
	)
}
