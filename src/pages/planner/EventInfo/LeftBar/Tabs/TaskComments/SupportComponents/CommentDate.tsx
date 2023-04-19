import dayjs from 'dayjs';
import React, { FC } from 'react';

import { getDateDescription } from '@src/common/calendarSupport/dateHelper';

import { StyledCommentDate } from '../comments.styled';


export const CommentDate: FC<{ date: Date; isUpdated?: boolean }> = ({
  date,
  isUpdated,
}) => {
  return (
    <StyledCommentDate>
      {[
        getDateDescription(dayjs(date).toDate()),
        ' ',
        isUpdated ? '(изм.)' : '',
      ]}
    </StyledCommentDate>
  );
};