import { UserModel } from '@api/session-api/session-api.types';
import { ObjectId, UtcDate } from '@api/rtk-api.types';

export interface CommentModel {
  _id: ObjectId;
  eventId: ObjectId;
  userId: UserModel;
  date: UtcDate;
  message: string;
  sourceComment: CommentModel | null;
  editable: boolean;
  deletable: boolean;
  isImportant: boolean;
  updatedAt?: UtcDate;
}

export interface CreateCommentRequestProps {
  message: string;
  eventId: ObjectId;
  sourceCommentId?: ObjectId;
}

export interface UpdateCommentIsImportantRequestData {
  commentId: ObjectId;
  fieldName: 'isImportant';
  state: 'toggle' | boolean;
}

export interface UpdateCommentMessageState {
  commentId: ObjectId;
  fieldName: 'content';
  state: Omit<CreateCommentRequestProps, 'eventId'>;
}
