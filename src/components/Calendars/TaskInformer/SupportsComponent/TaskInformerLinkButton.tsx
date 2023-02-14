import {EventItem, EventLinkItem} from "../../types";
import {TaskInformerUpdateFn} from "./ToggleTaskInformerButtons";
import {FC, useState} from "react";
import {useFormik} from "formik";
import * as yup from "yup";
import {LinkValidationSchema} from "../../Forms/AddTaskForm";
import {SelectLinks} from "../../../Input/SelectInput/CalendarSelectInputs/SelectLinks";
import {FlexBlock} from "../../../LayoutComponents/FlexBlock";
import {JoinToEventButton, WhiteButton} from "../../../Buttons/Buttons.styled";
import {EmptyButtonStyled} from "../../../Buttons/EmptyButton.styled";
import {PencilIcon} from "../../../Icons/Icons";
import {EditableFieldsButtons} from "./EditableFieldsButtons";
import {StyledTaskInformerLinkForm} from "../TaskInformer.styled";

interface InformerTaskAddLinkProps {
	onDecline: () => void,
	onSave: (field: 'link', data: EventLinkItem) => Promise<void>,
	link: EventLinkItem | null
}

const TaskInformerLinkInput: FC<InformerTaskAddLinkProps> = ({onDecline, onSave, link}) => {
	const [loading, setLoading] = useState(false)
	const {values, setFieldValue, handleSubmit} = useFormik({
		initialValues: {link},
		validationSchema: yup.object().shape({
			link: LinkValidationSchema
		}),
		async onSubmit(values, formikHelpers) {
			if (values.link && link?.value !== values.link?.value) {
				setLoading(true)
				await onSave('link', values.link).then(() => onDecline()).finally(() => setLoading(false))
			}
		}
	})
	
	return (
		<StyledTaskInformerLinkForm onSubmit={handleSubmit}>
			<SelectLinks
				initialLinkValue={values.link}
				label={'Ссылка для подключения'}
				initialShowNotification={false}
				inputId={'select__link'}
				onChange={(value) => {
					setFieldValue('link', value, false)
				}}
				buttons={<EditableFieldsButtons isLoading={loading} onDecline={onDecline}/>}
			/>
		</StyledTaskInformerLinkForm>
	)
}

interface TaskInformerLinkButtonProps {
	link: EventItem['link'],
	updateFn: TaskInformerUpdateFn
}

export const TaskInformerLinkButton: FC<TaskInformerLinkButtonProps> = ({link, updateFn}) => {
	const [editMode, setEditMode] = useState(false)
	
	const declineHandler = () => {
		setEditMode(false)
	}
	
	return (
		<FlexBlock justify={'flex-start'} align={'center'} width={'100%'} gap={6}>
			{editMode ? (
				<TaskInformerLinkInput
					link={link}
					onDecline={declineHandler}
					onSave={updateFn}
				/>
			) : link?.value ? (
				<>
					<JoinToEventButton
						href={link.value}
						target={'_blank'}
						rel={''}
					>
						Подключиться по ссылке
					</JoinToEventButton>
					<EmptyButtonStyled onClick={() => setEditMode(true)}>
						<PencilIcon size={22}/>
					</EmptyButtonStyled>
				</>
			) : (
				<WhiteButton onClick={() => setEditMode(true)}>
					Добавить ссылку
				</WhiteButton>
			)}
		</FlexBlock>
	)
}