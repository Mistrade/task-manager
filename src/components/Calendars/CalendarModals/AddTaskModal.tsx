import React, {FC} from 'react'
import {AddTaskModalProps, CalendarTaskItem} from '../types'
import {Modal, ModalBody, ModalHeader} from '../../Modal/Modal'
import {ERROR_DESCRIPTIONS, ERROR_TITLES} from '../../../common/constants'
import {FlexBlock} from '../../LayoutComponents/FlexBlock'
import {Tooltip} from '../../Tooltip/Tooltip'
import {ErrorBoundary} from "../../Errors/ErrorBoundary";
import dayjs from "dayjs";
import {FullResponseEventModel} from "../../../store/api/taskApi/types";
import {useSearchNavigate} from "../../../hooks/useSearchNavigate";
import {DateHelper} from "../../../common/calendarSupport/dateHelper";

const Form = React.lazy(() => import('../Forms/AddTaskForm')
	.then(({AddTaskForm}) => ({default: AddTaskForm}))
)

export const AddTaskModal: FC<AddTaskModalProps> = ({
	                                                    date,
	                                                    onClose,
	                                                    clonedEventInfo,
	                                                    onSuccessClonedEvent,
	                                                    onComplete
                                                    }) => {
	
	const navigate = useSearchNavigate()
	
	const getInitialValues = (data: Partial<FullResponseEventModel> | null | undefined): CalendarTaskItem | undefined => {
		if (!data) {
			return undefined
		}
		
		const time = data.time
			? dayjs(data.time).toDate()
			: dayjs().toDate()
		
		const timeEnd = data.timeEnd
			? dayjs(data.timeEnd).toDate()
			: dayjs().add(1, 'hour').toDate()
		
		return {
			description: clonedEventInfo?.description || '',
			timeEnd,
			time,
			status: 'created',
			priority: data.priority || "medium",
			calendar: data.calendar?._id || "",
			createdAt: '',
			type: 'event',
			title: data.title || "",
			members: [],
			link: data.link || null,
			linkedFrom: data.id || "",
			parentId: data.parentId || "",
		}
	}
	
	return (
		<Modal
			isView={true}
		>
			<ModalHeader>
				<Tooltip
					text={'Дата выбирается автоматически, когда вы нажимаете "Добавить задание".\nЕсли дата была в прошлом, выберется текущий календарный день и время.'}
					children={`Добавить на ${DateHelper.getHumanizeDateValue(date || new Date())}`}
					placement={'right'}
				/>
			</ModalHeader>
			<ModalBody>
				<FlexBlock minWidth={'50vw'} maxWidth={'60vw'} grow={10} height={'100%'}>
					<ErrorBoundary
						title={ERROR_TITLES['SUSPENSE']}
						description={ERROR_DESCRIPTIONS['SUSPENSE']}
						errorType={'SYSTEM_ERROR'}
					>
						<React.Suspense fallback={'Загрузка формы...'}>
							<Form
								onComplete={(value, taskId) => {
									if (value.linkedFrom || value.parentId) {
										onSuccessClonedEvent && onSuccessClonedEvent(value.time, 'created', taskId)
									} else {
										onClose && onClose()
									}
								}}
								initialValues={getInitialValues(clonedEventInfo)}
								onCancel={(value) => {
									onClose && onClose()
									if (clonedEventInfo?.parentId) {
										history.back()
									}
								}}
								date={date}
							/>
						</React.Suspense>
					</ErrorBoundary>
				</FlexBlock>
			</ModalBody>
		</Modal>
	)
}
