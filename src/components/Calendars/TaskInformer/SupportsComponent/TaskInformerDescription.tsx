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

interface TaskInformerDescriptionProps extends UsageTaskItemBaseProps {
	updateFn: TaskInformerUpdateFn,
}

interface TaskInformerDescriptionInputProps {
	value: string,
	updateFn: TaskInformerUpdateFn,
	onDecline: () => void
}

const TaskInformerDescriptionInput: FC<TaskInformerDescriptionInputProps> = ({value, updateFn, onDecline}) => {
	const [loading, setLoading] = useState(false)
	const formik = useFormik({
		initialValues: {description: value},
		async onSubmit(values) {
			if (!!values.description && values.description !== value) {
				setLoading(true)
				await updateFn('description', values.description).then(() => onDecline()).finally(() => setLoading(false))
			}
		}
	})
	
	return (
		<StyledTaskInformerLinkForm onSubmit={formik.handleSubmit}>
			<FlexBlock direction={'column'} gap={6} width={'100%'}>
				<TextAreaInput
					rows={18}
					value={formik.values.description}
					onChange={(v) => formik.setFieldValue('description', v)}
					label={'Подробное описание события'}
					placeholder={'Постарайтесь объяснить, что нужно сделать в этом событии'}
				/>
				<FlexBlock direction={'row'} width={'fit-content'} gap={6}>
					<EditableFieldsButtons isLoading={loading} onDecline={onDecline}/>
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
					value={taskItem.description}
					updateFn={updateFn}
					onDecline={() => setEditMode(false)}
				/>
			) : (
				<FlexBlock width={'100%'} direction={'column'} gap={6}>
					<FlexBlock
						fSize={16}
						gap={6}
						pl={8}
						additionalCss={css`color: ${currentColor};`}
					>
						Описание события
						<Tooltip
							size={16}
							text={'Зачастую описание события не помещается в выделенную для него область, попробуйте скроллить блок ниже, для получения дополнительной информации'}
							placement={'top'}
						/>
					</FlexBlock>
					<TaskInformerDescriptionContainer>
						<FlexBlock
							fSize={16}
							additionalCss={css`
                max-height: 300px;
                overflow-y: scroll;
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
								{taskItem.description || 'У данного события нет описания'}
							</FlexBlock>
						</FlexBlock>
						<FlexBlock
							position={'absolute'}
							additionalCss={css`
                top: 4px;
                right: 4px
							`}
						>
							<EmptyButtonStyled onClick={() => setEditMode(true)}>
								<PencilIcon size={22}/>
							</EmptyButtonStyled>
						</FlexBlock>
					</TaskInformerDescriptionContainer>
				</FlexBlock>
			)}
		</FlexBlock>
	)
}