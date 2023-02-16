import {Modal, ModalBody, ModalFooter, ModalHeader} from "../../Modal/Modal";
import {CalendarNameItem} from "../CalendarList/CalendarNameListItem";
import {FC} from "react";
import {FlexBlock} from "../../LayoutComponents/FlexBlock";
import {Button, WhiteButton} from "../../Buttons/Buttons.styled";
import {useDeleteCalendarMutation} from "../../../store/api/taskApi/taskApi";
import {toast} from "react-toastify";

interface RemoveCalendarModalBaseProps {
	onClose?: () => void,
	onSuccess?: () => void,
}

interface RemoveCalendarHockProps extends RemoveCalendarModalBaseProps {
	calendarItem: CalendarNameItem | null,
}

interface RemoveCalendarControllerProps extends RemoveCalendarModalBaseProps {
	calendarItem: CalendarNameItem,
}

interface RemoveCalendarModalProps extends RemoveCalendarControllerProps {
	count: number
}

export const RemoveCalendarHock: FC<RemoveCalendarHockProps> = (props) => {
	if (props.calendarItem !== null) {
		return <RemoveCalendarModal {...props} count={0} calendarItem={props.calendarItem}/>
	}
	
	return <></>
}


// const RemoveCalendarController: FC<RemoveCalendarControllerProps> = ({calendarItem}) => {
// 	const {data, isFetching, isError: isHasTasksError} = useHasTasksInCalendarQuery({id: calendarItem._id})
// 	//Здесь сделать разводяшую страницу - если таски есть, предложить выбор удалить календарь с тасками или перенести все таски в другой календарь
//
// 	if (data?.data && data.data > 0) {
// 		return (
// 			<FlexBlock direction={'column'}>
// 				<Informer
// 					header={'Подтвердите действие'}
// 					text={`Мы нашли ${data.data} событий в удаляемом календаре, выберите что с ними сделать`}
// 					type={'info'}
// 				/>
// 			</FlexBlock>
// 		)
// 	}
// }

export const RemoveCalendarModal: FC<RemoveCalendarModalProps> = ({calendarItem, count, onSuccess, onClose}) => {
	const [removeCalendar, {data}] = useDeleteCalendarMutation()
	return (
		<Modal
			style={{height: "fit-content"}}
			isView={true}
			onClose={onClose}
		>
			<ModalHeader>
				Вы действительно собираетесь удалить "{calendarItem.title}" ?
			</ModalHeader>
			<ModalBody>
				<FlexBlock p={20} direction={'column'} width={'100%'}>
					<FlexBlock
						width={'100%'}
						justify={'center'}
						direction={'column'}
					>
						Вы уверены, что хотите удалить календарь "{calendarItem.title}"?<br/>
						<strong>Все события, закрепленные за данным календарем, будут так же удалены.</strong>
					</FlexBlock>
				</FlexBlock>
			</ModalBody>
			<ModalFooter>
				<FlexBlock direction={'row'} justify={'flex-end'} align={'center'} width={'100%'} gap={8}>
					<Button
						type={'button'}
						onClick={async () => {
							await removeCalendar({
								id: calendarItem._id
							})
								.unwrap()
								.then((response) => {
									if (response.info) {
										toast(response.info?.message, {type: response.info.type})
									}
									onSuccess && onSuccess()
								})
						}}
					>
						Удалить
					</Button>
					<WhiteButton onClick={onClose}>
						Отмена
					</WhiteButton>
				</FlexBlock>
			</ModalFooter>
		</Modal>
	)
}