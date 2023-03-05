import styled from "styled-components";
import {FC, useEffect, useRef} from "react";
import {CommentModel} from "../../../../../../../store/api/planning-api/types/comments.types";
import {UserModel} from "../../../../../../../store/api/session-api/session-api.types";
import {MergedCommentItem} from "./MergedCommentItem";
import {BaseCommentActionsProps, CommentGroupProps} from "./CommentGroup";
import {ErrorScreen} from "../../../../../../../components/Errors/ErrorScreen";
import {FlexBlock} from "../../../../../../../components/LayoutComponents/FlexBlock";

export const CommentsListContainer = styled('ul')`
  & {
    display: flex;
    gap: 24px;
    flex-direction: column-reverse;
    position: relative;
    width: 100%;
  }
`

export const InvisibleScroller = styled('div')`
  width: 0;
  height: 0;
`

export interface MergedComment {
	arr: Array<CommentModel>,
	user: UserModel
}

export interface CommentsListProps extends BaseCommentActionsProps {
	comments: Array<MergedComment>,
	onClickToReplyComment?: CommentGroupProps['onClickToReplyComment']
}

export const CommentsList: FC<CommentsListProps> = ({
																											comments,
																											onRemoveComment,
																											onReplyToComment,
																											onClickToReplyComment
																										}) => {
	const invisibleScroller = useRef<HTMLDivElement>(null)
	
	useEffect(() => {
		toBottom()
	}, [invisibleScroller, comments.length])
	
	const toBottom = () => {
		invisibleScroller.current?.scrollIntoView({
			behavior: 'auto',
			block: 'end'
		})
	}
	
	
	if (!comments.length) {
		return (
			<FlexBlock width={'100%'} height={'100%'} justify={'center'} align={'center'}>
				<ErrorScreen
					title={'Комментариев пока нет...'}
					errorType={'ERR_FORBIDDEN'}
					description={'Напишите первый, каждый участник сможет его увидеть!'}
				/>
			</FlexBlock>
		)
	}
	
	return (
		<CommentsListContainer>
			<InvisibleScroller ref={invisibleScroller}/>
			{comments.map((comment) => {
				return !!comment.arr.length
					? (
						<MergedCommentItem
							onRemoveComment={onRemoveComment}
							onReplyToComment={onReplyToComment}
							scrollToAnsweredCommentFn={onClickToReplyComment}
							key={comment.arr[0]._id}
							comment={comment}
						/>
					) : <></>
			})}
		</CommentsListContainer>
	)
}