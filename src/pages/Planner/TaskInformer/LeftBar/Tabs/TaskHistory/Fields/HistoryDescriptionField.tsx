import {FC, useRef, useState} from "react";
import {FlexBlock} from "../../../../../../../components/LayoutComponents/FlexBlock";
import {BaseEventHistoryFieldProps} from "../event-history.types";
import {currentColor} from "../../../../../../../common/constants";
import {PreviewDescription} from "../../../../../RenderModes/DayCalendar/TaskList/TaskList.styled";
import {useIntersection} from "react-use";
import {DontHoveredButton} from "../../../../../../../components/Buttons/EmptyButton.styled";
import {ReplyContent} from "../Essences/EventEssence/event-essence.styled";
import {CopyToClipboardButton} from "../../../../../../../components/Buttons/CopyToClipboardButton";

export interface HistoryDescriptionFieldProps extends BaseEventHistoryFieldProps<string> {
	useCopied?: boolean
}


export const HistoryDescriptionField: FC<HistoryDescriptionFieldProps> = ({value, useCopied = true}) => {
	const [isOpen, setIsOpen] = useState(false)
	const ref = useRef<HTMLSpanElement>(null)
	
	const observer = useIntersection(ref, {
		root: null,
		rootMargin: '0px',
		threshold: 1
	})
	
	if (!value?.trim()) {
		return (
			<>Описание было удалено</>
		)
	}
	
	return (
		<FlexBlock direction={'column'} gap={6}>
			{value && useCopied && (
				<span>
						<CopyToClipboardButton
							style={'empty'}
							renderText={'Скопировать'}
							content={value || ''}
						/>
					</span>
			)}
			<PreviewDescription isOpen={isOpen}>
				{value?.trim()}
				<span ref={ref}></span>
			</PreviewDescription>
			{!observer?.isIntersecting && (
				<DontHoveredButton
					style={{width: 'fit-content', fontSize: 14, color: currentColor, padding: 0}}
					onClick={(e) => {
						e.stopPropagation()
						setIsOpen(true)
					}}
				>
					Показать полностью
				</DontHoveredButton>
			)}
		</FlexBlock>
	)
}