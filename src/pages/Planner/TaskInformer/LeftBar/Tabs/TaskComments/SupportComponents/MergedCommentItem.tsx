import styled from "styled-components";
import {MergedComment} from "./CommentsList";
import React, {FC} from "react";
import {UserAvatar} from "../../../../../Users/UserAvatar";
import {currentColor, pageHeaderColor} from "../../../../../../../common/constants";
import {LinkStyled} from "../../../../../../../components/Buttons/Link.styled";
import {BaseCommentActionsProps, CommentGroup, CommentGroupProps} from "./CommentGroup";
import {Tooltip} from "../../../../../../../components/Tooltip/Tooltip";
import {UserHoverCard} from "../../../../../../../components/HoverCard/UserHoverCard";
import {EventShortHoverCard} from "../../../../../../../components/HoverCard/EventShortHoverCard";

export const MergedCommentContainer = styled('li')`
  & {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 8px;
    position: relative;
    align-items: stretch;
  }
`

export const MergedCommentUserInfo = styled('div')`
  & {
    width: fit-content;
    display: flex;
    flex-direction: column;
		z-index: 1;
  }
`

export const MergedCommentDataContainer = styled('div')`
  & {
    display: flex;
    flex-grow: 10;
    flex-direction: column;
    position: relative;
		//z-index: 0;
  }
`

export const MergedCommentDataUserName = styled('div')`
  & {
    display: flex;
    width: 100%;
    padding-bottom: 8px;
    padding-left: 16px;
    background-color: #fff;
    //z-index: 1;
    //position: sticky;
    //top: 0;
    //left: 0;
  }
`

export const CommentStickyAvatar = styled('div')`
  position: sticky;
  top: 0;
  left: 0;
  cursor: pointer;
`

export interface MergedCommentItemProps extends BaseCommentActionsProps {
	comment: MergedComment,
	scrollToAnsweredCommentFn: CommentGroupProps['onClickToReplyComment']
}


export const MergedCommentItem: FC<MergedCommentItemProps> = ({
																																comment,
																																scrollToAnsweredCommentFn,
																																onRemoveComment,
																																onReplyToComment,
																															}) => {
	return (
		<MergedCommentContainer>
			<MergedCommentUserInfo>
				<CommentStickyAvatar>
					<Tooltip
						content={<UserHoverCard user={comment.user}/>}
						theme={'light'}
						delay={[500, 100]}
						placement={'right'}
						animation={'shift-away'}
						offset={[0, 15]}
						interactive={true}
						interactiveBorder={4}
					>
						<UserAvatar user={comment.user}/>
					</Tooltip>
				</CommentStickyAvatar>
			</MergedCommentUserInfo>
			<MergedCommentDataContainer>
				<MergedCommentDataUserName>
					<LinkStyled
						style={{color: currentColor, fontSize: 16}}
						to={`/profile/${comment.user._id}`}
						target={'_blank'}
					>
						{`${comment.user.name} ${comment.user.surname}`}
					</LinkStyled>
				</MergedCommentDataUserName>
				<CommentGroup
					comment={comment}
					onClickToReplyComment={scrollToAnsweredCommentFn}
					onRemoveComment={onRemoveComment}
					onReplyToComment={onReplyToComment}
				/>
			</MergedCommentDataContainer>
		</MergedCommentContainer>
	)
}