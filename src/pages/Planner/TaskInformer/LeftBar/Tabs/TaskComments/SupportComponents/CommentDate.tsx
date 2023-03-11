import React, {FC} from "react";
import {StyledCommentDate} from "../comments.styled";
import dayjs from "dayjs";
import {getDateDescription} from "../../../../../../../common/calendarSupport/dateHelper";

export const CommentDate: FC<{ date: Date, isUpdated?: boolean }> = ({date, isUpdated}) => {
	return (
		<StyledCommentDate>
			{
				[
					getDateDescription(dayjs(date).toDate()),
					' ',
					isUpdated ? '(изм.)' : ''
				]
			}
		</StyledCommentDate>
	)
}