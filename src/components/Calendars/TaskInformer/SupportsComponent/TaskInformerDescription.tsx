import {FC, useState} from "react";
import {useFormik} from "formik";
import {FlexBlock} from "../../../LayoutComponents/FlexBlock";
import {TextAreaInput} from "../../../Input/TextAreaInput/TextAreaInput";
import {EditableFieldsButtons} from "./EditableFieldsButtons";
import {UsageTaskItemBaseProps} from "../../types";
import {TaskInformerUpdateFn} from "./ToggleTaskInformerButtons";
import styled, {css} from "styled-components";
import {borderRadiusSize, currentColor, disabledColor} from "../../../../common/constants";
import {Tooltip} from "../../../Tooltip/Tooltip";
import {EmptyButtonStyled} from "../../../Buttons/EmptyButton.styled";
import {PencilIcon} from "../../../Icons/Icons";
import {StyledTaskInformerLinkForm} from "../TaskInformer.styled";
import {InputLabel} from "../../../Input/InputSupportComponents/InputLabel";

interface TaskInformerDescriptionProps extends UsageTaskItemBaseProps {
	updateFn: TaskInformerUpdateFn,
}

interface TaskInformerDescriptionInputProps {
	initialValue: string,
	updateFn: (value: string) => Promise<void>,
	onDecline?: () => void,
	onComplete?: () => void,
	clearOnDecline?: boolean,
	clearOnComplete?: boolean
	inputLabel?: string,
	inputPlaceholder?: string,
	rows?: number,
	inputId?: string,
}

export interface TaskInformerDescriptionTextProps {
	description: string,
	onEdit?: (value: boolean) => void
}

export const TaskInformerDescriptionText: FC<TaskInformerDescriptionTextProps> = ({description, onEdit}) => {
	return (
		<TaskInformerDescriptionContainer>
			<FlexBlock
				fSize={16}
				additionalCss={css`
          max-height: 300px;
          overflow-y: auto;
          overflow-x: hidden;
          -webkit-scroll-snap-type: none;
				`}
			>
				<FlexBlock
					fSize={16}
					additionalCss={css`
            white-space: pre-wrap;
            padding-right: 42px;
            word-wrap: anywhere;
					`}
				>
					{description || 'Описание отсутствует'}
				</FlexBlock>
			</FlexBlock>
			{onEdit && (
				<FlexBlock
					position={'absolute'}
					additionalCss={css`
            top: 4px;
            right: 4px
					`}
				>
					<EmptyButtonStyled onClick={() => onEdit(true)}>
						<PencilIcon size={22}/>
					</EmptyButtonStyled>
				</FlexBlock>
			)}
		</TaskInformerDescriptionContainer>
	)
}

export const TaskInformerDescriptionInput: FC<TaskInformerDescriptionInputProps> = ({
																																											initialValue,
																																											updateFn,
																																											onDecline,
																																											clearOnDecline,
																																											inputPlaceholder,
																																											inputLabel,
																																											rows = 3,
																																											inputId,
																																											onComplete,
																																											clearOnComplete
																																										}) => {
	const [loading, setLoading] = useState(false)
	const formik = useFormik({
		initialValues: {description: initialValue},
		async onSubmit(values) {
			if (!!values.description && values.description !== initialValue) {
				setLoading(true)
				await updateFn(values.description)
					.then(() => {
						onComplete && onComplete()
						if (clearOnComplete) {
							formik.setFieldValue('description', '')
						}
					})
					.finally(() => setLoading(false))
			}
		}
	})
	
	return (
		<StyledTaskInformerLinkForm
			onSubmit={formik.handleSubmit}
		>
			<FlexBlock direction={'column'} gap={6} width={'100%'}>
				<InputLabel label={inputLabel} inputId={inputId}/>
				<FlexBlock direction={'row'} gap={12} width={'100%'}>
					<TextAreaInput
						rows={rows}
						value={formik.values.description}
						onChange={(v) => formik.setFieldValue('description', v)}
						placeholder={inputPlaceholder}
					/>
					<FlexBlock
						direction={'column'}
						width={'fit-content'}
						justify={'flex-start'}
						gap={12}
					>
						<EditableFieldsButtons
							isLoading={loading}
							onDecline={() => {
								onDecline && onDecline()
								if (clearOnDecline) {
									formik.setFieldValue('description', '')
								}
							}}
						/>
					</FlexBlock>
				</FlexBlock>
			</FlexBlock>
		</StyledTaskInformerLinkForm>
	)
}
const TaskInformerDescriptionContainer = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 6px;
  width: 100%;
  align-items: flex-start;
  position: relative;
  padding: 12px 8px;
  border-radius: ${borderRadiusSize.sm};
  border: 2px solid ${disabledColor};

`
export const TaskInformerDescription: FC<TaskInformerDescriptionProps> = ({taskItem, updateFn}) => {
	const [editMode, setEditMode] = useState(false)
	
	return (
		<FlexBlock direction={'column'}>
			{editMode ? (
				<TaskInformerDescriptionInput
					initialValue={taskItem.description}
					updateFn={(value) => updateFn('description', value)}
					onDecline={() => setEditMode(false)}
					onComplete={() => setEditMode(false)}
					rows={18}
					inputLabel={'Подробное описание'}
					inputPlaceholder={'Постарайтесь объяснить, что нужно сделать'}
				/>
			) : (
				<FlexBlock width={'100%'} direction={'column'} gap={6}>
					<FlexBlock
						fSize={16}
						gap={6}
						pl={8}
						additionalCss={css`color: ${currentColor};`}
					>
						Описание
						<Tooltip
							size={16}
							text={'Зачастую описание не помещается в выделенную для него область, попробуйте скроллить блок ниже, для получения дополнительной информации'}
							placement={'top'}
						/>
					</FlexBlock>
					<TaskInformerDescriptionText description={taskItem.description || ""} onEdit={(value) => setEditMode(value)}/>
				</FlexBlock>
			)}
		</FlexBlock>
	)
}