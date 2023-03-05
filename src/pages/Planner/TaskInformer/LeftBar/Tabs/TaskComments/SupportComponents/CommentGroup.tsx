import {MergedComment} from "./CommentsList";
import React, {FC, useState} from "react";
import styled, {keyframes} from "styled-components";
import {
	borderRadiusSize,
	currentColor,
	darkColor,
	defaultColor,
	hoverColor, orangeColor,
	pageHeaderColor
} from "../../../../../../../common/constants";
import {getDateDescription} from "../../TaskHistory/TaskHistoryItem";
import dayjs from "dayjs";
import {FlexBlock} from "../../../../../../../components/LayoutComponents/FlexBlock";
import {LinkStyled} from "../../../../../../../components/Buttons/Link.styled";
import {CommentModel} from "../../../../../../../store/api/planning-api/types/comments.types";
import {PencilIcon, StarIcon, TrashIcon} from "../../../../../../../components/Icons/Icons";
import {AnswerIcon} from "../../../../../../../components/Icons/CalendarIcons/AnswerIcon";
import {ObjectId} from "../../../../../../../store/api/rtk-api.types";
import {EmptyButtonStyled} from "../../../../../../../components/Buttons/EmptyButton.styled";
import {CopyToClipboardButton} from "../../../../../../../components/Buttons/CopyToClipboardButton";
import {TaskPreviewDescription} from "../../../../../RenderModes/DayCalendar/TaskList/TaskList.styled";
import {Tooltip} from "../../../../../../../components/Tooltip/Tooltip";
import Tippy, {useSingleton} from "@tippyjs/react";
import {WhiteButton} from "../../../../../../../components/Buttons/Buttons.styled";
import {useToggleIsImportantCommentStateMutation} from "../../../../../../../store/api/planning-api";

export interface CommentGroupProps extends BaseCommentActionsProps {
	comment: MergedComment,
	onClickToReplyComment?: (id: ObjectId) => void
}

export const StyledCommentContainer = styled('ul')`
  & {
    width: 100%;
    display: flex;
    flex-direction: column-reverse;
    gap: 4px;
  }
`

export const StyledCommentText = styled('li')<{ isHover: boolean }>`
  & {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 4px 16px;
    gap: 4px;
    background-color: ${_ => _.isHover ? pageHeaderColor : 'transparent'};
    cursor: pointer;
    border-radius: ${borderRadiusSize.xs};
  }
`

export const StyledCommentDate = styled('p')`
  & {
    margin: 0;
    color: ${defaultColor};
    font-size: 14px;
  }
`

export const StyledCommentDescription = styled('p')`
  & {
    margin: 0;
    color: ${darkColor};
    font-size: 15px;
    white-space: break-spaces;
  }
`

export const StyledReplyComment = styled('div')`
  & {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
    border-left-width: 3px;
    border-left-style: solid;
    border-left-color: ${hoverColor};
    padding: 4px 40px 4px 8px;
    font-size: 14px;
    color: ${defaultColor};
    cursor: pointer;
    transition: border-left-color .3s ease-in-out;
    position: relative;
  }

  &:hover {
    border-left-color: ${currentColor};
  }
`

export const StyledReplyCommentActionContainer = styled('div')`
  & {
    position: absolute;
    top: 10px;
    right: 10px;
  }
`

export const CommentDate: FC<{ date: Date }> = ({date}) => {
	return (
		<StyledCommentDate>
			{getDateDescription(dayjs(date).toDate())}
		</StyledCommentDate>
	)
}

export const CommentDescription: FC<{ text: string }> = ({text}) => {
	return (
		<StyledCommentDescription>
			{text}
		</StyledCommentDescription>
	)
}

export const CommentActionButton = styled(EmptyButtonStyled)`
  padding: 3px 5px;
`

export interface ReplyCommentProps {
	scrollToAnsweredCommentFn?: CommentGroupProps['onClickToReplyComment'],
	replyComment: CommentModel | null,
	onRemove?: (replyComment: CommentModel | null) => void
}

export const ReplyComment: FC<ReplyCommentProps> = ({scrollToAnsweredCommentFn, replyComment, onRemove}) => {
	if (!replyComment) {
		return <></>
	}
	
	return (
		<StyledReplyComment
			onClick={() => replyComment?._id && scrollToAnsweredCommentFn && scrollToAnsweredCommentFn(replyComment?._id)}
		>
			<FlexBlock direction={'row'} gap={4} align={'flex-end'}>
				<LinkStyled
					style={{color: currentColor, fontSize: 15}}
					to={`/profile/${replyComment.userId._id}`}
					target={'_blank'}
				>
					{`${replyComment.userId.name} ${replyComment.userId.surname}`}
				</LinkStyled>
				<CommentDate date={dayjs(replyComment.date).toDate()}/>
			</FlexBlock>
			<TaskPreviewDescription>
				{replyComment.message.substring(0, 120) + (replyComment.message.length > 120 ? '...' : '')}
			</TaskPreviewDescription>
			{onRemove && (
				<StyledReplyCommentActionContainer>
					<Tooltip
						placement={'top'}
						content={'Не отвечать на этот комментарий'}
					>
						<CommentActionButton
							type={'button'}
							onClick={(e) => {
								e.stopPropagation()
								onRemove && onRemove(replyComment)
							}}
						>
							<TrashIcon size={20}/>
						</CommentActionButton>
					</Tooltip>
				</StyledReplyCommentActionContainer>
			)}
		</StyledReplyComment>
	)
}

