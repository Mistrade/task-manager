import { CommentModel } from '@api/planning-api/types/comments.types';
import { EventInfoModel } from '@api/planning-api/types/event-info.types';
import { ObjectId } from '@api/rtk-api.types';

import { MergedComment } from './SupportComponents/CommentsList';


export interface CommentGroupProps extends BaseCommentActionsProps {
  comment: MergedComment;
  onClickToReplyComment?: (id: ObjectId) => void;
}

export interface ReplyCommentProps {
  scrollToAnsweredCommentFn?: CommentGroupProps['onClickToReplyComment'];
  replyComment: CommentModel | null;
  onRemove?: (replyComment: CommentModel | null) => void;
}

export interface BaseCommentActionsProps {
  onReplyToComment?: (item: CommentModel) => void;
  onRemoveComment?: (item: CommentModel) => void;
  onUpdateCommentClick?: (item: CommentModel) => void;
}

export interface CommentActionsProps extends BaseCommentActionsProps {
  comment: CommentModel;
}

export interface CommentItemProps extends BaseCommentActionsProps {
  item: CommentModel;
  scrollToAnsweredCommentFn: CommentGroupProps['onClickToReplyComment'];
}

export interface CreateCommentBarProps {
  // createCommentFn: (message: string) => Promise<void>
  onClear?: () => void;
  onSuccessUpdComment?: () => void;
  replyComment: CommentModel | null;
  updatedComment: CommentModel | null;
  onDeleteAnsweredComment?: () => void;
  eventInfo: EventInfoModel;
  onClickToReplyComment?: CommentGroupProps['onClickToReplyComment'];
}

export interface TaskCommentsProps {
  taskInfo: EventInfoModel;
}