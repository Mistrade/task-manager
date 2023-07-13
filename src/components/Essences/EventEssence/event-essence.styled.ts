import { FlexBlock } from '@components/LayoutComponents';
import {
  stepByStepAnimation,
  StepByStepAnimationProps,
} from '@planner/Modes/Week/components/styled';
import {
  darkColor,
  disabledColor,
  pageHeaderColor,
} from '@src/common/constants/constants';
import { borderRadiusSize } from '@src/common/css/mixins';
import { kitColors } from 'chernikov-kit';
import styled from 'styled-components';


export const EssenceContainer = styled(FlexBlock)<StepByStepAnimationProps>`
  display: flex;
  width: 100%;
  padding: 8px;
  border-radius: 4px ${borderRadiusSize.sm} ${borderRadiusSize.sm} 4px;
  border-left: 4px solid ${kitColors.primary};
  border-top: 1px solid ${disabledColor};
  border-right: 1px solid ${disabledColor};
  border-bottom: 1px solid ${disabledColor};
  flex-direction: column;
  gap: 8px;
  background-color: ${pageHeaderColor};
  height: fit-content;
  transition: height 0.3s ease-in;
  text-align: left;
  ${stepByStepAnimation};
`;

export const EventEssenceTitle = styled('h4')`
  text-align: left;
  flex-grow: 3;
  overflow-x: hidden;
  font-size: 16px;
  color: ${darkColor};
`;

export const ReplyContent = styled(FlexBlock)`
  padding-left: 20px;
  border-left-width: 4px;
  border-left-style: solid;
  border-left-color: ${kitColors.primary};
`;