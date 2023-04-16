import React, { FC } from 'react';

import { StyledCommentDescription } from '@planner/TaskInformer/LeftBar/Tabs/TaskComments/comments.styled';


export const CommentDescription: FC<{ text: string }> = ({ text }) => {
  return <StyledCommentDescription>{text}</StyledCommentDescription>;
};