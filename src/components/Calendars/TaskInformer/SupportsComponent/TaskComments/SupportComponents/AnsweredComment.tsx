import {AnswerIcon} from "../../../../../Icons/CalendarIcons/AnswerIcon";
import {FlexBlock} from "../../../../../LayoutComponents/FlexBlock";
import {TaskPreviewDescription} from "../../../../RenderModes/DayCalendar/TaskList/TaskList.styled";
import {MessageItemContainer, MessagesContainer} from "../TaskComments";
import {CommentModel} from "../../../../../../store/api/taskApi/types";
import {FC} from "react";
import {LinkStyled} from "../../../../../Buttons/Link.styled";
import {EmptyButtonStyled} from "../../../../../Buttons/EmptyButton.styled";
import {TrashIcon} from "../../../../../Icons/Icons";
import {defaultColor} from "../../../../../../common/constants";
import {DateHelper} from "../../../../../../common/calendarSupport/dateHelper";
import dayjs from "dayjs";

export interface AnsweredCommentProps {
	commentItem?: CommentModel | null,
	onDelete?: (item: CommentModel) => void
}

export const AnsweredComment: FC<AnsweredCommentProps> = ({commentItem, onDelete}) => {
	
	if (!commentItem) {
		return <></>
	}
	
	return (
		<FlexBlock direction={'row'} align={'flex-start'} gap={6} width={'100%'}>
			<AnswerIcon/>
			<MessagesContainer>
				<MessageItemContainer>
					<FlexBlock direction={'row'} justify={'space-between'} gap={6} align={'center'}>
						<FlexBlock gap={6} fSize={12} pl={6} style={{lineHeight: "16px"}} align={'flex-end'}>
							{[
								"В ответ на комментарий пользователя ",
								<LinkStyled
									to={`/profile/${commentItem.userId._id}`}
									target={"_blank"}
								>
									{`${commentItem.userId.name} ${commentItem.userId.surname}`}
								</LinkStyled>,
								`от ${DateHelper.getHumanizeDateValue(dayjs(commentItem.date).toDate(), {
									withTime: true,
									withYear: true,
									monthPattern: "short",
									yearPattern: "full"
								})}`
							]}
						</FlexBlock>
						{onDelete && (
							<EmptyButtonStyled onClick={() => onDelete(commentItem)}>
								<TrashIcon size={16} color={defaultColor}/>
							</EmptyButtonStyled>
						)}
					</FlexBlock>
					<FlexBlock
						className={'comment--message'}
						fSize={14}
					>
						<TaskPreviewDescription>
							{commentItem.message}
						</TaskPreviewDescription>
					</FlexBlock>
				</MessageItemContainer>
			</MessagesContainer>
		</FlexBlock>
	)
}