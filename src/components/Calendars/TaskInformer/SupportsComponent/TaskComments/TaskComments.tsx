import {
	CustomRtkError,
	MyServerResponse,
	useAddCommentMutation,
	useGetCommentsListQuery,
	useRemoveCommentMutation
} from "../../../../../store/api/taskApi/taskApi";
import {FC, useEffect, useRef, useState} from "react";
import {CommentModel, FullResponseEventModel, UserModelResponse} from "../../../../../store/api/taskApi/types";
import {FlexBlock} from "../../../../LayoutComponents/FlexBlock";
import styled from "styled-components";
import {TaskInformerDescriptionInput} from "../TaskInformerDescription";
import {toast} from "react-toastify";
import dayjs from "dayjs";
import {
	borderRadiusSize,
	currentColor,
	defaultColor,
	disabledColor,
	pageHeaderColor
} from "../../../../../common/constants";
import {EmptyButtonStyled} from "../../../../Buttons/EmptyButton.styled";
import {TrashIcon} from "../../../../Icons/Icons";
import {useAppSelector} from "../../../../../store/hooks/hooks";
import {sessionApi} from "../../../../../store/api/sessionApi";
import {WhiteButton} from "../../../../Buttons/Buttons.styled";
import {ErrorScreen} from "../../../../Errors/ErrorScreen";
import {Loader} from "../../../../Loaders/Loader";
import {LinkStyled} from "../../../../Buttons/Link.styled";
import {CopyToClipboardButton} from "../../../../Buttons/CopyToClipboardButton";
import {getDateDescription} from "../TaskHistory/TaskHistoryItem";

export interface TaskCommentsProps {
	taskInfo: FullResponseEventModel,
}


export const TaskCommentsContainer = styled('div')`
  height: calc(100% - 120px);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
`

export const ScrollContainer = styled('div')`
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
`

export const MessagesContainer = styled('div')`
  display: flex;
  flex-direction: column-reverse;
  gap: 12px;
`

export const MessageItemContainer = styled('div')`
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
    border: 1px solid ${disabledColor};
    border-radius: ${borderRadiusSize.sm};
    background-color: ${pageHeaderColor};
  }
`

export const NonViewScroller = styled('div')`
  width: 0;
  height: 0;
`

export interface MessageItemHeaderProps {
	item: CommentModel,
	canIDelete?: boolean,
	onDelete?: (id: string) => Promise<void>
}

const MessageItemHeader: FC<MessageItemHeaderProps> = ({item, canIDelete, onDelete}) => {
	const [isDeleteState, setIsDeleteState] = useState(false)
	return (
		<FlexBlock
			className={'user--name'}
			direction={'row'}
			align={'center'}
		>
			<FlexBlock width={'100%'} justify={'space-between'} align={'center'}>
				<FlexBlock gap={6} fSize={12} style={{lineHeight: "16px"}} align={'flex-end'}>
					<LinkStyled
						style={{color: currentColor, fontSize: 16}}
						to={`/profile/${item.userId._id}`}
						target={'_blank'}
					>
						{`${item.userId.name} ${item.userId.surname}`}
					</LinkStyled>
					{getDateDescription(dayjs(item.date).toDate())}
				</FlexBlock>
				<FlexBlock gap={6} align={'center'}>
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

export const TaskComments: FC<TaskCommentsProps> = ({taskInfo}) => {
	const [addComment, {error, isLoading, isSuccess}] = useAddCommentMutation()
	const [removeComment] = useRemoveCommentMutation()
	const {
		data: comments,
		error: commentsError,
		isFetching: commentsIsFetching
	} = useGetCommentsListQuery(taskInfo.id, {pollingInterval: 5000})
	const ref = useRef<HTMLDivElement>(null)
	
	
	const {data: userInfo} = useAppSelector(sessionApi.endpoints.confirmSession.select())
	
	useEffect(() => {
		toBottom()
	}, [comments, ref])
	
	const toBottom = () => {
		ref.current?.scrollIntoView({
			behavior: 'auto',
			block: 'end'
		})
	}
	
	const checkCanIDelete = (item: CommentModel, userInfo: UserModelResponse | undefined | null, taskInfo: FullResponseEventModel): boolean => {
		if (!userInfo?._id) return false
		
		const isCreator = taskInfo.userId._id === userInfo._id
		
		if (isCreator) return true
		
		const isMember = item.userId._id === userInfo._id
		
		if (isMember) return true
		
		return false
	}
	
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
		<FlexBlock
			width={'100%'}
			height={'100%'}
			maxHeight={'100%'}
			direction={'column'}
			position={'relative'}
			gap={6}
		>
			<TaskCommentsContainer>
				{comments?.data && comments?.data?.length > 0 ? (
					<ScrollContainer>
						<MessagesContainer>
							{comments?.data?.map((item: CommentModel) => (
								<MessageItemContainer key={item._id}>
									<MessageItemHeader
										item={item}
										canIDelete={checkCanIDelete(item, userInfo?.data, taskInfo)}
										onDelete={async (commentId) => {
											return await removeComment(commentId)
												.unwrap()
												.then((r: MyServerResponse<null>) => {
													toast(r.info?.message, {type: r.info?.type})
												})
												.catch((r: CustomRtkError) => {
													toast(r.data?.info?.message, {type: r.data?.info?.type})
												})
										}}
									/>
									<FlexBlock className={'comment--message'} fSize={14}>
										{item.message}
									</FlexBlock>
								</MessageItemContainer>
							))}
						</MessagesContainer>
						<NonViewScroller ref={ref}/>
					</ScrollContainer>
				) : (
					<FlexBlock height={'100%'} width={"100%"} align={'center'} justify={'center'}>
						<ErrorScreen
							title={'Комментариев пока нет...'}
							errorType={'ERR_FORBIDDEN'}
							description={'Напишите первый, каждый участник сможет его увидеть!'}
						/>
					</FlexBlock>
				)}
			</TaskCommentsContainer>
			<TaskInformerDescriptionInput
				rows={4}
				inputPlaceholder={`Напишите свой комментарий к событию "${taskInfo.title}"`}
				updateFn={async (value) => {
					return await addComment({
						eventId: taskInfo.id,
						message: value
					})
						.unwrap()
						.then(() => {
						
						})
						.catch((r: CustomRtkError) => {
							toast(r.data.info?.message, {
									type: r.data.info?.type
								}
							)
						})
				}}
				initialValue={''}
				clearOnDecline={true}
				clearOnComplete={true}
			/>
		</FlexBlock>
	)
}