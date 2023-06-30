import { useAppSelector } from '@redux/hooks/hooks';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { hoverColor } from '@src/common/constants/constants';
import { mergeArrayWithUserId } from '@src/common/functions';

import { ErrorScreen } from '@components/Errors/ErrorScreen';
import { FlexBlock } from '@components/LayoutComponents';
import { VerticalScroll } from '@components/LayoutComponents/ScrollView/VerticalScroll';
import { Loader } from '@components/Loaders/Loader';

import {
  useGetCommentsListQuery,
  useRemoveCommentMutation,
} from '@api/planning-api';
import { CommentModel } from '@api/planning-api/types/comments.types';
import { ObjectId } from '@api/rtk-api.types';
import { sessionApi } from '@api/session-api';
import { CatchHandleForToast, thenHandleForToast } from '@api/tools';

import { CommentForm } from './SupportComponents/CommentForm';
import { CommentsList } from './SupportComponents/CommentsList';
import { TaskCommentsProps } from './comments.types';

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
    skip: !taskInfo._id,
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
    <VerticalScroll
      placementStatic={'bottom'}
      containerProps={{
        height: '100%',
      }}
      gap={0}
      useShadow={true}
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
    </VerticalScroll>
  );
};
