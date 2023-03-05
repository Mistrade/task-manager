import {AnsweredCommentProps} from "./SupportComponents/AnsweredComment";
import {CommentModel} from "../../../../../../store/api/planning-api/types/comments.types";
import {EventInfoModel} from "../../../../../../store/api/planning-api/types/event-info.types";
import {CommentGroupProps} from "./SupportComponents/CommentGroup";

export interface CreateCommentBarProps {
	// createCommentFn: (message: string) => Promise<void>
	answeredComment: CommentModel | null,
	onDeleteAnsweredComment?: () => void,
	eventInfo: EventInfoModel,
	onClickToReplyComment?: CommentGroupProps['onClickToReplyComment']
}