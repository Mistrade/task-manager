import styled from 'styled-components';

import { StyledCommentContainer } from '../TaskComments/comments.styled';

export const StyledHistoryList = styled(StyledCommentContainer)`
  flex-direction: column;
  gap: 12px;
`;

export const StyledHistoryDescription = styled('p')`
  font-size: 16px;
  font-weight: normal;
  line-height: 16px;
  text-align: left;
  margin: 0;
  padding: 0;
`;