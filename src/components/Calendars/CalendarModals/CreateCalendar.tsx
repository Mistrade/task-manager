import {Modal, ModalBody, ModalFooter, ModalHeader} from "../../Modal/Modal";
import {FC, useEffect, useMemo} from "react";
import {FlexBlock} from "../../LayoutComponents/FlexBlock";
import {colorPalette, currentColor, disabledColor} from "../../../common/constants";
import {CalendarListStyled} from "../CalendarList/CalendarList.styled";
import {useFormik} from "formik";
import * as yup from 'yup'
import {ColorScheme} from "../ColorScheme/ColorScheme";
import {TextInput} from "../../Input/TextInput/TextInput";
import {ServerResponse, useCreateCalendarMutation, useGetCalendarsQuery} from "../../../store/api/taskApi/taskApi";
import {CalendarNameListItem} from "../CalendarList/CalendarNameListItem";
import {Tooltip} from "../../Tooltip/Tooltip";
import {Button, WhiteButton} from "../../Buttons/Buttons.styled";
import {InputErrorMessage} from "../../Input/InputSupportComponents/InputErrorMessage";
import {toast} from "react-toastify";

interface CreateCalendarModalProps {
	onClose?: () => void
}

export interface CreateCalendarFormData {
	color: string,
	title: string,
}

const validationSchema = yup.object().shape({
	color: yup.string()
		.oneOf(colorPalette, 'Выберите цвет из предложенных')
		.required('Выберите цвет календаря'),
	title: yup.string()
		.min(5, 'Минимальная длина - 5 символов')
		.max(20, 'Максимальная длина - 20 символов')
		.required('Укажите название календаря')
	
})

export const CreateCalendarModal: FC<CreateCalendarModalProps> = ({onClose}) => {
	const {currentData} = useGetCalendarsQuery({})
	const [create] = useCreateCalendarMutation()
	
	const {
		setFieldValue,
		values,
		errors,
		touched,
		setFieldTouched,
		handleSubmit,
		setFieldError
	} = useFormik<CreateCalendarFormData>({
		validationSchema,
		initialValues: {
			color: currentColor,
			title: 'Мой новый календарь'
		},
		async onSubmit(values, {setFieldError}) {
			if (currentData?.data && currentData.data.length > 0) {
				const notOneOf: Array<CreateCalendarFormData> = currentData.data.map((item) => ({
					color: item.color,
					title: item.title
				}))
				
				const hasTitle = notOneOf.some((item) => item.title.toLowerCase().trim() === values.title.toLowerCase().trim())
				
				if (hasTitle) {
					return setFieldError('title', 'Такое название уже используется')
				}
				
				const hasColor = notOneOf.some((item) => item.color.trim().toLowerCase() === values.color.toLowerCase().trim())
				
				if (hasColor) {
					return setFieldError('color', 'Выбранный цвет уже используется')
				}
			}
			
			await create(values)
				.unwrap()
				.then((r: ServerResponse) => {
					if (r.info) {
						toast(r.info.message, {type: r.info.type})
					}
					return onClose && onClose()
				})
				.catch((e: ServerResponse) => {
					return e.info ? toast(e.info.message, {type: e.info.type}) : null
				})
			
			
		}
	})
	
	const list: Array<CreateCalendarFormData> = useMemo(() => {
		const item = {
			title: `new - ${values.title}`,
			color: values.color
		}
		
		if (currentData?.data) {
			const a: Array<CreateCalendarFormData> = currentData.data.map((item) => ({
				color: item.color,
				title: item.title
			}))
			
			a.unshift(item)
			return a
		}
		
		return [item]
	}, [currentData?.data, values])
	
	return (
		<form onSubmit={handleSubmit}>
			
			<Modal
				isView={true}
				onClose={onClose}
			>
				<ModalHeader>
					<FlexBlock align={'center'} justify={'flex-start'} gap={12}>
						<FlexBlock fSize={20}>
							Создайте новый календарь
						</FlexBlock>
						<Tooltip
							text={'Календари нужны для разделения событий по группам, например для разделения рабочих и домашних дел. Используйте форму ниже, чтобы создать календарь.'}
							placement={'bottom'}
						/>
					</FlexBlock>
				</ModalHeader>
				<ModalBody>
					<FlexBlock p={20} direction={'row'} gap={12}>
						<FlexBlock direction={'column'} shrink={1} grow={0} maxWidth={400} gap={24}>
							<FlexBlock>
								<TextInput
									label={'Укажите название календаря'}
									value={values.title}
									onChange={(e) => setFieldValue('title', e.target.value)}
									placeholder={'От 5 до 20 символов'}
									errorMessage={errors.title}
									isDirty={touched.title}
									onFocus={() => setFieldTouched('title', true, false)}
								/>
							</FlexBlock>
							<FlexBlock direction={'column'} width={'100%'}>
								<FlexBlock style={{color: currentColor}} mb={8} pl={8}>
									Выберите понравившийся цвет
								</FlexBlock>
								<FlexBlock width={'100%'} direction={'column'} gap={6}>
									<ColorScheme
										selectedValue={values.color}
										isError={!!errors.color}
										size={40}
										gap={2}
										onSelect={(color) => {
											!touched.color && setFieldTouched('color', true, false)
											color !== values.color && setFieldValue('color', color)
										}}
									/>
									<InputErrorMessage isDirty={touched.color} errorMessage={errors.color}/>
								</FlexBlock>
							</FlexBlock>
						</FlexBlock>
						<FlexBlock
							shrink={0}
							grow={0}
							direction={'column'}
							borderLeft={`1px solid ${disabledColor}`}
							pl={12}
							minWidth={'300px'}
							maxWidth={'300px'}
						>
							<FlexBlock mb={12}>
								Посмотрите, как это будет выглядеть
							</FlexBlock>
							{list.length > 0 && (
								<CalendarListStyled>
									{list.map((item) => (
										<CalendarNameListItem
											item={{
												color: item.color,
												title: `${item.title || 'Название календаря'}`,
												_id: '',
												deletable: false,
												editable: false,
												isSelected: true
											}}
											isChecked={true}
										/>
									))}
								</CalendarListStyled>
							)}
						</FlexBlock>
					</FlexBlock>
				</ModalBody>
				<ModalFooter>
					<FlexBlock width={'100%'} justify={'flex-end'} align={'center'} gap={8}>
						<Button type={'submit'}>
							Сохранить календарь
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