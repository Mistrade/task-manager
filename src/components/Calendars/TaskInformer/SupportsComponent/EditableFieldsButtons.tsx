import {FC} from "react";
import {WhiteButton} from "../../../Buttons/Buttons.styled";
import {CancelIcon, CompleteIcon, LoaderIcon} from "../../../Icons/Icons";
import {currentColor, defaultColor} from "../../../../common/constants";

interface EditableFieldsButtonsProps {
	isLoading: boolean,
	onDecline?: () => void,
	
}

export const EditableFieldsButtons: FC<EditableFieldsButtonsProps> = ({isLoading, onDecline}) => {
	return (
		<>
			<WhiteButton type={'submit'}>
				{isLoading ? (
					<LoaderIcon size={22} color={currentColor}/>
				) : (
					<CompleteIcon size={22} color={currentColor}/>
				)}
			</WhiteButton>
			<WhiteButton type={'button'} onClick={onDecline}>
				<CancelIcon size={22} color={defaultColor}/>
			</WhiteButton>
		</>
	)
}