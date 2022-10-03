import {Modal, ModalBody, ModalFooter, ModalHeader} from "../../Modal/Modal";
import {CalendarNameItem} from "../CalendarList/CalendarNameListItem";
import {FC} from "react";
import {FlexBlock} from "../../LayoutComponents/FlexBlock";
import {Button, WhiteButton} from "../../Buttons/Buttons.styled";
import {useFormik} from "formik";
import {useGetCalendarsQuery, useHasTasksInCalendarQuery} from "../../../store/api/taskApi/taskApi";
import {Loader} from "../../Loaders/Loader";
import {SelectInput} from "../../Input/SelectInput/SelectInput";
import {SelectListContainer} from "../../Input/SelectInput/SelectListContainer";
import {SelectItemContainer} from "../../Input/SelectInput/SelectItemContainer";
import {currentColor} from "../../../common/constants";
import {Informer} from "../../Content/Informer";

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
	const {data, isFetching, isError: isHasTasksError} = useHasTasksInCalendarQuery({id: calendarItem._id})
	const {
		data: calendarList,
		isFetching: isCalendarListFetching,
		isError: isGetCalendarsError
	} = useGetCalendarsQuery({exclude: ['Invite']})
	const {handleSubmit, setFieldValue} = useFormik({
		initialValues: {
			id: '',
		},
		onSubmit() {
		
		}
	})
	return (
		<form onSubmit={handleSubmit}>
			<Modal
				isView={true}
				onClose={onClose}
			>
				<ModalHeader>
					Вы действительно собираетесь удалить "{calendarItem.title}" ?
				</ModalHeader>
				<ModalBody>
					<FlexBlock p={20} direction={'column'} width={'100%'} gap={24}>
						<Loader
							title={isFetching ? 'Проверяем наличие событий в календаре' : isCalendarListFetching ? 'Загружаем список календарей' : 'Загрузка недостающих данных'}
							isActive={isFetching || isCalendarListFetching}
						>
							<FlexBlock direction={'column'}>
								<Informer
									header={'Подтвердите действие'}
									text={`Мы нашли ${data?.data} событий в удаляемом календаре, выберите что с ними сделать`}
									type={'info'}
								/>
							</FlexBlock>
							<SelectInput
								containerProps={{width: '100%'}}
								label={'Укажите календарь, в который перенести события'}
								data={calendarList?.data || []}
								renderData={(data, methods) => (
									<SelectListContainer>
										{!!data.length ? (
											<>
												{data.map((item) => (
													<SelectItemContainer
														key={item._id}
														onClick={() => {
															setFieldValue('calendar', item._id)
															methods.focusOut()
														}}
													>
														<FlexBlock width={20} height={20} bgColor={item.color} borderRadius={4}/>
														{item.title}
													</SelectItemContainer>
												))}
											</>
										) : (
											<SelectItemContainer>
												Не удалось загрузить данные
											</SelectItemContainer>
										)}
									</SelectListContainer>
								)}
							/>
							<FlexBlock width={'100%'} justify={'center'}>
								<FlexBlock maxWidth={400} justify={'center'} p={8} borderRadius={4}
													 border={`1px solid ${currentColor}`}>
									Мы нашли {data?.data || 0} событий в календаре, который вы хатите удалить<br/>
									Чтобы не потерять все события вам нужно выбрать календарь, в который мы перенесем события из
									удаленного
								</FlexBlock>
							</FlexBlock>
						</Loader>
					</FlexBlock>
				</ModalBody>
				<ModalFooter>
					<FlexBlock direction={'row'} justify={'flex-end'} align={'center'} width={'100%'} gap={8}>
						<Button type={'submit'} disabled={isGetCalendarsError || isHasTasksError}>
							Удалить
						</Button>
						<WhiteButton onClick={onClose}>
							Отмена
						</WhiteButton>
					</FlexBlock>
				</ModalFooter>
			</Modal>
		</form>
	)
}