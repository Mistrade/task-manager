import {useGetCommentsListQuery, useRemoveCommentMutation} from "../../../../../../store/api/planning-api";
import {FC, useCallback, useMemo, useRef, useState} from "react";
import {FlexBlock} from "../../../../../../components/LayoutComponents/FlexBlock";
import styled from "styled-components";
import {toast} from "react-toastify";
import dayjs from "dayjs";
import {
	borderRadiusSize,
	currentColor,
	defaultColor,
	disabledColor,
	hoverColor
} from "../../../../../../common/constants";
import {EmptyButtonStyled} from "../../../../../../components/Buttons/EmptyButton.styled";
import {TrashIcon} from "../../../../../../components/Icons/Icons";
import {useAppSelector} from "../../../../../../store/hooks/hooks";
import {sessionApi} from "../../../../../../store/api/session-api";
import {WhiteButton} from "../../../../../../components/Buttons/Buttons.styled";
import {ErrorScreen} from "../../../../../../components/Errors/ErrorScreen";
import {Loader} from "../../../../../../components/Loaders/Loader";
import {LinkStyled} from "../../../../../../components/Buttons/Link.styled";
import {CopyToClipboardButton} from "../../../../../../components/Buttons/CopyToClipboardButton";
import {getDateDescription} from "../TaskHistory/TaskHistoryItem";
import {
	AnswerOnMessageButton,
	AnswerOnMessageButtonProps
} from "../../../../../../components/Buttons/AnswerOnMessageButton";
import {ScrollVerticalView} from "../../../../../../components/LayoutComponents/ScrollView/ScrollVerticalView";
import {EventInfoModel} from "../../../../../../store/api/planning-api/types/event-info.types";
import {CommentModel} from "../../../../../../store/api/planning-api/types/comments.types";
import {UserModel} from "../../../../../../store/api/session-api/session-api.types";
import {CustomRtkError, MyServerResponse, ObjectId} from "../../../../../../store/api/rtk-api.types";
import {CreateCommentBar} from "./SupportComponents/CreateComment";
import {CommentsList, MergedComment} from "./SupportComponents/CommentsList";

export interface TaskCommentsProps {
	taskInfo: EventInfoModel,
}

export const ScrollContainer = styled('div')`
  //height: 100%;
  position: relative;
`

export const MessagesListContainer = styled('div')`
  display: flex;
  flex-direction: column-reverse;
  gap: 12px;
`

export const MessageContainer = styled('div')`
  display: flex;
  gap: 6px;
  flex-direction: column;


  & .user--name {
    position: sticky;
    left: 0;
    top: 0;
    background-color: #fff;
    padding: 4px 12px;
    color: ${defaultColor}
  }

  & .comment--message {
    white-space: pre-wrap;
    width: 100%;
    padding: 8px;
      //border: 1px solid ${disabledColor};
    border-radius: ${borderRadiusSize.sm};
  }
`


export const NonViewScroller = styled('div')`
  width: 0;
  height: 0;
`

export interface MessageItemHeaderProps {
	item: CommentModel,
	canIDelete?: boolean,
	onDelete?: (id: string) => Promise<void>,
	onAnswerToComment?: AnswerOnMessageButtonProps['onClick']
}

const MessageItemHeader: FC<MessageItemHeaderProps> = ({
																												 item,
																												 canIDelete,
																												 onDelete,
																												 onAnswerToComment
																											 }) => {
	const [isDeleteState, setIsDeleteState] = useState(false)
	return (
		<FlexBlock
			className={'user--name'}
			direction={'row'}
			align={'center'}
		>
			<FlexBlock width={'100%'} justify={'space-between'} align={'center'}>
				<FlexBlock gap={6} fSize={12} style={{lineHeight: "15px"}} align={'flex-end'}>
					<LinkStyled
						style={{color: currentColor, fontSize: 15}}
						to={`/profile/${item.userId._id}`}
						target={'_blank'}
					>
						{`${item.userId.name} ${item.userId.surname}`}
					</LinkStyled>
					{getDateDescription(dayjs(item.date).toDate())}
				</FlexBlock>
				<FlexBlock gap={6} align={'center'}>
					<AnswerOnMessageButton
						onClick={onAnswerToComment}
					/>
					<CopyToClipboardButton
						content={item.message}
					/>
					{canIDelete && (
						<FlexBlock direction={'row'}>
							{isDeleteState
								? (
									<FlexBlock direction={'row'} gap={6} align={'center'}>
										<FlexBlock fSize={15}>
											Удалить?
										</FlexBlock>
										<WhiteButton type={'button'} onClick={() => canIDelete && onDelete && onDelete(item._id)}>
											Да
										</WhiteButton>
										<WhiteButton type={'button'} onClick={() => setIsDeleteState(false)}>
											Нет
										</WhiteButton>
									</FlexBlock>
								)
								: (
									<EmptyButtonStyled onClick={() => setIsDeleteState(true)}>
										<TrashIcon size={16} color={defaultColor}/>
									</EmptyButtonStyled>
								)}
						</FlexBlock>
					)}
				</FlexBlock>
			</FlexBlock>
		</FlexBlock>
	)
}

