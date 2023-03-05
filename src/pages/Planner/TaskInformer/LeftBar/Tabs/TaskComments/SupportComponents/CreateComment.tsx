import {FC, useCallback} from "react";
import {CreateCommentBarProps} from "../comments.types";
import {AnsweredComment} from "./AnsweredComment";
import {TaskInformerDescriptionInput} from "../../../../SupportsComponent/TaskInformerDescription";
import {useCreateCommentMutation} from "../../../../../../../store/api/planning-api";
import {CustomRtkError} from "../../../../../../../store/api/rtk-api.types";
import {toast} from "react-toastify";
import {CreateCommentContainer} from "../comments.styled";
import {ReplyComment} from "./CommentGroup";

export const CreateCommentBar: FC<CreateCommentBarProps> = ({
																															answeredComment,
																															onDeleteAnsweredComment,
																															eventInfo,
																															onClickToReplyComment
																														}) => {
	const [create] = useCreateCommentMutation()
	
	const createHandler = useCallback(async (message: string) => {
		return await create({
			eventId: eventInfo._id,
			message: message,
			sourceCommentId: answeredComment?._id || undefined
		})
			.unwrap()
			.then(() => {
				onDeleteAnsweredComment && onDeleteAnsweredComment()
			})
			.catch((r: CustomRtkError) => {
				toast(r.data.info?.message, {
						type: r.data.info?.type
					}
				)
			})
	}, [eventInfo, answeredComment])
	
	
	return (
		<CreateCommentContainer>
			<ReplyComment
				replyComment={answeredComment}
				onRemove={onDeleteAnsweredComment}
				scrollToAnsweredCommentFn={onClickToReplyComment}
			/>
			<TaskInformerDescriptionInput
				maxHeight={150}
				rows={4}
				inputPlaceholder={`Напишите свой комментарий к событию "${eventInfo.title}"`}
				updateFn={createHandler}
				initialValue={''}
				clearOnDecline={true}
				clearOnComplete={true}
			/>
		</CreateCommentContainer>
	)
}