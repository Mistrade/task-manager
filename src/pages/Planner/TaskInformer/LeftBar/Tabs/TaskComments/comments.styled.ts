import styled from "styled-components";
import {borderRadiusSize, disabledColor, pageHeaderColor} from "../../../../../../common/constants";

export const CreateCommentContainer = styled('div')`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
	flex-direction: column;
  gap: 8px;
  background-color: ${pageHeaderColor};
  padding: 12px 16px;
  width: 100%;
  border-top: 2px solid ${disabledColor};
  border-radius: 0px 0px ${borderRadiusSize.sm} ${borderRadiusSize.sm};
`