const checkCanIDelete = (item: CommentModel, userInfo: UserModel | undefined | null, taskInfo: EventInfoModel): boolean => {
	if (!userInfo?._id) return false
	
	const isCreator = taskInfo.userId._id === userInfo._id
	
	if (isCreator) return true
	
	const isMember = item.userId._id === userInfo._id
	
	if (isMember) return true
	
	return false
}

const mergeCommentsHandler = (list: Array<CommentModel>) => {
	const arr: Array<MergedComment> = []
	
	
	list.forEach((item: CommentModel) => {
		const arrIndex = arr.length - 1
		if (arrIndex >= 0 && arr[arrIndex]?.user._id === item.userId._id) {
			return arr[arrIndex].arr.push(item)
		}
		
		return arr.push({
			arr: [item], user: item.userId
		})
	})
	
	return arr
}

const keyframe = [
	{backgroundColor: 'transparent'},
	{backgroundColor: hoverColor},
	{backgroundColor: 'transparent'}
]

const options = {
	delay: 100,
	duration: 1250,
	iterations: 2,
	easing: "cubic-bezier(0.42, 0, 0.58, 1)"
}

export const TaskComments: FC<TaskCommentsProps> = ({taskInfo}) => {
	
	const [removeComment] = useRemoveCommentMutation()
	const {
		data: comments,
		error: commentsError,
		isFetching: commentsIsFetching
	} = useGetCommentsListQuery(taskInfo._id, {pollingInterval: 5000, refetchOnMountOrArgChange: 5})
	const [inResponseToCommentItem, setInResponseToCommentItem] = useState<null | CommentModel>(null)
	
	const {data: userInfo} = useAppSelector(sessionApi.endpoints.confirmSession.select())
	
	const mergedCommentList = useMemo(() => {
		const list = comments?.data || []
		
		return mergeCommentsHandler(list)
	}, [comments?.data])
	
	const removeCommentHandler = useCallback(async (item: CommentModel): Promise<void> => {
		const canDelete = checkCanIDelete(item, userInfo?.data, taskInfo)
		if (canDelete) {
			return await removeComment(item._id)
				.unwrap()
				.then((r: MyServerResponse) => {
					toast(r.info?.message, {type: r.info?.type})
				})
				.catch((r: CustomRtkError) => {
					toast(r.data?.info?.message, {type: r.data?.info?.type})
				})
		}
	}, [taskInfo, userInfo?.data])
	
	const container = useRef<HTMLDivElement>(null)
	
	const onClickToReplyCommentHandler = useCallback((id: ObjectId): void => {
		const _ = container.current
		
		if (_) {
			const target = _.querySelector(`#comment_item_${id}`)
			target?.scrollIntoView({
				block: 'center'
			})
			target?.animate(keyframe, options)
		}
	}, [container.current])
	
	
	if (!comments?.data && commentsIsFetching) {
		return (
			<FlexBlock width={'100%'} height={'100%'} justify={'center'} align={'center'}>
				<Loader
					isActive={true}
					title={'Загружаем список комментариев...'}
				/>
			</FlexBlock>
		)
	}
	
	if (commentsError) {
		return (
			<FlexBlock width={'100%'} height={'100%'} justify={'center'} align={'center'}>
				<ErrorScreen
					title={"При загрузке комментариев произошла ошибка"}
					description={'data' in commentsError && commentsError?.data?.info?.message || "Мы будем пытаться загрузить комментарии каждые 5 секунд"}
					errorType={"SYSTEM_ERROR"}
				/>
			</FlexBlock>
		)
	}
	
	return (
		<ScrollVerticalView
			placementStatic={'bottom'}
			gap={0}
			staticContent={
				<CreateCommentBar
					answeredComment={inResponseToCommentItem}
					onDeleteAnsweredComment={() => setInResponseToCommentItem(null)}
					eventInfo={taskInfo}
					onClickToReplyComment={onClickToReplyCommentHandler}
				/>
			}
		>
			<FlexBlock ref={container} width={'100%'} grow={3} pl={6} pr={6}>
				<CommentsList
					onRemoveComment={removeCommentHandler}
					onReplyToComment={setInResponseToCommentItem}
					comments={mergedCommentList}
					onClickToReplyComment={onClickToReplyCommentHandler}
				/>
			</FlexBlock>
		</ScrollVerticalView>
	)
}