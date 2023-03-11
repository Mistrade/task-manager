import React, {FC, useMemo, useState} from "react";
import {StyledCommentDescription} from "../comments.styled";

export const CommentDescription: FC<{ text: string }> = ({text}) => {
	return (
		<StyledCommentDescription>
			{text}
		</StyledCommentDescription>
	)
}