export interface BaseCommentActionsProps {
	onReplyToComment?: (item: CommentModel) => void,
	onRemoveComment?: (item: CommentModel) => void
}

export interface CommentActionsProps extends BaseCommentActionsProps {
	comment: CommentModel
}

export const commentActionsKeyframe = keyframes`
  from {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
`

export const CommentActionsContainer = styled('div')`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  gap: 6px;
  animation: ${commentActionsKeyframe} .25s ease-out;
`

export const RemoveAction: FC<Pick<CommentActionsProps, 'onRemoveComment' | 'comment'>> = ({
																																														 onRemoveComment,
																																														 comment
																																													 }) => {
	if (onRemoveComment && comment) {
		return (
			<Tooltip
				trigger={'click'}
				interactive={true}
				interactiveBorder={15}
				content={(
					<FlexBlock direction={'column'} align={'center'} gap={6} p={6}>
						<FlexBlock>
							Вы уверены?
						</FlexBlock>
						<WhiteButton
							style={{fontSize: 14}}
							onClick={() => onRemoveComment(comment)}
						>
							Удалить
						</WhiteButton>
					</FlexBlock>
				)}
				delay={200}
			>
				<CommentActionButton>
					<TrashIcon size={16} color={currentColor}/>
				</CommentActionButton>
			</Tooltip>
		)
	}
	
	return <></>
}

export const CommentActions: FC<CommentActionsProps> = ({
																													comment,
																													onRemoveComment,
																													onReplyToComment,
																												}) => {
	const [toggleIsImportant] = useToggleIsImportantCommentStateMutation()
	
	return (
		<CommentActionsContainer>
			<Tooltip
				content={comment.isImportant ? 'Снять отметку "Важное"' : 'Отметить как "Важное"'}
				delay={200}
			>
				<CommentActionButton
					onClick={async () => await toggleIsImportant({
						commentId: comment._id,
						state: !comment.isImportant,
						fieldName: "isImportant"
					})}
				>
					<StarIcon
						size={16}
						color={comment.isImportant ? orangeColor : defaultColor}
						fillColor={comment.isImportant ? orangeColor : 'none'}
					/>
				</CommentActionButton>
			</Tooltip>
			{comment.editable && (
				<Tooltip content={'Редактировать текст комментария'}>
					<CommentActionButton>
						<PencilIcon size={16}/>
					</CommentActionButton>
				</Tooltip>
			)}
			<Tooltip
				content={'Ответить на комментарий'}
				delay={200}
				interactive={false}
				interactiveBorder={0}
			>
				<CommentActionButton onClick={() => onReplyToComment && onReplyToComment(comment)}>
					<AnswerIcon size={16}/>
				</CommentActionButton>
			</Tooltip>
			<Tooltip
				content={'Скопировать'}
				delay={200}
				interactive={false}
				interactiveBorder={0}
			>
				<CopyToClipboardButton
					content={comment.message}
				/>
			</Tooltip>
			{onRemoveComment && comment.deletable && (
				<RemoveAction
					comment={comment}
					onRemoveComment={onRemoveComment}
				/>
			)}
		</CommentActionsContainer>
	)
}

export interface CommentItemProps extends BaseCommentActionsProps {
	item: CommentModel,
	scrollToAnsweredCommentFn: CommentGroupProps['onClickToReplyComment']
}

export const CommentItem: FC<CommentItemProps> = ({
																										item,
																										scrollToAnsweredCommentFn,
																										onRemoveComment,
																										onReplyToComment,
																									}) => {
	const [isHover, setIsHover] = useState(false)
	return (
		<StyledCommentText
			id={`comment_item_${item._id}`}
			isHover={isHover}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
		>
			<FlexBlock direction={'row'} gap={16} height={22} align={'center'}>
				<CommentDate date={dayjs(item.date).toDate()}/>
				{isHover && (
					<FlexBlock justify={'flex-end'} grow={3}>
						<CommentActions
							comment={item}
							onRemoveComment={onRemoveComment}
							onReplyToComment={onReplyToComment}
						/>
					</FlexBlock>
				)}
			</FlexBlock>
			{item.sourceComment && (
				<ReplyComment
					scrollToAnsweredCommentFn={scrollToAnsweredCommentFn}
					replyComment={item.sourceComment}
				/>
			)}
			<CommentDescription text={item.message}/>
		</StyledCommentText>
	)
}

export const CommentGroup: FC<CommentGroupProps> = ({
																											comment,
																											onClickToReplyComment,
																											onRemoveComment,
																											onReplyToComment,
																										}) => {
	return (
		<StyledCommentContainer>
			{comment.arr.map((item) => (
				<CommentItem
					item={item}
					key={item._id}
					scrollToAnsweredCommentFn={onClickToReplyComment}
					onRemoveComment={onRemoveComment}
					onReplyToComment={onReplyToComment}
				/>
			))}
		</StyledCommentContainer>
	)
}