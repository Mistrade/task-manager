import {
  useGetCommentsListQuery,
  useRemoveCommentMutation,
} from '../../../../../../store/api/planning-api';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlexBlock } from '../../../../../../components/LayoutComponents/FlexBlock';
import { hoverColor } from '../../../../../../common/constants';
import { useAppSelector } from '../../../../../../store/hooks/hooks';
import { sessionApi } from '../../../../../../store/api/session-api';
import { ErrorScreen } from '../../../../../../components/Errors/ErrorScreen';
import { Loader } from '../../../../../../components/Loaders/Loader';
import { ScrollVerticalView } from '../../../../../../components/LayoutComponents/ScrollView/ScrollVerticalView';
import { CommentModel } from '../../../../../../store/api/planning-api/types/comments.types';
import { ObjectId } from '../../../../../../store/api/rtk-api.types';
import { CommentForm } from './SupportComponents/CommentForm';
import { CommentsList } from './SupportComponents/CommentsList';
import { TaskCommentsProps } from './comments.types';
import { mergeArrayWithUserId } from '../../../../../../common/functions';
import {
  CatchHandleForToast,
  thenHandleForToast,
} from '../../../../../../store/api/tools';

const keyframe = [
  { backgroundColor: 'transparent' },
  { backgroundColor: hoverColor },
  { backgroundColor: 'transparent' },
];

const options = {
  delay: 100,
  duration: 1250,
  iterations: 2,
  easing: 'cubic-bezier(0.42, 0, 0.58, 1)',
};

export const TaskComments: FC<TaskCommentsProps> = ({ taskInfo }) => {
  const [removeComment] = useRemoveCommentMutation();
  const {
    data: comments,
    error: commentsError,
    isFetching: commentsIsFetching,
  } = useGetCommentsListQuery(taskInfo._id, {
    pollingInterval: 5000,
    refetchOnMountOrArgChange: 5,
  });
  const [inResponseToCommentItem, setInResponseToCommentItem] =
    useState<null | CommentModel>(null);
  const [updateCommentItem, setUpdateCommentItem] =
    useState<null | CommentModel>(null);

  useEffect(() => {
    updateCommentItem && setInResponseToCommentItem(null);
  }, [updateCommentItem]);

  const { data: userInfo } = useAppSelector(
    sessionApi.endpoints.confirmSession.select()
  );

  const mergedCommentList = useMemo(() => {
    const list = comments?.data || [];

    return mergeArrayWithUserId(list, 'userId');
  }, [comments?.data]);

  const removeCommentHandler = useCallback(
    async (item: CommentModel): Promise<void> => {
      if (item.deletable) {
        return await removeComment(item._id)
          .unwrap()
          .then(thenHandleForToast)
          .catch(CatchHandleForToast);
      }
    },
    [taskInfo, userInfo?.data]
  );

  const container = useRef<HTMLDivElement>(null);

  const onClickToReplyCommentHandler = useCallback(
    (id: ObjectId): void => {
      const _ = container.current;

      if (_) {
        const target = _.querySelector(`#comment_item_${id}`);
        target?.scrollIntoView({
          block: 'center',
        });
        target?.animate(keyframe, options);
      }
    },
    [container.current]
  );

  const onUpdateCommentClick = useCallback(
    (item: CommentModel) => {
      setUpdateCommentItem(item);
    },
    [setUpdateCommentItem]
  );

  const clearUpdAndReply = useCallback(() => {
    setUpdateCommentItem(null);
    setInResponseToCommentItem(null);
  }, [setUpdateCommentItem, setInResponseToCommentItem]);

  const onReplyComment = useCallback(
    (value: CommentModel) => {
      if (updateCommentItem) {
        setUpdateCommentItem((prev) => {
          if (prev) {
            const newState = { ...prev };
            if (value._id !== prev._id) {
              newState.sourceComment = value;
            }
            return newState;
          }

          return prev;
        });
      } else {
        setInResponseToCommentItem(value);
      }
    },
    [updateCommentItem, inResponseToCommentItem]
  );

  if (!comments?.data && commentsIsFetching) {
    return (
      <FlexBlock
        width={'100%'}
        height={'100%'}
        justify={'center'}
        align={'center'}
      >
        <Loader isActive={true} title={'Загружаем список комментариев...'} />
      </FlexBlock>
    );
  }

  if (commentsError) {
    return (
      <FlexBlock
        width={'100%'}
        height={'100%'}
        justify={'center'}
        align={'center'}
      >
        <ErrorScreen
          title={'При загрузке комментариев произошла ошибка'}
          description={
            ('data' in commentsError && commentsError?.data?.info?.message) ||
            'Мы будем пытаться загрузить комментарии каждые 5 секунд'
          }
          errorType={'SYSTEM_ERROR'}
        />
      </FlexBlock>
    );
  }

  return (
    <ScrollVerticalView
      placementStatic={'bottom'}
      gap={0}
      staticContent={
        <CommentForm
          onClear={clearUpdAndReply}
          updatedComment={updateCommentItem || null}
          onSuccessUpdComment={clearUpdAndReply}
          replyComment={inResponseToCommentItem}
          onDeleteAnsweredComment={() => {
            setInResponseToCommentItem(null);
            setUpdateCommentItem((prev: CommentModel | null) => {
              if (prev) {
                const newState: CommentModel = { ...prev };

                newState.sourceComment = null;

                return newState;
              }
              return null;
            });
          }}
          eventInfo={taskInfo}
          onClickToReplyComment={onClickToReplyCommentHandler}
        />
      }
    >
      <FlexBlock ref={container} width={'100%'} grow={3}>
        <CommentsList
          onUpdateCommentClick={onUpdateCommentClick}
          onRemoveComment={removeCommentHandler}
          onReplyToComment={onReplyComment}
          comments={mergedCommentList}
          onClickToReplyComment={onClickToReplyCommentHandler}
        />
      </FlexBlock>
    </ScrollVerticalView>
  );
};
